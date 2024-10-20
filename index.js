const c = document.querySelector('canvas');
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");
var lurevlvl1_png = new Image();
lurevlvl1_png.src = 'lurelvl1.png'
var lurevlvl2_png = new Image();
lurevlvl2_png.src = 'lurelvl2.png'
var fisher_png = new Image();
fisher_png.src = 'fisher.png'
var fishshop_png = new Image();
fishshop_png.src = 'fishshop.png'
var fishfarm_png = new Image();
fishfarm_png.src = 'fishfarm.png'
var fishbarge_png = new Image();
fishbarge_png.src = 'fishbarge.png'
var bait_png = new Image();
bait_png.src = 'bait.png'
var popeye_png = new Image();
popeye_png.src = 'popeye.png'
var enterprise_png = new Image();
enterprise_png.src = 'enterprise.png'
var lake_png = new Image();
lake_png.src = 'lake.png'
var monopoly_png = new Image();
monopoly_png.src = 'monopoly.png'
var bank_png = new Image();
bank_png.src = 'bank.png'
var church_png = new Image();
church_png.src = 'church.png'
var shopback_png = new Image();
shopback_png.src = 'shopbackground.png'
var background_png = new Image();
background_png.src = 'background.png'
var golden_bait_png = new Image();
golden_bait_png.src = 'golden_bait.png'
function Building(cost, index, name, rate, image) {
    this.amount = 0;
    this.index = index;
    this.rate = rate;
    this.name = name;
    this.init_cost = cost;
    this.cost = cost;
    this.building_offset = 0;
    this.png = image
    this.rect = {x:(window.innerWidth / 3 * 2) + 20, y : (this.index * 60) + 240 + this.building_offset, width : window.innerWidth / 3 - 50, height : window.innerHeight / 10}
    this.draw = function () {
        ctx.font = `10px Arial`; // Set to a small readable size
        this.rect = {x:(window.innerWidth / 3 * 2) + 20, y : (this.index * 60) + 240 + this.building_offset, width : window.innerWidth / 3 - 50, height : window.innerHeight / 10}
        this.cost =  this.init_cost + (this.amount * this.init_cost * 1.2);
        ctx.fillStyle = 'gray'
        ctx.fillRect( (window.innerWidth / 3 * 2) + 20,(this.index * 60) + 240 + this.building_offset, window.innerWidth / 3 - 50, window.innerHeight / 10 )
        ctx.font = `$10px Arial`
        ctx.fillStyle = 'black';
        ctx.fillText(`${this.name} (Cost: $${formatNumber(this.cost)}):Have ${formatNumber(this.amount)}:Make $${formatNumber(this.rate)}`, (window.innerWidth / 3 * 2) + 20,(this.index * 60) + 265 + this.building_offset);
        window.fillStyle = 'gray'
        ctx.fillStyle = "blue"
        ctx.drawImage(this.png, (window.innerWidth / 3 * 2) + 350, (this.index * 60) + 240 + this.building_offset, this.rect.height, this.rect.height)
        for (let i = 0; i < this.amount; i++)
            ctx.drawImage(this.png,(window.innerWidth / 3) + (i * 30) + 10, this.index * 100 + 10 + this.building_offset, 30, 30)
    };
}
const formatNumber = (num) => {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + ' thousand';
    } else if (num < 1000000000) {
        return (num / 1000000).toFixed(1) + ' million';
    } else {
        return (num / 1000000000).toFixed(1) + ' billion';
    }
    
}

function Main() {
    this.fish_buff = 1;
    this.raw_cps_boost = 1;
    this.running = true;
    this.money = 0;
    this.player_pos = 0;
    this.fish_pos = 0;
    this.key = {};
    this.fishing = false;
    this.lure_size = 50;
    this.building_offset = 0;
    this.building_offset = 0
    this.possible_fish = [];
    this.buildings = [];
    const base_golden_time = 1000;
    this.golden_time = 100;
    this.golden_rect = { x:50, y:50, width : 50, height : 50}
    this.buildings.push(new Building(15, 0, "Fisher", 0.01, fisher_png));           // Small initial investment
this.buildings.push(new Building(150, 1, "Fishing Shop", 0.05, fishshop_png));    // 10x cost, 5x CPS
this.buildings.push(new Building(1500, 2, "Fishing Farm", 0.25, fishfarm_png));   // 10x cost, 5x CPS
this.buildings.push(new Building(15000, 3, "Fishing Barge", 1, fishbarge_png));    // 10x cost, 4x CPS
this.buildings.push(new Building(150000, 4, "Fishing Enterprise", 5, enterprise_png)); // 10x cost, 5x CPS
this.buildings.push(new Building(1500000, 5, "Fishing Monopoly", 25, monopoly_png));  // 10x cost, 5x CPS
this.buildings.push(new Building(15000000, 6, "Fishing Bank", 100, bank_png));    // 10x cost, 4x CPS
this.buildings.push(new Building(150000000, 7, "Fishing Religion", 500, church_png)); // 10x cost, 5x CPS
this.carp = { name: "carp", rate: 8 };
this.salmon = { name: "salmon", rate: 25 };
this.bass = { name: "bass", rate: 300 };
this.oilfish = { name: "oilfish", rate: 1000 };
this.devils_pufferfish = { name: "devils pufferfish", rate: 10000 };
this.golden_carp = { name: "golden carp", rate: 10000000 };

// New fish types
this.trout = { name: "trout", rate: 15 };
this.mackerel = { name: "mackerel", rate: 50 };
this.tuna = { name: "tuna", rate: 500 };
this.marlin = { name: "marlin", rate: 5000 };
this.whale_shark = { name: "whale shark", rate: 25000 };
this.phoenix_fish = { name: "phoenix fish", rate: 5000000 };
this.golden_effect = 100;
// Adding fish to the pool with variety
for (let i = 0; i < 60; i++) this.possible_fish.push(this.carp);
for (let i = 0; i < 40; i++) this.possible_fish.push(this.trout);
for (let i = 0; i < 30; i++) this.possible_fish.push(this.salmon);
for (let i = 0; i < 20; i++) this.possible_fish.push(this.mackerel);
for (let i = 0; i < 10; i++) this.possible_fish.push(this.bass);
for (let i = 0; i < 8; i++) this.possible_fish.push(this.tuna);
for (let i = 0; i < 6; i++) this.possible_fish.push(this.oilfish);
for (let i = 0; i < 4; i++) this.possible_fish.push(this.marlin);
for (let i = 0; i < 2; i++) this.possible_fish.push(this.whale_shark);
for (let i = 0; i < 3; i++) this.possible_fish.push(this.devils_pufferfish);
for (let i = 0; i < 1; i++) this.possible_fish.push(this.phoenix_fish);
for (let i = 0; i < 1; i++) this.possible_fish.push(this.golden_carp);
    this.currently_fishing;
    this.time_to_catch = 0;
    this.fish_move = 1
    this.mouse_x;
    this.mouse_y;
    this.total_rate;
    this.upgrades = []
    this.upgrades_offset = 0;
    this.golden_on_screen = false;
    this.upgrades.push({
        cost: 200,
        scale: 1.2,
        level: 0,
        rect: { x: window.innerWidth / 3 * 2 + (55 * 0) + 10, y: 10, width: 50, height: 50 },
        name: "lurelvl1",
        purchased: false,
        image : lurevlvl1_png
    });
    this.upgrades.push({
        cost: 1000,
        scale: 2,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 1) + 10, y: 10, width: 50, height: 50 },
        name: "fisherlvl1",
        purchased : false,
        image : fisher_png
        
    })
    this.upgrades.push({
        cost: 20000,
        scale: 1.4,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 2) + 10, y: 10, width: 50, height: 50 },
        name: "lurelvl2",
        purchased : false,
        image : lurevlvl2_png
    })
    this.upgrades.push({
        cost: 30000,
        scale: 2,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 3) + 10, y: 10, width: 50, height: 50 },
        name: "shop1vl1",
        purchased : false,
        image : fishshop_png
    })
    this.upgrades.push({
        cost: 60000,
        scale: 2,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 4) + 10, y: 10, width: 50, height: 50 },
        name: "farmlvl1",
        purchased : false,
        image : fishfarm_png
    })
    this.upgrades.push({
        cost: 100000,
        scale: 3,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 5) + 10, y: 10, width: 50, height: 50 },
        name: "popeye",
        purchased : false,
        image : popeye_png
    })
    this.upgrades.push({
        cost: 1000000,
        scale: 0,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 6) + 10, y: 10, width: 50, height: 50 },
        name: "baitlvl1",
        purchased : false,
        image : bait_png
    })
    this.upgrades.push({
        cost: 10000000,
        scale: 0,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 7) + 10, y: 10, width: 50, height: 50 },
        name: "baitlvl2",
        purchased : false,
        image : bait_png
    })
    this.upgrades.push({
        cost: 100000,
        scale: 2,
        rect : { x: window.innerWidth / 3 * 2 + (55 * 8) + 10, y: 10, width: 50, height: 50 },
        name: "bargelvl1",
        purchased : false,
        image : fishbarge_png
    })

    const updateMousePosition = (e) => {
        const rect = c.getBoundingClientRect(); // Change canvas to c
        this.mouse_x = e.clientX - rect.left;
        this.mouse_y = e.clientY - rect.top;
        console.log(this.mouse_x, this.mouse_y); // Log both mouse_x and mouse_y
    };
    window.addEventListener('keydown', (e) => {
        this.key[e.key] = true;
        if (this.key['f']) {
            if (this.fishing) {
                this.money -= 10 + (this.total_rate * 300)

            }
            this.fishing = !this.fishing;
            this.player_pos = 0
            this.fish_pos = 0
            this.currently_fishing = this.possible_fish[random_fish()]
            this.time_to_catch = 500;
        }
        if (this.key['ArrowUp']) {
            event.preventDefault();
            this.building_offset -= 5
            for (let i=0;i<this.buildings.length;i++) {
                this.buildings[i].building_offset -= 5
            }
        }
        if (this.key['ArrowDown']) {
            event.preventDefault();
            this.building_offset += 5
            for (let i=0;i<this.buildings.length;i++) {
                this.buildings[i].building_offset += 5
            }
        }
        if (this.key['ArrowLeft'] ) {
            event.preventDefault();
            for (let i = 0; i < this.upgrades.length; i++) {
                const upgrade = this.upgrades[i];
                if (upgrade.rect.x >  window.innerWidth / 3 * 2 + (55 * 0) + 10) {
                    upgrade.rect.x -=5

                }
            }

        }
        if (this.key['ArrowRight']) {
            event.preventDefault();
            for (let i = 0; i < this.upgrades.length; i++) {
                const upgrade = this.upgrades[i];
                upgrade.rect.x += 5 * i / 2
        }
    }

        // Move player when 'r' is pressed
        if (this.key['r']) {
            this.player_pos += 15;
        }
    });
    window.addEventListener('mousemove', (e) => {
        updateMousePosition(e);
    });
    const update_upgrades = () => {
        ctx.fillStyle = 'black'; // Set fill style for upgrade rectangles
        for (let i = 0; i < this.upgrades.length; i++) {
            const upgrade = this.upgrades[i];
            ctx.drawImage(upgrade.image, upgrade.rect.x, upgrade.rect.y,50, 50)   

            ctx.fillStyle = 'red'; // Set color for text
            ctx.font = `10px Arial`; // Set to a small readable size

            if (upgrade.purchased) {
                ctx.fillStyle = 'green'

            }
            ctx.fillText(`${upgrade.name}`, upgrade.rect.x, upgrade.rect.y + 20); // Optional: draw upgrade name
            ctx.fillText(`$${formatNumber(upgrade.cost)}`, upgrade.rect.x, upgrade.rect.y + 30);
            ctx.fillStyle = 'black'; // Reset to black for next rectangle

        }
    };
    
    window.addEventListener('mousedown', (e) => {
        const mouse_rect = {x: this.mouse_x, y: this.mouse_y, width: 10, height: 10}
        for (let i = 0; i < this.buildings.length; i++) {
            if (isColliding(mouse_rect, this.buildings[i].rect) && this.money > this.buildings[i].cost) {
                this.buildings[i].amount += 1; // Fix this line
                this.money -= this.buildings[i].cost; // Deduct the cost from money
                this.fish_buff += this.buildings[i].rate
            }
        }
        if (isColliding(this.golden_rect, mouse_rect) && this.golden_on_screen) {
            this.golden_on_screen = false
            var posssible = ["Fishing Frenzy", "Fish Rain", "Fishy Mytosis", "Luretastical"]
            var chance = Math.floor(Math.random() * posssible.length)
            if (posssible[chance] == "Fishing Frenzy") {
                this.golden_effect = 1000;
                this.frenzy = true;
            }
            if (posssible[chance] == "Fish Rain") {
                this.golden_effect = 100;
                this.money += this.total_rate * 20 * 30
            }
            if (posssible[chance] == "Fishy Mytosis") {
                this.golden_effect = 100;
                this.money += this.money * 1.4
            }
            if (posssible[chance] == "Luretastical") {
                this.golden_effect = 100
                this.lure_buff = true
            }
            
        }
        for (let i = 0; i < this.upgrades.length; i++) {
            if (isColliding(mouse_rect, this.upgrades[i].rect) && this.money > this.upgrades[i].cost && !this.upgrades[i].purchased) {
                this.upgrades[i].purchased = true
                this.money -= this.upgrades[i].cost
                if (this.upgrades[i].name == "lurelvl1") {
                    this.lure_size = this.lure_size * this.upgrades[i].scale
                }
                if (this.upgrades[i].name == "fisherlvl1") {
                    this.buildings[0].rate = this.buildings[0].rate * this.upgrades[i].scale
                }
                if (this.upgrades[i].name == "lurelvl1") {
                    this.lure_size = this.lure_size * this.upgrades[i].scale

                }
                if (this.upgrades[i].name == "shoplvl1") {
                    this.buildings[0].rate = this.buildings[0].rate * this.upgrades[i].scale

                }
                if (this.upgrades[i].name == "farmlvl1") {
                    this.buildings[1].rate = this.buildings[0].rate * this.upgrades[i].scale

                }
                if (this.upgrades[i].name == "bargelvl1") {
                    this.buildings[2].rate = this.buildings[0].rate * this.upgrades[i].scale

                }
                if (this.upgrades[i].name == "popeye") {
                    this.raw_cps_boost = this.upgrades[i].scale
                }
                if (this.upgrades[i].name == "baitlvl1") {
                    for (let i = 0; i < this.possible_fish.length; i++) {
                        if (this.possible_fish[i].name === "carp") {
                            this.possible_fish.splice(i, 1);
                            i--; // Adjust index after removal to avoid skipping the next element
                        }
                    }
                    
                }
                if (this.upgrades[i].name == "baitlvl2") {
                    for (let i = 0; i < this.possible_fish.length; i++) {
                        if (this.possible_fish[i].name === "salmon") {
                            this.possible_fish.splice(i, 1);
                            i--; // Adjust index after removal to avoid skipping the next element
                        }
                    }
                    
                }

            }
        }
    });
    function isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    const update_money = () => {
        this.total_rate = 0;
        for (let i = 0; i < this.buildings.length; i++) {
            if (this.frenzy) {
                this.money += (this.buildings[i].rate * this.buildings[i].amount) * this.raw_cps_boost * 20 
            }
            else {
                this.money += (this.buildings[i].rate * this.buildings[i].amount) * this.raw_cps_boost
            }
            this.total_rate = this.total_rate + (this.buildings[i].rate * this.buildings[i].amount)
        }
    }
    const update_fish = () => {
        this.time_to_catch -= 1;
        var fish_cool = 7
        fish_cool -= 1
        this.fish_pos += this.fish_move * 0.7
        if (this.fish_pos <= 20) {
            this.fish_move = 1
        } else if (this.fish_pos > 180) {
            this.fish_move = -1
        } else if (fish_cool < 0) {
            fish_cool = 7
            this.fish_move = Math.random * 2 -1;
        }
        if (this.fishing) {
            this.player_rect = { x: (50 + this.player_pos), y: 500, width: this.lure_size, height: 50 };
            this.fish_rect = { x: (50 + this.fish_pos), y: 500, width: 20, height: 50 };
            
            if (!isColliding(this.player_rect, this.fish_rect)) {
                this.money -= 10 * this.fish_buff
                this.fishing = false;
            } else if (this.time_to_catch < 0) {
                this.money += (this.currently_fishing.rate * 10) * this.raw_cps_boost * this.fish_buff;
                this.fishing = false;
            }
        }  
    }
    window.addEventListener('keyup', (e) => {
        this.key[e.key] = false;
    });
    const random_fish = () => {
        return [Math.floor(Math.random() * this.possible_fish.length)]}
    const draw_ui = () => {
        // Vertical lines
        for (let i = 0; i < 2; i++) {
            ctx.beginPath();
            ctx.moveTo(window.innerWidth / 3 + (i * window.innerWidth / 3), 0);
            ctx.lineTo(window.innerWidth / 3 + (i * window.innerWidth / 3), innerHeight * 2);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        // Horizontal lines
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(window.innerWidth / 3, i * 100 + this.building_offset);
            ctx.lineTo(window.innerWidth / 3 + window.innerWidth / 3, i * 100 + this.building_offset);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        // Circle in the middle
        /*
        ctx.beginPath();
        ctx.arc(window.innerWidth / 3 / 2, window.innerHeight / 2, innerWidth / 7, 0, Math.PI * 2, false);
        ctx.fillStyle = "blue";
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.fill();
        */
        ctx.drawImage(lake_png, 0, 0, c.width/ 3, c.height)

        // Another line
        ctx.beginPath();
        ctx.moveTo(window.innerWidth / 3 * 2, 225);
        ctx.lineTo(window.innerWidth, 225);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.stroke();
    };
    
    
    const cast = () => {
        update_fish()
        if(this.player_pos > 0) {
            this.player_pos -= 0.7;
        }
        ctx.fillStyle = 'red'
        ctx.fillRect(50 + this.player_pos,500,this.lure_size,50)
        ctx.fillStyle = 'yellow'
        ctx.fillRect(50 + (1 * this.fish_pos),500,20,50)
        if (this.lure_buff) {
            this.player_rect ={x : (50 + this.player_pos), y : 500, width : this.lure_size + 200, height : 50}

        } else {
            this.player_rect ={x : (50 + this.player_pos), y : 500, width : this.lure_size, height : 50}
        }
        this.fish_rect ={x : (50 + this.fish_pos), y : 500, width : 20, height : 50}
        ctx.fillStyle = 'black'
        ctx.font = ("12px Arial")
        ctx.strokeRect(50,500,300,50)
        ctx.fillText(`Catching ${this.currently_fishing.name} worth $${formatNumber(this.currently_fishing.rate * this.fish_buff)} caught in ${this.time_to_catch}`, 50, 580)
    
    }
    const golden = () => {
        if (this.golden_on_screen)
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.golden_rect.x, this.golden_rect.y, this.golden_rect.width, this.golden_rect.height)
            ctx.drawImage(golden_bait_png, this.golden_rect.x, this.golden_rect.y, this.golden_rect.width, this.golden_rect.height)

    }
    
    const update = () => {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, c.width, c.height);
        
    

        // Displaying the money value
       
        update_money()
        
        ctx.fillStyle = 'white';
        //ctx.fillRect(window.innerWidth / 3, 0, window.innerWidth / 3, window.innerHeight);
        ctx.fillStyle = 'black  '
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].draw();
        }
        ctx.drawImage(shopback_png, window.innerWidth/3*2 +2,0, window.innerWidth/3, 223)
        update_upgrades()
        draw_ui();
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';

        ctx.fillText(`You have $${formatNumber(parseInt(this.money))}`, 5, 25);
        ctx.fillText(`Making ${formatNumber(parseFloat(this.total_rate))} per frame`, 5, 50)
        document.title = `Fish Clicker ${formatNumber(parseInt(this.money))}$`
        if (this.fishing) {
            cast();
        }
        
        if (this.golden_time > 0) {
            this.golden_time -= 1;
        }
        
        if (this.golden_time <= 0) {
            this.golden_rect.x = Math.random() * innerWidth / 3 * 2
            this.golden_rect.y = Math.random() * innerHeight
            this.golden_on_screen = true;
            this.golden_time = base_golden_time;
        }
        
        if (this.golden_on_screen) {
            golden()
        }

        if (this.golden_effect > 0) {
            this.golden_effect -= 1
        }
        if (this.golden_effect <= 0) {
            this.frenzy = false
            this.lure_buff = false
            
        }

    };

    update();
}

const game = new Main();

const swanson = document.getElementById('swanson');

var game = {
  shells: 0,
  totalBuildings: 0,
  buildingCoef: 0,
  sound: true,
  buyAmount: 1
};

var borg = {
  id: 'borg',
  amount: 0,
  initCost: 50,
  cost: 50,
  grow: 0.1,
  growCoef: 1.018,
  coef: 1.05
};

var pizza = {
  id: 'pizza',
  amount: 0,
  initCost: 500,
  cost: 500,
  grow: 4,
  growCoef: 1.02,
  coef: 1.06
};

var snail = {
  id: 'snail',
  amount: 0,
  initCost: 5000,
  cost: 5000,
  grow: 10,
  growCoef: 1.019,
  coef: 1.07
};

var pineapple = {
  id: 'pineapple',
  amount: 0,
  initCost: 25000,
  cost: 25000,
  grow: 25,
  growCoef: 1.02,
  coef: 1.08
};

function mouseDown() {
  swanson.src = "https://i.imgur.com/ErwaWfC.png";
}

function mouseUp() {
  swanson.src = "https://imgur.com/MGYixhN.png";
}

// Simple way of selecting a buy multiple button
function select(id) {
  switch(id) {
    case 'multipleO':
      document.getElementById(id).style.backgroundColor = '#33a0ff';
      document.getElementById('multipleT').style.backgroundColor = '#999999';
      document.getElementById('multipleH').style.backgroundColor = '#999999';
      game.buyAmount = 1;
      updateCost();
      break;
    case 'multipleT':
      document.getElementById(id).style.backgroundColor = '#33a0ff';
      document.getElementById('multipleO').style.backgroundColor = '#999999';
      document.getElementById('multipleH').style.backgroundColor = '#999999';
      game.buyAmount = 10;
      updateCost();
      break;
    case 'multipleH':
      document.getElementById(id).style.backgroundColor = '#33a0ff';
      document.getElementById('multipleO').style.backgroundColor = '#999999';
      document.getElementById('multipleT').style.backgroundColor = '#999999';
      game.buyAmount = 100;
      updateCost();
      break;
  }
}

// can be optimized, checks for upgrade availability, updates cost, and Shells Per Second
function updateSwanson(clickAmount) {
  buttonsAvailable(borg.cost, borg.id);
  buttonsAvailable(pizza.cost, pizza.id);
  buttonsAvailable(snail.cost, snail.id);
  buttonsAvailable(pineapple.cost, pineapple.id);
  updateCost(borg);
  updateCost(pizza);
  updateCost(snail);
  updateCost(pineapple);
  shellsPerSecond();

  game.shells += (clickAmount * game.buildingCoef);
  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(game.shells)} shells!`;
}
// given the cost formula, update the cost of a given upgrade
function updateCost(upgrade) {
  var costFormula = ((upgrade.initCost * (Math.pow(upgrade.coef, game.buyAmount + upgrade.amount) - Math.pow(upgrade.coef, upgrade.amount))) / (upgrade.coef - 1));
  upgrade.cost = costFormula
  document.getElementById(`${upgrade.id}Cost`).innerHTML = numberWithCommas(costFormula);
}

// initialize game variables and upgrades. Load initial HTML
function initializeGame() {

  game.shells = 0;
  game.totalBuildings = 0;
  game.buildingCoef = Math.pow(1.015, (game.totalBuildings));
  game.sound = true;
  game.reset = 0;
  game.buyAmount = 1;

  borg.amount = 0;
  borg.cost = 50;
  borg.initCost = 50;

  pizza.amount = 0;
  pizza.cost = 500;
  pizza.initCost = 500;

  snail.amount = 0;
  snail.cost = 5000;
  snail.initCost = 5000;

  pineapple.amount = 0;
  pineapple.cost = 25000;
  pineapple.initCost = 25000;

  log("Game running");

  // shellsPerSecond();

  document.getElementById('multipleO').style.backgroundColor = '#33a0ff';
  document.getElementById('multipleT').style.backgroundColor = '#999999';
  document.getElementById('multipleH').style.backgroundColor = '#999999';

  document.getElementById('Sound').innerHTML = "Sound: " + (game.sound ? "On" : "Off");
  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(game.shells)} shells!`;
  // Load the upgrades table
  document.getElementById('borg').disabled = true;
  document.getElementById('borgOwned').innerHTML = borg.amount.toFixed(0);
  document.getElementById('borgCost').innerHTML = numberWithCommas(borg.cost);

  document.getElementById('pizza').disabled = true;
  document.getElementById('pizzaOwned').innerHTML = pizza.amount.toFixed(0);
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizza.cost);

  document.getElementById('snail').disabled = true;
  document.getElementById('snailOwned').innerHTML = snail.amount.toFixed(0);
  document.getElementById('snailCost').innerHTML = numberWithCommas(snail.cost);

  document.getElementById('pineapple').disabled = true;
  document.getElementById('pineappleOwned').innerHTML = pineapple.amount.toFixed(0);
  document.getElementById('pineappleCost').innerHTML = numberWithCommas(pineapple.cost);
}

// Probably a better method, but this works for number conversion
const numberWithCommas = (x) => {
  var number = String(x.toFixed(2));
  var digitsPastFirst = 0;
  for(var i = 1; i < number.length; i++) {
    if(number.charAt(i) !== '') {
      digitsPastFirst++;
    }
  }
  switch (digitsPastFirst) {
    case 3, 4, 5:
      return x.toFixed(2);
    case 6:
      return (x / 1000).toFixed(3) + "K";
    case 7:
      return (x / 1000).toFixed(3) + "K";
    case 8:
      return (x / 1000).toFixed(3) + "K";
    case 9:
      return (x / 1000000).toFixed(3) + "M";
    case 10:
      return (x / 1000000).toFixed(3) + "M";
    case 11:
      return (x / 1000000).toFixed(3) + "M";
    case 12:
      return (x / 1000000000).toFixed(3) + "B";
    case 13:
      return (x / 1000000000).toFixed(3) + "B";
    case 14:
      return (x / 1000000000).toFixed(3) + "B";
    case 15:
      return (x / 1000000000000).toFixed(3) + "T";
    case 16:
      return (x / 1000000000000).toFixed(3) + "T";
    case 17:
      return (x / 1000000000000).toFixed(3) + "T";
    case 18:
      return (x / 1000000000000000).toFixed(3) + "Qua";
    case 19:
      return (x / 1000000000000000).toFixed(3) + "Qua";
    case 20:
      return (x / 1000000000000000).toFixed(3) + "Qua";
    case 21:
      return (x / 1000000000000000000).toFixed(3) + "Qui";
    case 22:
      return (x / 1000000000000000000).toFixed(3) + "Qui";
    case 23:
      return (x / 1000000000000000000).toFixed(3) + "Qui";
    case 24:
      return (x / 1000000000000000000000).toFixed(3) + "Sx";
    case 25:
      return (x / 1000000000000000000000).toFixed(3) + "Sx";
    case 26:
      return (x / 1000000000000000000000).toFixed(3) + "Sx";
    case 27:
      return (x / 1000000000000000000000000).toFixed(3) + "Sp";
    case 28:
      return (x / 1000000000000000000000000).toFixed(3) + "Sp";
    case 29:
      return (x / 1000000000000000000000000).toFixed(3) + "Sp";
    case 30:
      return (x / 1000000000000000000000000000).toFixed(3) + "Oc";
    case 31:
      return (x / 1000000000000000000000000000).toFixed(3) + "Oc";
    case 32:
      return (x / 1000000000000000000000000000).toFixed(3) + "Oc";
    case 33:
      return (x / 1000000000000000000000000000000).toFixed(3) + "Non";
    case 34:
      return (x / 1000000000000000000000000000000).toFixed(3) + "Non";
    case 35:
      return (x / 1000000000000000000000000000000).toFixed(3) + "Non";
    default:
      return x.toFixed(2);
  }
}

function buyUpgrade(upgrade, amount){
  var costFormula = ((upgrade.initCost * (Math.pow(upgrade.coef, amount + upgrade.amount) - Math.pow(upgrade.coef, upgrade.amount))) / (upgrade.coef - 1));
  // Calculate buying multiple buildings. This equation can be found here: https://blog.kongregate.com/the-math-of-idle-games-part-i/
  upgrade.cost = costFormula;
  // if shells is greater or equal to total cost of upgrades
  if(game.shells >= upgrade.cost) {
    upgrade.amount += amount // buy amount
    game.totalBuildings += amount; // increase total buildings by amount
    game.shells -= upgrade.cost; // subtract the shells by total cost
    document.getElementById(`${upgrade.id}Owned`).innerHTML = upgrade.amount.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(game.shells)} shells!`;
    log(`${upgrade.id} purchased! ${upgrade.id} count: ` + upgrade.amount, 1)
  };
  upgrade.cost = costFormula;
  document.getElementById(`${upgrade.id}Cost`).innerHTML = numberWithCommas(upgrade.cost);
}

// using a formula, calculates the total Shells Per Second and individual upgrades
function shellsPerSecond() {
  var borgSPS = (((borg.grow * borg.amount) * (borg.growCoef)) * 10) * game.buildingCoef;
  document.getElementById(`${borg.id}Info`).innerHTML = `SPS: ${numberWithCommas(borgSPS)}`;

  var pizzaSPS = ((pizza.grow * pizza.amount) * (pizza.growCoef)) * game.buildingCoef;
  document.getElementById(`${pizza.id}Info`).innerHTML = `SPS: ${numberWithCommas(pizzaSPS)}`;

  var snailSPS = ((snail.grow * snail.amount) * (snail.growCoef)) * game.buildingCoef;
  document.getElementById(`${snail.id}Info`).innerHTML = `SPS: ${numberWithCommas(snailSPS)}`;

  var pineappleSPS = ((pineapple.grow * pineapple.amount) * (pineapple.growCoef)) * game.buildingCoef;
  document.getElementById(`${pineapple.id}Info`).innerHTML = `SPS: ${numberWithCommas(pineappleSPS)}`;

  var totalSPS =  (borgSPS + pizzaSPS + snailSPS + pineappleSPS);
  document.getElementById('sps').innerHTML = `Per second: ${numberWithCommas(totalSPS)}`;
}

// updates what buttons are available based on how many shells swanson has
function buttonsAvailable(itemCost, id) {
  if(game.shells < itemCost) {
    document.getElementById(id).disabled = true;
  } else {
    document.getElementById(id).disabled = false;
  }
}

// generates and plays quacks and clicks
function playAudio(sound) {
  if(game.sound) {
    var audio = new Audio(sound);
    audio.play();
  }
}

// Toggle all sounds
function toggleSound() {
  if(game.sound) {
    game.sound = false;
    document.getElementById('Sound').innerHTML = "Sound: " + (game.sound ? "On" : "Off");
  } else {
    game.sound = true;
    document.getElementById('Sound').innerHTML = "Sound: " + (game.sound ? "On" : "Off");
  }
}

// For debugging
function log(message, level) {
  switch (level) {
    case 1:
      console.log(Date.now().toString() + " [INFO] " + message)
      break;
    case 2:
      console.log(Date.now().toString() + " [ERROR] " + message)
      break;
    case 3:
      console.log(Date.now().toString() + " [EASTER EGG] " + message)
  }
}

// Saves all game variables to localStorage
function save() {
  var save = {
    game,
    borg,
    pizza,
    snail,
    pineapple
  }
  try {
    localStorage.setItem("save", JSON.stringify(save));
    log("Game successfully saved!", 1)
  } catch(err) {
    log("Something went wrong with saving! Error: " + err, 2)
  }
}

// Will initialize game variables then load existing ones
function load() {

  initializeGame();

  var save = JSON.parse(localStorage.getItem("save"));

  if(typeof save.game !== "undefined") game = save.game;
  if(typeof save.borg !== "undefined") borg = save.borg;
  log("Initialized borg variable: " + borg, 1);
  if(typeof save.pizza !== "undefined") pizza = save.pizza;
  log("Initialized pizza variable: " + pizza, 1);
  if(typeof save.snail !== "undefined") snail = save.snail;
  log("Initialized snail variable: " + snail, 1);
  if(typeof save.pineapple !== "undefined") pineapple = save.pineapple;
  log("Initialized pineapple variable: " + pineapple, 1);

  document.getElementById('Sound').innerHTML = "Sound: " + (game.sound ? "On" : "Off");
  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(game.shells)} shells!`;

  document.getElementById('borg').disabled = true;
  document.getElementById(`${borg.id}Owned`).innerHTML = borg.amount.toFixed(0);
  document.getElementById(`${borg.id}Cost`).innerHTML = numberWithCommas(borg.cost);

  document.getElementById(pizza.id).disabled = true;
  document.getElementById(`${pizza.id}Owned`).innerHTML = pizza.amount.toFixed(0);
  document.getElementById(`${pizza.id}Cost`).innerHTML = numberWithCommas(pizza.cost);

  document.getElementById(snail.id).disabled = true;
  document.getElementById(`${snail.id}Owned`).innerHTML = snail.amount.toFixed(0);
  document.getElementById(`${snail.id}Cost`).innerHTML = numberWithCommas(snail.cost);

  document.getElementById(pineapple.id).disabled = true;
  document.getElementById(`${pineapple.id}Owned`).innerHTML = pineapple.amount.toFixed(0);
  document.getElementById(`${pineapple.id}Cost`).innerHTML = numberWithCommas(pineapple.cost);
}

// Do you wanna delete your localStorage?
function deleteSave() {
  reset = document.getElementById('Reset');
  if(reset.innerHTML === "Are you sure?") {
    localStorage.removeItem("save");
    initializeGame();
    reset.innerHTML = "Reset";
    log("Save Game successfully deleted!", 1);
  } else {
    reset.innerHTML = "Are you sure?";
    log("Second Chance to rethink what you're doing!", 1);
  }
}

// load the game when the window loads
window.onload = () => {
  log("Attempting to load variables from last save...", 1)
  load();
  log("❤️ you Turtle?", 3);
}

// updating the game every 100ms
setInterval(function() {
  updateSwanson(((borg.grow * borg.amount) * (borg.growCoef)));
  updateSwanson(((pizza.grow * pizza.amount) * (pizza.growCoef))/10);
  updateSwanson(((snail.grow * snail.amount) * (snail.growCoef))/10);
  updateSwanson(((pineapple.grow * pineapple.amount) * (pineapple.growCoef))/10);
}, 100)

// Saves every 5 seconds
setInterval(function() {
  save();
}, 5000)

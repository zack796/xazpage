// TODO: Convert vars to objects with properties

var shells;
var confirm;
var swanson;
var sound;

var borg;
var borgCost;

var pizza;
var pizzaCost;

var snail;
var snailCost;

var pineapple;
var pineappleCost;

var totalBuildings;

function mouseDown() {
  swanson.src = "https://i.imgur.com/ErwaWfC.png";
}

function mouseUp() {
  swanson.src = "https://imgur.com/MGYixhN.png";
}

function updateSwanson(clickAmount) {
  buttonsAvailable(borgCost, 'borg');
  buttonsAvailable(pizzaCost, 'pizza');
  buttonsAvailable(snailCost, 'snail');
  buttonsAvailable(pineappleCost, 'pineapple');
  shellsPerSecond();

  shells = shells + (clickAmount * Math.pow(1.015, (totalBuildings)));
  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
}

function initializeGame() {

  shells = 0;

  borg = 0;
  borgCost = 50;

  pizza = 0;
  pizzaCost = 500;

  snail = 0;
  snailCost = 1000;

  pineapple = 0;
  pineappleCost = 100000;

  confirm = 0;
  sound = true;
  totalBuildings = 0;

  log("Game initialized variables!", 1);

  // shellsPerSecond();

  document.getElementById('Sound').innerHTML = "Sound: " + (sound ? "On" : "Off");
  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
  // Load the upgrades table
  document.getElementById('borg').disabled = true;
  document.getElementById('borgOwned').innerHTML = borg.toFixed(0);
  document.getElementById('borgCost').innerHTML = numberWithCommas(borgCost);

  document.getElementById('pizza').disabled = true;
  document.getElementById('pizzaOwned').innerHTML = pizza.toFixed(0);
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizzaCost);

  document.getElementById('snail').disabled = true;
  document.getElementById('snailOwned').innerHTML = snail.toFixed(0);
  document.getElementById('snailCost').innerHTML = numberWithCommas(snailCost);

  document.getElementById('pineapple').disabled = true;
  document.getElementById('pineappleOwned').innerHTML = pineapple.toFixed(0);
  document.getElementById('pineappleCost').innerHTML = numberWithCommas(pineappleCost);

  swanson = document.getElementById('swanson');
}

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

function buyBorg(){
  borgCost = 5 + (45 * Math.pow(1.05, borg));
  if(shells >= borgCost) {
    borg += 1;
    totalBuildings += 1;
    shells -= borgCost;
    document.getElementById('borgOwned').innerHTML = borg.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
    log("Borg Clicker Purchased! Borg Clicker Count: " + borg, 1)
  };
  borgCost = 5 + (45 * Math.pow(1.05, borg));
  document.getElementById('borgCost').innerHTML = numberWithCommas(borgCost);
}

function buyPizza(){
   pizzaCost = 200 + (300 * Math.pow(1.06, pizza));
  if(shells >= pizzaCost) {
    pizza += 1;
    totalBuildings += 1;
    shells -= pizzaCost;
    document.getElementById('pizzaOwned').innerHTML = pizza.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
    log("Pizza Shop Purchased! Pizza Shop Count: " + pizza, 1)
  };
  pizzaCost = 200 + (300 * Math.pow(1.06, pizza));
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizzaCost);
}

function buySnail(){
   snailCost = 100 + (900 * Math.pow(1.07, snail));
  if(shells >= snailCost) {
    snail += 1;
    totalBuildings += 1;
    shells -= snailCost;
    document.getElementById('snailOwned').innerHTML = snail.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
    log("Snail Racer Purchased! Snail Racer Count: " + snail, 1)
  };
  snailCost = 100 + (900 * Math.pow(1.07, snail));
  document.getElementById('snailCost').innerHTML = numberWithCommas(snailCost);
}

function buyPineapple(){
   pineappleCost = 10000 + (90000 * Math.pow(1.08, pineapple));
  if(shells >= pineappleCost) {
    pineapple += 1;
    totalBuildings += 1;
    shells -= pineappleCost;
    document.getElementById('pineappleOwned').innerHTML = pineapple.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
    log("Pineapple Farm Purchased! Pineapple Farm Count: " + pineapple, 1)
  };
  pineappleCost = 10000 + (90000 * Math.pow(1.08, pineapple));
  document.getElementById('pineappleCost').innerHTML = numberWithCommas(pineappleCost);
}

function shellsPerSecond() {
  var borgSPS = (((0.1 * borg) * (1.018))*10);
  var pizzaSPS = ((3.2 * pizza) * (1.02));
  var snailSPS = ((10 * snail) * (1.019));
  var pineappleSPS = ((25 * pineapple) * (1.02));

  var totalSPS =  (borgSPS + pizzaSPS + snailSPS + pineappleSPS) * Math.pow(1.015, (totalBuildings));
  document.getElementById('sps').innerHTML = `Per second: ${numberWithCommas(totalSPS)}`;
}

function buttonsAvailable(itemCost, id) {
  if(shells < itemCost) {
    document.getElementById(id).disabled = true;
  } else {
    document.getElementById(id).disabled = false;
  }
}

function playAudio() {
  if(sound) {
    var audio = new Audio('quack.mp3');
    audio.play();
  }
}

function toggleSound() {
  if(sound) {
    sound = false;
    document.getElementById('Sound').innerHTML = "Sound: " + (sound ? "On" : "Off");
  } else {
    sound = true;
    document.getElementById('Sound').innerHTML = "Sound: " + (sound ? "On" : "Off");
  }
}

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

function save() {
  var save = {
    shells: shells,
    borg: borg,
    borgCost: borgCost,
    pizza: pizza,
    pizzaCost: pizzaCost,
    snail: snail,
    snailCost: snailCost,
    pineapple: pineapple,
    pineappleCost: pineappleCost,
    sound: sound,
    totalBuildings: totalBuildings
  }
  try {
    localStorage.setItem("save", JSON.stringify(save));
    log("Game successfully saved!", 1)
  } catch(err) {
    log("Something went wrong with saving! Error: " + err, 2)
  }
}

function load() {

  initializeGame();

  var saveGame = JSON.parse(localStorage.getItem("save"));
  if(typeof saveGame.shells !== "undefined") shells = saveGame.shells;
  if(typeof saveGame.borg !== "undefined") borg = saveGame.borg;
  if(typeof saveGame.borgCost !== "undefined") borgCost = saveGame.borgCost;
  if(typeof saveGame.pizza !== "undefined") pizza = saveGame.pizza;
  if(typeof saveGame.pizzaCost !== "undefined") pizzaCost = saveGame.pizzaCost;
  if(typeof saveGame.snail !== "undefined") snail = saveGame.snail;
  if(typeof saveGame.snailCost !== "undefined") snailCost = saveGame.snailCost;
  if(typeof saveGame.pineapple !== "undefined") pineapple = saveGame.pineapple;
  if(typeof saveGame.pineappleCost !== "undefined") pineappleCost = saveGame.pineappleCost;
  if(typeof saveGame.sound !== "undefined") sound = saveGame.sound;
  if(typeof saveGame.totalBuildings !== "undefined") totalBuildings = saveGame.totalBuildings;

  // shellsPerSecond();

  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
  document.getElementById('borg').disabled = true;
  document.getElementById('borgOwned').innerHTML = borg.toFixed(0);
  document.getElementById('borgCost').innerHTML = numberWithCommas(borgCost);

  document.getElementById('pizza').disabled = true;
  document.getElementById('pizzaOwned').innerHTML = pizza.toFixed(0);
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizzaCost);

  document.getElementById('snail').disabled = true;
  document.getElementById('snailOwned').innerHTML = snail.toFixed(0);
  document.getElementById('snailCost').innerHTML = numberWithCommas(snailCost);

  document.getElementById('pineapple').disabled = true;
  document.getElementById('pineappleOwned').innerHTML = pineapple.toFixed(0);
  document.getElementById('pineappleCost').innerHTML = numberWithCommas(pineappleCost);

  document.getElementById('Sound').innerHTML = "Sound: " + (sound ? "On" : "Off");
}

function deleteSave() {
  var reset = document.getElementById('Reset');
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

window.onload = () => {
  log("Attempting to load variables from last save...", 1)
  load();
  log("❤️ you Turtle?", 3);
}

setInterval(function() {
  updateSwanson(((0.1*borg) * (1.018)));
}, 100)

setInterval(function() {
  updateSwanson(((3.2 * pizza) * (1.02)));
  updateSwanson(((10 * snail) * (1.019)));
  updateSwanson(((25 * pineapple) * (1.02)));
}, 1000)

setInterval(function() {
  save();
}, 2500)

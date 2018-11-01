var shells;
var confirm;
var swanson;
var sound;

var borg;
var borgCost;

var pizza;
var pizzaCost;

function mouseDown() {
  swanson.src = "https://i.imgur.com/ErwaWfC.png";
}

function mouseUp() {
  swanson.src = "https://imgur.com/MGYixhN.png";
}

function updateSwanson(clickAmount) {
  buttonsAvailable(borgCost, 'borg');
  buttonsAvailable(pizzaCost, 'pizza');
  shells = shells + (clickAmount);
  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
}

function initializeGame() {

  shells = 0;
  borg = 0;
  borgCost = 25;
  pizza = 0;
  pizzaCost = 100;
  confirm = 0;
  sound = true;

  log("Game initialized variables!", 1)

  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
  document.getElementById('borg').disabled = true;
  document.getElementById('borgOwned').innerHTML = borg.toFixed(0);
  document.getElementById('borgCost').innerHTML = numberWithCommas(borgCost);

  document.getElementById('pizza').disabled = true;
  document.getElementById('pizzaOwned').innerHTML = pizza.toFixed(0);
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizzaCost);

  document.getElementById('Sound').innerHTML = "Sound: " + (sound ? "On" : "Off");
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
      return (x / 1000000000).toFixed(3) + "T";
    default:
      return x.toFixed(2);
  }
}

function buyBorg(){
   borgCost = (20 + (5 * Math.pow(1.0618, borg)));
  if(shells >= borgCost) {
    borg += 1;
    shells -= borgCost;
    document.getElementById('borgOwned').innerHTML = borg.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
    log("Clicker Purchased! Clicker Count: " + borg, 1)
  };
  borgCost = (20 + (5 * Math.pow(1.0618, borg)));
  document.getElementById('borgCost').innerHTML = numberWithCommas(borgCost);
}

function buyPizza(){
   pizzaCost = Math.floor(80 + (20 * Math.pow(1.118, pizza)));
  if(shells >= pizzaCost) {
    pizza += 1;
    shells -= pizzaCost;
    document.getElementById('pizzaOwned').innerHTML = pizza.toFixed(0);
    document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
    log("Pizza Shop Purchased! Pizza Shop Count: " + pizza, 1)
  };
  pizzaCost = Math.floor(80 + (20 * Math.pow(1.118, pizza)));
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizzaCost);
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
    sound: sound
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
  if(typeof saveGame.pizzaCost !== "undefined") sound = saveGame.sound;

  document.getElementById('shells').innerHTML = `Swanson has collected ${numberWithCommas(shells)} shells!`;
  document.getElementById('borg').disabled = true;
  document.getElementById('borgOwned').innerHTML = borg.toFixed(0);
  document.getElementById('borgCost').innerHTML = numberWithCommas(borgCost);

  document.getElementById('pizza').disabled = true;
  document.getElementById('pizzaOwned').innerHTML = pizza.toFixed(0);
  document.getElementById('pizzaCost').innerHTML = numberWithCommas(pizzaCost);

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
  updateSwanson(((3.2 * pizza) * (1.118)));
}, 1000)

setInterval(function() {
  save();
}, 5000)

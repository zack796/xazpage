var shells;
var swanson;

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

function initializeGame() {
  borg = 0;
  borgCost = 10;
  pizza = 0;
  pizzaCost = 100;
  
  log("Attempting to load variables from last save", 1)
  load();
  log("Game initialized variables!", 1)

  document.getElementById('shells').innerHTML = `Swanson has been clicked ${shells.toFixed(2)} times!`;
  document.getElementById('borg').disabled = true;
  document.getElementById('borgOwned').innerHTML = borg;
  document.getElementById('borgCost').innerHTML = borgCost;

  document.getElementById('pizza').disabled = true;
  document.getElementById('pizzaOwned').innerHTML = pizza;
  document.getElementById('pizzaCost').innerHTML = pizzaCost;

  swanson = document.getElementById('swanson');
}

function updateSwanson(clickAmount) {
  buttonsAvailable(borgCost, 'borg');
  buttonsAvailable(pizzaCost, 'pizza');
  shells = shells + (clickAmount);
  document.getElementById('shells').innerHTML = `Swanson has been clicked ${shells.toFixed(2)} times!`;
}

function buyBorg(){
   borgCost = Math.floor(10 * Math.pow(1.61, borg));
  if(shells >= borgCost) {
    borg += 1;
    shells -= borgCost;
    document.getElementById('borgOwned').innerHTML = borg;
    document.getElementById('shells').innerHTML = `Swanson has been clicked ${shells.toFixed(2)} times!`;
    log("Clicker Purchased! Clicker Count: " + borg, 1)
  };
  borgCost = Math.floor(10 * Math.pow(1.61, borg));
  document.getElementById('borgCost').innerHTML = borgCost;
}

function buyPizza(){
   pizzaCost = Math.floor(100 * Math.pow(3.22, pizza));
  if(shells >= pizzaCost) {
    pizza += 1;
    shells -= pizzaCost;
    document.getElementById('pizzaOwned').innerHTML = pizza;
    document.getElementById('shells').innerHTML = `Swanson has been clicked ${shells.toFixed(2)} times!`;
    log("Pizza Shop Purchased! Pizza Shop Count: " + pizza, 1)
  };
  pizzaCost = Math.floor(100 * Math.pow(3.22, pizza));
  document.getElementById('pizzaCost').innerHTML = pizzaCost;
}

function buttonsAvailable(itemCost, id) {
  if(shells < itemCost) {
    document.getElementById(id).disabled = true;
  } else {
    document.getElementById(id).disabled = false;
  }
}

function playAudio() {
  var audio = new Audio('quack.mp3');
  audio.play();
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
    pizzaCost: pizzaCost
  }
  try {
    localStorage.setItem("save", JSON.stringify(save));
    log("Game successfully saved!", 1)
  } catch(err) {
    log("Something went wrong with saving! Error: " + err, 2)
  }
}

function load() {
  shells = 0;
  borg = 0;
  borgCost = 10;
  pizza = 0;
  pizzaCost = 100;
  var saveGame = JSON.parse(localStorage.getItem("save"));
  log(saveGame.shells, 1);
  log(saveGame.borg, 1);
  log(saveGame.borgCost, 1);
  log(saveGame.pizzaCost, 1);
  if(typeof saveGame.shells !== "undefined") shells = saveGame.shells;
  if(typeof saveGame.borg !== "undefined") borg = saveGame.borg;
  if(typeof saveGame.borgCost !== "undefined") borgCost = saveGame.borgCost;
  if(typeof saveGame.pizza !== "undefined") pizza = saveGame.pizza;
  if(typeof saveGame.pizzaCost !== "undefined") pizzaCost = saveGame.pizzaCost;
}

function deleteSave() {
  localStorage.removeItem("save");
  log("Saved storage delted. Time to start over!", 1)
}

window.onload = () => {
  initializeGame();
  load();
  log("❤️ you Turtle?", 3);
}

setInterval(function() {
  updateSwanson(borg/20);
}, 100)

setInterval(function() {
  updateSwanson(pizza*2);
}, 500)

setInterval(function() {
  save();
}, 10000)

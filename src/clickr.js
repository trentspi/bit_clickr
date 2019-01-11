var scene;
var bits = 0.0;
var BIT_CLICKER_PRICE = 15;
var BIT_CHOMPER_PRICE = 100;
var BIT_PAYLOAD_PRICE = 1000;
var BIT_MINER_PRICE = 10000;

var BIT_CLICKER_RATE = .1;
var BIT_CHOMPER_RATE = 1;
var BIT_PAYLOAD_RATE = 8;
var BIT_MINER_RATE = 42;

var BIT_CLICKER_QTY = 0;
var BIT_CHOMPER_QTY = 0;
var BIT_PAYLOAD_QTY = 0;
var BIT_MINER_QTY = 0;

bitSound = new Sound('../coin.mp3');
bitTimer = new Timer();

function bitComputer() {
  b = new Sprite(scene, "../img/bitclickr.png", 700 ,500);
  b.setPosition(350,375);
  b.setSpeed(0);

  b.scaleOnHover = function() {
    if(scene.getMouseX() > 100 && scene.getMouseX() < b.width+90) {
      if(scene.getMouseY() > 375 && scene.getMouseY() < b.height+275) {
        b.width = b.width + 10;
        b.height = b.height + 10;
      }
    }
  }

  b.checkClick = function() {
    if(this.isClicked()) {
      bitSound.play();
      b.width = b.width - 10;
      b.height = b.height - 10;
      bits++;
    }
  }

  return b;
}

function init(){
  scene = new Scene();
  scene.setSize(800,600);
  bits = 0;
  bitTimer.reset();
  bitCounter = document.getElementById("bitCounter");
  clickerCounter = document.getElementById("owned-bit-clickers");
  chomperCounter = document.getElementById("owned-bit-chompers");
  payloadCounter = document.getElementById("owned-bit-payloads");
  minerCounter = document.getElementById("owned-bit-miners");
  bitRateCounter = document.getElementById("bitRate");
  clickerCost = document.getElementById("clicker-cost");
  chomperCost = document.getElementById("chomper-cost");
  payloadCost = document.getElementById("payload-cost");
  minerCost = document.getElementById("miner-cost");
  autoBitBank();
  scene.start();
} // end init 

function update(){ 
  scene.clear();
  var bc = bitComputer();
  bc.checkClick();
  bc.scaleOnHover();
  bc.update();
  updateBits();
  updateQty();
  updateBitRate();
  updatePrice();
} // end update 

function updateBits() {
  result = "You have: " + bits + " bits";
  bitCounter.innerHTML = result;
}

function autoBitBank() {
    millis = bitTimer.getElapsedTime() * 1000;

    var clickerInterval = setInterval( function() {
      bits += BIT_CLICKER_QTY;
    }, 10000);

    var chomperInterval = setInterval( function() {
      bits += BIT_CHOMPER_QTY;
    }, 1000);

    var payloadInterval = setInterval( function() {
      bits += BIT_PAYLOAD_QTY;
    }, 125);

    var payloadInterval = setInterval( function() {
      bits += BIT_MINER_QTY;
    }, 24);
}

function updateQty() {
  if(BIT_CLICKER_QTY > 0) clickerCounter.innerHTML = '(' + BIT_CLICKER_QTY + ')';
  if(BIT_CHOMPER_QTY > 0) chomperCounter.innerHTML = '(' + BIT_CHOMPER_QTY + ')';
  if(BIT_PAYLOAD_QTY > 0) payloadCounter.innerHTML = '(' + BIT_PAYLOAD_QTY + ')';
  if(BIT_MINER_QTY > 0) minerCounter.innerHTML   = '(' + BIT_MINER_QTY + ')';
}

function updateBitRate() {
  var bitRate = BIT_CLICKER_QTY*BIT_CLICKER_RATE
  + BIT_CHOMPER_QTY*BIT_CHOMPER_RATE
  + BIT_PAYLOAD_QTY*BIT_PAYLOAD_RATE
  + BIT_MINER_QTY*BIT_MINER_RATE;

  bitRateCounter.innerHTML = bitRate + ' bit/s';
}

function updatePrice() {
  clickerCost.innerHTML = "Cost: " + BIT_CLICKER_PRICE + " bits";
  chomperCost.innerHTML = "Cost: " + BIT_CHOMPER_PRICE + " bits";
  payloadCost.innerHTML = "Cost: " + BIT_PAYLOAD_PRICE + " bits";
  minerCost.innerHTML = "Cost: " + BIT_MINER_PRICE + " bits";
}

function addBitClicker()  {
  BIT_CLICKER_QTY++;
  if(bits >= BIT_CLICKER_PRICE) {
    bits = bits - BIT_CLICKER_PRICE;
    BIT_CLICKER_PRICE += Math.round(BIT_CLICKER_PRICE * (1/5));
  }
  else {
    alert("You do not have enough bits for a bit clicker!");
  }
}

function addBitChomper() {
  BIT_CHOMPER_QTY++;
  if(bits >= BIT_CHOMPER_PRICE) {
    bits = bits - BIT_CHOMPER_PRICE;
    BIT_CHOMPER_PRICE += Math.round(BIT_CHOMPER_PRICE * (1/6.6));
  }
  else {
    alert("You do not have enough bits for a bit chomper!");
  }
}

function addBitPayload() {
  BIT_PAYLOAD_QTY++;
  if(bits >= BIT_PAYLOAD_PRICE) {
    bits = bits - BIT_PAYLOAD_PRICE;
    BIT_PAYLOAD_PRICE += Math.round(BIT_PAYLOAD_PRICE * (1/8));
  }
  else {
    alert("You do not have enough bits for a bit payload!");
  }
}

function addBitMiner() {
  BIT_MINER_QTY++;
  if(bits >= BIT_MINER_PRICE) {
    bits = bits - BIT_MINER_PRICE;
    BIT_MINER_PRICE += Math.round(BIT_MINER_PRICE * (1/10));
  }
  else {
    alert("You do not have enough bits for a bit miner!");
  }
}

function winGame() {
  if(bits >= 50000) {
    bits = 0.0;
    window.location = "https://www.youtube.com/watch?v=1Bix44C1EzY";
  }
  else {
    alert("You do not have enough bits to win the game!");
  }
}
var scene;
var bits = 0;

function bitComputer() {
  b = new Sprite(scene, "../img/bitclickr.png", 700 ,500);
  b.setPosition(350,375);
  b.setSpeed(0);

  b.checkClick = function() {
    if(this.isClicked()) {
      bits++;
    }
  }

  return b;
}

function init(){ 
  scene = new Scene();
  scene.setSize(800,600);
  bitCounter = document.getElementById("bitCounter");
 
  scene.start();
} // end init 

function update(){ 
  scene.clear();
  var x = bitComputer();
  x.checkClick();
  x.update();
  updateBits();
} // end update 

function updateBits() {
  result = "Bits: " + bits;
  bitCounter.innerHTML = result;
}
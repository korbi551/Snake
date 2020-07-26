var s;
var scl = 20;
var food;
var duration = 0;
var points = 0;
var highScore = 0;
var fr = 10;
var input;
var startY;
var startX;

document.addEventListener('DOMContentLoaded', function () {
  input = document.getElementById('difficulty');
  input.addEventListener('change', function () {
    const min = 10;
    const max = 100
    let value = parseInt(input.value);
    if (value < min) {
      value = min
      input.value = min
    } else if (value > max) {
      value = max
      input.value = max
    }
    fr = value
    setup()
  })
}, false);



function setup() {
  createCanvas(ceil((window.innerWidth - scl) / scl) * scl, ceil((window.innerHeight - window.innerHeight / 3) / scl) * scl);
  s = new Snake();
  frameRate(fr);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function pointsForNextFood() {
  if (points == 0) {
    return 100
  } else {
    return 10 * fr * fr - duration
  }
}

function draw() {
  background(51);

  if (s.eat(food)) {
    points += pointsForNextFood();
    if (points > highScore) {
      highScore = points;
    }
    duration = 0;
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  // console.log(duration);


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl)
  text(`Punkte: ${points} Hight Score: ${highScore}`, 5, scl * 0.8)
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function touchStarted() {
  startX = mouseX
  startY = mouseY
}

function touchEnded() {
  const vectorX = startX - mouseX
  const vectorY = startY - mouseY

  if (Math.abs(vectorX) < Math.abs(vectorY) && vectorY > 0) {
    //up
    s.dir(0, -1);
  } else if (Math.abs(vectorX) < Math.abs(vectorY) && vectorY < 0) {
    //down
    s.dir(0, 1);
    return false;
  } else if (Math.abs(vectorX) > Math.abs(vectorY) && vectorX < 0) {
    //right
    s.dir(1, 0);
  } else if (Math.abs(vectorX) > Math.abs(vectorY) && vectorX > 0) {
    //left
    s.dir(-1, 0);
  }
}
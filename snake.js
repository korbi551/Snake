function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];


  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y)
    if (d < 1) {
      this.total += 1;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      const pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('Starting over');
        duration = 0;
        points = 0;
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function () {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function () {
    fill(10, 135, 84);
    duration += 1;
    for (let i = 0; i < this.total; i++) {
      if (i === 0) {
        const endOfTail = this.tail[i]
        const beforeEndOfTail = this.tail[i + 1]
        let yDir
        let xDir
        //first point
        let x1
        let y1
        //second point
        let x2
        let y2
        //third point
        let x3
        let y3
        if (this.total === 1) {
          yDir = this.yspeed
          xDir = this.xspeed
        } else {
          yDir = beforeEndOfTail.y - endOfTail.y
          xDir = beforeEndOfTail.x - endOfTail.x
        }

        if (xDir > 0 && yDir === 0) {
          //move right
          x1 = endOfTail.x
          y1 = endOfTail.y + (scl / 2)
          x2 = endOfTail.x + scl
          y2 = endOfTail.y + scl
          x3 = endOfTail.x + scl
          y3 = endOfTail.y
        } else if (xDir < 0 && yDir === 0) {
          //move left
          x1 = endOfTail.x
          y1 = endOfTail.y
          x2 = endOfTail.x
          y2 = endOfTail.y + scl
          x3 = endOfTail.x + scl
          y3 = endOfTail.y + (scl / 2)
        } else if (xDir === 0 && yDir > 0) {
          //move dowm
          x1 = endOfTail.x + (scl / 2)
          y1 = endOfTail.y
          x2 = endOfTail.x + scl
          y2 = endOfTail.y + scl
          x3 = endOfTail.x
          y3 = endOfTail.y + scl
        } else if (xDir === 0 && yDir < 0) {
          //move up
          x1 = endOfTail.x
          y1 = endOfTail.y
          x2 = endOfTail.x + scl
          y2 = endOfTail.y
          x3 = endOfTail.x + (scl / 2)
          y3 = endOfTail.y + scl
        }
        //Draw end with triangle pointing in the right direction
        triangle(x1, y1, x2, y2, x3, y3);
      } else {
        //Draw tail
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
    }
    let tl = 0;
    let tr = 0;
    let br = 0;
    let bl = 0;
    if (this.xspeed === 1 && this.yspeed === 0) {
      //move right
      tr = 90
      br = 90
    } else if (this.xspeed === -1 && this.yspeed === 0) {
      //move left
      tl = 90
      bl = 90
    } else if (this.xspeed === 0 && this.yspeed === 1) {
      //move dowm
      br = 90
      bl = 90
    } else if (this.xspeed === 0 && this.yspeed === -1) {
      //move up
      tl = 90
      tr = 90
    }

    //Draw mouth of snake pointig in direction it's going
    rect(this.x, this.y, scl, scl, tl, tr, br, bl);
  }
}
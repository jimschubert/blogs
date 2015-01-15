class Animal{
  constructor(legs) {
    switch (legs) {
      case 2:
        this.locomotion = 'bipedal';
        break;
      case 4:
        this.locomotion = 'quadrapedal';
      default:
    }
  }
  move() {
    process.stdout.writeln("I'm a %j animal!", this.locomotion);
  }
  static getTypeName() {
    return "Animal";
  }
}

class Bird extends Animal {
  constructor(){
    super(2);
  }
}

class Lion extends Animal {
  constructor(){
    super(4);
  }
}

var bird = new Bird();
bird.move();

var lion = new Lion();
lion.move();

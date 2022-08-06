var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 980,
  height: 720,
  backgroundColor: '#5cacd7',
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var sprite;
var cursors;
var text;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("clouds-big", "clouds-big.png");
  this.load.image("clouds-small", "clouds-small.png");
  this.load.image("ring", "ring.png");
  this.load.spritesheet("dude", "dude.png", {
    frameWidth: 50,
    frameHeight: 50,
  });
}

function create() {
  cloudsBig = this.add.tileSprite(640, 200, 1280, 400, "clouds-big");
  cloudsSmall = this.add.tileSprite(
    640,
    200,
    1280,
    400,
    "clouds-small"
  );
  
  ring = this.add.image(480, 220, "ring")
  ring.setScale(4)

  sprite = this.physics.add.image(400, 300, "dude");

  // sprite.setDamping(true);
  // sprite.setDrag(0.99);
  // sprite.setMaxVelocity(200);

  cursors = this.input.keyboard.createCursorKeys();

  text = this.add.text(10, 10, "", { font: "32px Courier", fill: "black" });
}

function update() {
  cloudsBig.tilePositionX += 0.5;
  cloudsSmall.tilePositionX += 0.25;

  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(
      sprite.rotation,
      200,
      sprite.body.acceleration
    );
  } else {
    sprite.setAcceleration(0);
  }

  if (cursors.left.isDown) {
    sprite.setAngularVelocity(-300);
  } else if (cursors.right.isDown) {
    sprite.setAngularVelocity(300);
  } else {
    sprite.setAngularVelocity(0);
  }

  text.setText("Boxing!!");

  // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  // {
  //     fireBullet();
  // }

  this.physics.world.wrap(sprite, 32);

}

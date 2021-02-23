// Benedikt Groß
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine;
let boxA;
let boxB;
let ball;
let ball2;
let ball3;
let ground;
let wall;
let wall2;

let joyce;
let zherui;
let albert

let canvas;

function setup() {
  canvas = createCanvas(800, 600);

  joyce = loadImage('Joyce.png')
  zherui = loadImage('Zherui.png')
  albert = loadImage('Albert.png')

  // create an engine
  engine = Engine.create();

  // create two boxes and a ground
  boxA = Bodies.rectangle(200, 400, 80, 80);
  boxB = Bodies.rectangle(270, 350, 160, 80);
  ball = Bodies.circle(280, 10, 80);
  ball2 = Bodies.circle(200, 10, 80);
  ball3 = Bodies.circle(220, 40, 80);
  wall = Bodies.rectangle(10, 450, 80, 180, {
    // ground = Bodies.rectangle(400, 500, 810, 25, {
    // isStatic: true, angle: Math.PI * 0.06
    isStatic: true, angle: Math.PI * 0.00001
  });
  wall2 = Bodies.rectangle(600, 450, 80, 180, {
    // ground = Bodies.rectangle(400, 500, 810, 25, {
    // isStatic: true, angle: Math.PI * 0.06
    isStatic: true, angle: Math.PI * 0.00001
  });

  ground = Bodies.rectangle(400, 500, 810, 25, {
    // ground = Bodies.rectangle(400, 500, 810, 25, {
    // isStatic: true, angle: Math.PI * 0.06
    isStatic: true, angle: Math.PI * 0.00001
  });
  World.add(engine.world, [boxA, boxB, ball, ball2, ball3, wall, wall2, ground]);

  // setup mouse
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  noStroke();
  fill(255);
  drawVertices(boxA.vertices);
  drawVertices(boxB.vertices);
  drawVertices(ball.vertices);
  drawSprite(ball, joyce);
  drawSprite(ball2, zherui);
  drawSprite(ball3, albert);
  // drawVertices(ball2.vertices);
  drawVertices(wall.vertices);
  drawVertices(wall2.vertices);

  fill(128);
  drawVertices(ground.vertices);

  drawMouse(mouseConstraint);
}

function drawMouse(mouseConstraint) {
  if (mouseConstraint.body) {
    var pos = mouseConstraint.body.position;
    var offset = mouseConstraint.constraint.pointB;
    var m = mouseConstraint.mouse.position;
    stroke(0, 255, 0);
    strokeWeight(2);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function drawSprite(body, img) {
  const pos = body.position;
  const angle = body.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  imageMode(CENTER);
  image(img, 0, 0, 160, 160);
  pop();
}

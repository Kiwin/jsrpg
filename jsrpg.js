var canvas, ctx, width, height;
var GAME;
var fontSize = 18;
var font = fontSize.toString()+"px Arial";

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

Object.keyOf = function(_enum, value) {
  return Object.keys(_enum).find(key => _enum[key] === value);
}

function chr(c){
  return c.charCodeAt(0);
}

function formatForUse(str){
  str = str.replace(/^ +/,"");
  str = str.replace(/  +/g," ");
  return str;
}

function canvas_init(){
  canvas = document.getElementById('jsrpg');
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext("2d");
  ctx.font = font;
}

function ctx_clear(color = "#000"){
  ctx.fillStyle = color;
  ctx.fillRect(0,0,width,height);
}

document.addEventListener('keydown', function(event) {
  console.log("keyPressed: " + event.keyCode.toString());
});

var TAG = {"PICKUP_ABLE":0, "PLAYER":1}
var ID_CNT = 0;
class GameObject {
  constructor(){
    this.id = ID_CNT++;
    this.name = "gobj";
    this.tags = [];
  }

  use(item){
    console.log("Nothing happened");
  }
  get description(){
    let desc = this.id.toString();
    desc += ":"+this.name.toString();
    if(this.tags.length){
      desc += ":["+this.tags.join(";")+"]";
    }
    return desc;
  }
}

class GameCreature extends GameObject {
  constructor(x=0, y=0, hp=1){
    super();
    this.inventory = [];
    this.health = hp;
    this.x = x;
    this.y = y;
  }
  get currentTile() {
    return GAME.WORLD.tileAt(this.x, this.y);
  }

  takeDamage(damage){
    this.health-=damage;
  }
  heal(heal){
    this.health += heal;
  }
  get alive(){
    return this.health < 0;
  }
  onDeath(){
    console.log(this.id.toString()+" Died");
  }

}

class Player extends GameCreature {
  constructor() {
    super(0,0,3);
    this.name = "Player";
    this.tags.push(TAG.PLAYER);
  }
}

class GameItem extends GameObject{
  constructor(){
    super();
  }
}

var BIOME = {"PLAIN FIELD":0, "FOREST":1, "DESERT":2};
class Tile extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.biome = 0;
    this.worldObjects = [];
  }
}

class GameWorldGenerator {
  static generateTile(x, y){
    let tile = new Tile(x, y);
    tile.biome = Math.round(Math.random()*(Object.size(BIOME)-1));
    return tile;
  }
}

class Clock {
  
  constructor(startTime = 0){
    this.time = startTime;
  }

  get analog(){
    return this.hours.toString()+":"+this.minutes.toString();
  }

  get full(){
    return this.minutes.toString() + ":" +
          this.hours.toString() + " " +
          this.days.toString() + "-" +
          this.months.toString() + "-" +
          this.years.toString();
  }

  get minutes(){
    return Math.floor((this.time%Clock.hour())/Clock.minute());
  }

  get hours(){
    return Math.floor((this.time%Clock.day())/Clock.hour());
  }

  get days(){
    return Math.floor((this.time%Clock.month())/Clock.day());
  }
  
  get months(){
    return Math.floor((this.time%Clock.year())/Clock.month());
  }

  get years(){
    return Math.floor(this.time/Clock.year());
  }

  static minute(n=1){
    return n;
  }

  static hour(n=1){
    return n*60;
  }

  static day(n=1){
    return n*1440;
  }
  static month(n=1){
    return n*43200;
  }
  static year(n=1){
    return n*518400;
  }

  progressTime(progression){
    this.time += timeProgression;
  }

}

class GameWorld {
  constructor() {
    this.CLOCK = new Clock(Clock.day(3)+Clock.hour(5)+Clock.minute(37)+Clock.year(2));
    this.tiles = [];
  }
  tileAt(x, y){
    //Search For Tile in Tiles:Array
    this.tiles.forEach(tile => {
      if(tile.x == x && tile.y == y) return tile;
    });
    
    //Else Generate Tile via WorldGenerator:Class
    let newTile = GameWorldGenerator.generateTile(x, y);
    this.tiles.push(newTile);
    return newTile;
  }
}

class Game{

  constructor(){
    console.log("GAME: STARTED INITIALIZING");
    this.PLAYER = new Player();
    this.WORLD = new GameWorld();
    this.TERMINAL = new GameTerminal();
    console.log("GAME: DONE INITIALIZING");
  }

  start(){
    console.log("GAME: STARTED");
    ctx_clear();
    while(true){
      let str = "You are stading in a "
        + Object.keyOf(BIOME,GAME.PLAYER.currentTile.biome)
        + "\n The clock is "+ GAME.WORLD.CLOCK.full;
        GAME.TERMINAL.write(str);
      GAME.TERMINAL.draw(40,40);
      break;
    }
    console.log("GAME: STOPPED");
  }
}

class GameTerminal {

  constructor(){
    this.messages = [];
    this.inputField;
  }

  write(str){
    this.messages.push(str);
  }

  drawMessage(str, x, y, w){
    ctx.fillText(str, x, y, w);
  }

  draw(x,y){
    let str = this.messages.join("\n");
    ctx.fillStyle = "#fff";
    ctx.fillText(str,x,y);
  }

}

window.onload = function(){
  canvas_init();
  GAME = new Game();
  GAME.start();
}
var canvas, ctx, width, height;
var GAME;
var BIOME = {"PLAIN":0, "FOREST":0, "DESERT":0};
var TAG = {"PICKUP_ABLE":0}
var input = "";
var inputFilter = /[^a-zA-Z0-9 ]/
var font = "30px Arial";

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

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
  console.log("char: " + event.keyCode.toString());
  if(event.keyCode == 13){
    formatForUse(input).split(" ").forEach(function(str){
      if(str != ""){
      console.log(str);
      }
    }); 
    input = "";
  }else if(event.keyCode == 8){
    if(input.length>0){
      input = input.substr(0,input.length-1);
    }
  }else{
    inputKeyStr=String.fromCharCode(event.keyCode);
    if(!inputKeyStr.match(inputFilter)){ 
      input += inputKeyStr;
    }
  }
  ctx_clear();
  ctx.fillStyle = "#fff";
  ctx.fillText(input.replace(/ /g,"_"), 10, 40);
});


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
  }
}

class GameItem extends GameObject{
  constructor(){
    super();
  }
}

class Tile extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.biome = 0;
    this.worldObjects = [];
  }
}

class WorldGenerator {
  static generateTile(x, y){
    let tile = new Tile(x, y);
    tile.biome = Math.round(Math.random()*(BIOME.size()-1));
    return tile;
  }
}

class World {
  constructor() {
    this.tiles = [];
  }
  tileAt(x, y){
    //Search For Tile in Tiles:Array
    this.tiles.forEach(tile => {
      if(tile.x == x && tile.y == y) return tile;
    });
    
    //Else Generate Tile via WorldGenerator:Class
    let newTile = WorldGenerator.generateTile(x, y);
    this.tiles.push(newTile);
    return newTile;
  }
}

class Game{

  constructor(){
    console.log("GAME: STARTED INITIALIZING");
    this.PLAYER = new Player();
    this.WORLD = new World();
    console.log("GAME: DONE INITIALIZING");
  }

  start(){
    console.log("GAME: STARTED");
    ctx_clear();
    while(true){
      break;
    }
    console.log("GAME: STOPPED");
  }
}

window.onload = function(){
  canvas_init();
  GAME = new Game();
  GAME.start();
}
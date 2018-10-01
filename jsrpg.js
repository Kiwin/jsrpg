var canvas, ctx, width, height;
var GAME;
var fontSize = 18;
var font = fontSize+"px Alias";

function canvas_init(){
  canvas = document.getElementById('jsrpg');
  width = canvas.width;
  height = canvas.height;

  ctx = canvas.getContext("2d");
  ctx.font = font;
}

function ctx_clear(color = "#000"){
  ctx.fillStyle = color
  ctx.fillRect(0,0,width,height);
}

var ID_CNT=0
class GameObject {
  constructor(){
    this.id = ID_CNT++;
    this.name = "gobj";
    this.tags = [];
  }
}

const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);

var BIOME = {"PLAIN FIELD":0, "FOREST":1, "DESERT":2, "MOUNTAIN":3};
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.biome = BIOME["PLAIN FIELD"];
  }
}

class GameWorldGenerator {
  static generateTile(x, y){
    let tile = new Tile(x, y);
    tile.biome = BIOME["PLAIN FIELD"];
    return tile;
  }
}

class GameWorld {
  constructor() {
    this.tiles = [];
  }
  tileAt(x, y){
    //Search For Tile in Tiles:Array
    this.tiles.forEach(tile => {
      if(tile.x == x && tile.y == y) return tile;
    });
    
    //Else Generate Tile via WorldGenerator:Class
    var newTile = GameWorldGenerator.generateTile(x, y);
    var biomes = Object.keys(BIOME);
    newTile.biome = Math.round(Math.random()*3);
    this.tiles.push(newTile);
    return newTile;
  }
}

class GameCreature extends GameObject {
  constructor(){
    super();
    this.inventory = [];
    this.health = 1;
    this.x = 0;
    this.y = 0;
  }
  get currentTile(){
    return GAME.WORLD.tileAt(this.x, this.y);
  };
  onTurn(){
    console.log("Doodle");
  }
}

class Player extends GameCreature {
  constructor() {
    super();
  }
}

function chr(c){
  return c.charCodeAt(0);
}

var messages = [];

class Game {
  constructor(){
    this.WORLD = new GameWorld();
    this.PLAYER = new Player();
  }
  
  start(){
    console.log("GAME: STARTED");
    ctx_clear("#0000ff");
    while(true){
      ctx_clear();
      drawMessages();
      break;
    }
    console.log("GAME: STOPPED");
  }
}

function drawMessages(){
  messages.push("CURRENT: "+getKeyByValue(BIOME, GAME.PLAYER.currentTile.biome));
  messages.push("NORTH: "+getKeyByValue(BIOME, GAME.WORLD.tileAt(0,1).biome));
  messages.push("SOUTH: "+getKeyByValue(BIOME, GAME.WORLD.tileAt(0,-1).biome));
  messages.push("WEST: "+getKeyByValue(BIOME, GAME.WORLD.tileAt(1,0).biome));
  messages.push("EAST: "+getKeyByValue(BIOME, GAME.WORLD.tileAt(-1,0).biome));
  for(let i = 0; i < Math.min(30,messages.length); i++){
    ctx.fillStyle = "#ffffff";
    ctx.fillText(i+": "+messages[i], 50, height - (i * fontSize+10));
  }
}

window.onload = function(){
  canvas_init();
  GAME = new Game();
  GAME.start();
}



document.addEventListener('keydown', function(event) {
});
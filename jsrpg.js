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
    this.lastSelectedTile = null;
  }
  tileAt(x,y){
    console.log("awd");
    //Search For Tile in Tiles:Array
    this.tiles.forEach(tile => {
      if(x == tile.x || y == tile.y) {return tile;}
    });
    
    //Else Generate Tile via WorldGenerator:Class
    var newTile = GameWorldGenerator.generateTile(x, y);
    var biomes = Object.keys(BIOME);
    newTile.biome = Math.round(Math.random()*3);
    this.tiles.push(newTile);
    return newTile;
  }
  tileExist(x,y){
    this.tiles.forEach(tile => {
      if(tile.x == x && tile.y == y){
        this.lastSelectedTile = tile;
        return true;
      }
    });
    return false;
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
      break;
    }
    console.log("GAME: STOPPED");
  }
}
var x = 0;
var y = 0;
function drawMap(){
  console.log(x+";"+y);
  ctx_clear();
  for(let i = 0; i <= 20; i++){
    for(let j = 0; j <= 20; j++){
      var chr = "?";
      if(GAME.WORLD.tileExist(x+i-10,y+j-10)){
        chr = GAME.WORLD.tileAt(x+i-10,y+j-10);
      }
      ctx.fillStyle = "#ffffff";
      ctx.fillText(chr, i*fontSize, height-j*fontSize);
    } 
  }
}

window.onload = function(){
  canvas_init();
  GAME = new Game();
  GAME.start();
}



document.addEventListener('keydown', function(event) {
  let keyChar = String.fromCharCode(event.keyCode);
  console.log(event.keyCode);
  if(keyChar == "A"){
    x--;
    drawMap();
  }
  if(keyChar == "W"){
    drawMap();
    y++;
  }
  if(keyChar == "D"){
    drawMap();
    x++;
  }
  if(keyChar == "S"){
    y--;
    drawMap();
  }
});
var canvas, ctx, width, height;
var BIOME = ["PLAIN", "FOREST", "DESERT"];
var input = "";
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) input = "";
  else input += String.fromCharCode(event.keyCode);
  console.log(input);
});

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.biome = 0;
  }
}

class WorldGenerator {
  static generateTile(x, y){
    let tile = new Tile(x, y);
    tile.biome = Math.round(Math.random()*(BIOME.length-1));
    return tile;
  }
}

class World {
  constructor() {
    this.tiles = []
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

class Player {
  constructor() {
    this.x = 0,
    this.y = 0;
    this.inventory = [];
    this.currentTile = function(){WORLD.tileAt(this.x, this.y)};
  }
}

function chr(c){
  return c.charCodeAt(0);
}

window.onload = function(){
  game_init();
  game_start();
}

function canvas_init(){
  canvas = document.getElementById('jsrpg');
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;
}

function game_init(){
  console.log("GAME: STARTED INITIALIZING");
  canvas_init();
  ctx_clear();
  console.log("GAME: DONE INITIALIZING");
}

var WORLD, PLAYER;
function game_start(){
  console.log("GAME: STARTED");
  PLAYER = new Player();
  WORLD = new World();
}

function ctx_clear(color = "#000"){
  ctx.fillStyle = color
  ctx.fillRect(0,0,width,height);
}

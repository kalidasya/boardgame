playersTurn = 1
texts = {
  'start': "START",
  'fight': "Fight a bad guy",
  'fly': "Flying",
  'bad_luck': "Bad luck",
  'goto_start': "Go to start",
  'finish_fly': "Finish flying",
  'win': "Finish"
}
function findEntityByName(entity, name){
  tiles = Crafty(entity).get()
  for (var i = 0; i < tiles.length; i++){
    if (tiles[i].getName() == name){
      return tiles[i];
    }
  }
}
function findTileByName(name) {
  return findEntityByName('Tile', name)
}

function findTileIndex(tile){
  tiles = Crafty('Tile').get()
  for (var i = 0; i < tiles.length; i++){
    if (tiles[i] == tile){
      return i;
    }
  }
}

fightF = function(player) {
  player.color(player._colorCode, 0.5);
  player._ignore = true;
}
flyF = function(tileName){
  return function(player) {
    var finish = findTileByName(tileName)
    player.x = finish.x
    player.y = finish.y
  }
}
gotoStartF = function(player) {
  start = findTileByName('start')
  player.x = start.x + player._offsetX * 64
  player.y = start.y + player._offsetY * 64
  player._currentPos = 0
}
finishFlyF = function(player) {
  player._currentPos = findTileIndex(this);
}
winF = function(player) {
  alert("Player" + (playersTurn - 1) + " WON!!!")
  Crafty('Player').get().forEach(function(e){
    gotoStartF(e)
    player._ignore = false;
    player.color(player._colorCode, 1);
  });
  playersTurn = 1
}
startF = function(player) {
  Crafty.log("START")
  player._currentPos = 0;
}
tiles = [
  ['start', 0, 0, startF],
  ['fight', 4, 0, fightF],
  ['fly0', 6, 0, flyF('finish_fly0')],
  ['bad_luck', 12, 2, gotoStartF],
  ['goto_start', 0, 4, gotoStartF],
  ['bad_luck', 4, 4, gotoStartF],
  ['finish_fly1', 6, 4, finishFlyF],
  ['goto_start', 8, 4, gotoStartF],
  ['fight', 0, 6, fightF],
  ['win', 8, 6, winF],
  ['finish_fly0', 12, 6, finishFlyF],
  ['goto_start', 12, 8, gotoStartF],
  ['fly1', 0, 10, flyF('finish_fly1')],
  ['fight', 4, 12, fightF],
  ['goto_start', 8, 12, gotoStartF],
  ['win', 12, 12, winF],
]

tile_width = 120



function getTile(x, y) {
  found = tiles.some(function(element){
    if (element[1] == x && element[2] == y){
      text = texts[element[0]]
      if (text == undefined) {
        text = texts[element[0].substring(0, element[0].length - 1)]
      }
      e = Crafty.e('Tile').at(x, y).text(text).setName(element[0])
      e._withPlayer = element[3]
      return 1
    }
  })
  if (!found)  Crafty.e('Tile').at(x, y)
}

Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  14,
    height: 14,
    tile: {
      width:  64,
      height: 64
    }
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width()+256, Game.height());
    Crafty.background('rgb(249, 223, 125)');

    for (var i = 0; i < Game.map_grid.width; i+=2) {
      getTile(i, 0)
    }
    for (var i = 2; i < Game.map_grid.height; i+=2) {
      getTile(Game.map_grid.width-2, i)
    }
    for (var i = Game.map_grid.width-4; i >=0 ; i-=2) {
      getTile(i, Game.map_grid.height-2)
    }
    for (var i = Game.map_grid.height - 4; i >= 4; i-=2) {
      getTile(0, i)
    }
    for (var i = 2; i < Game.map_grid.width-4; i+=2) {
      getTile(i, 4)
    }
    for (var i = 6; i < Game.map_grid.height-6; i+=2) {
      getTile(Game.map_grid.width-6, i)
    }

    // Crafty('Tile').get().forEach(function (e, i){
    //   e.text(e.text() + i)
    // });

    Crafty.e('Player').at(0,0).text("Player1").setName('Player1').colorize(0).setOffset(0,0)
    Crafty.e('Player').at(0,1).text("Player2").setName('Player2').colorize(1).setOffset(0,1)
    Crafty.e('Player').at(1,0).text("Player3").setName('Player3').colorize(2).setOffset(1,0)
    Crafty.e('Player').at(1,1).text("Player4").setName('Player4').colorize(3).setOffset(1,1)
    Crafty.e('Roll').attr({x:Game.width(), y:0}).text('Roll');

  }
}

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
  var finish = null;
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
fightF = function(player) {
  player.color(player._colorCode, 0.5);
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
  player.x = start.x
  player.y = start.y
}
finishFlyF = function(player) {
}
winF = function(player) {
  alert("YOU WON!!!")
}
startF = function(player) {
  Crafty.log("START")
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
    for (var i = Game.map_grid.width-2; i >=0 ; i-=2) {
      getTile(i, Game.map_grid.height-2)
    }
    for (var i = Game.map_grid.height - 2; i >= 4; i-=2) {
      getTile(0, i)
    }
    for (var i = 2; i < Game.map_grid.width-4; i+=2) {
      getTile(i, 4)
    }
    for (var i = 4; i < Game.map_grid.height-6; i+=2) {
      getTile(Game.map_grid.width-6, i)
    }

    Crafty.e('Player').at(0,0).text("Player1").setName('Player1').colorize(0)
    // Crafty.e('Player').at(0,1).text("Player2").colorize(1)
    // Crafty.e('Player').at(1,0).text("Player3").colorize(2)
    // Crafty.e('Player').at(1,1).text("Player4").colorize(3)
    Crafty.e('Roll').attr({x:Game.width(), y:0}).text('Roll');

  }
}

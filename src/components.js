// The Grid component allows an element to be located
//  on a grid of tiles

Crafty.sprite(128, "images/sprite.png", {
  mezo: [0,0],
});


Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM, Grid, Collision');
  },
});
Crafty.c('Tile', {
  init: function() {
    this.requires('Actor, Color, Text, Delay')
      // .color('rgb(00, 00, FF)')
      // .color('none')
      .attr({w: 128, h:128})
      .textFont({ size: '20px', weight: 'bold' })
      .textAlign('center')
      .css({
        "background-color":"rgba(0, 0, 0, 0)",
        "align-items":"center",
        "display":"flex",
        "justify-content":"center",
        "background-image": 'url("images/tile_big3.png")'
      })
      .onHit('Player', function(evt, first) {
        if (!first) return;
        tile = this;
        e = evt[0].obj
        if (tile !== undefined) {
          if (tile.hasOwnProperty('_withPlayer')){
              this.delay(function() {
                try {
                  tile._withPlayer(e)
                } catch (asd) {
                  Crafty.log("Player"+ e.text()  + " " + tile._withPlayer + " " + tile.text())
                }
              }, 500);
            }
          }
      });
  },
});

Crafty.c('Player', {
  init: function() {
    this.requires('Actor, Color, Text')
      .attr({w: 64, h:64})
      .textFont({ size: '10px', weight: 'bold'})
      .textAlign('center')
      .css({
        display:"flex",
        "align-items":"center",
        "justify-content":"center",
        "border-radius": "30px",
        "border": "1px solid #73AD21",
      })
  },
  colorize: function(num) {
    if (num == 0) {
      this._colorCode = "cyan"
      this.color('cyan')
      .css({color:'blue'});
    } else if (num == 1) {
      this._colorCode = "red"
      this.color('red')
      .css({color:'white'});
    } else if (num == 2) {
      this._colorCode = "green"
      this.color('green')
      .css({color:'white'});
    } else if (num == 3) {
      this._colorCode = "yellow"
      this.color('yellow')
      .css({color:'blue'});
    }
    return this;
  },
  setOffset: function(x, y){
    this._offsetX = x;
    this._offsetY = y;
  },
  _currentPos : 0
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Crafty.c('Roll', {
  init: function() {
    this.requires('2D, DOM, Color, Mouse, Text')
    .color('red')
    .bind('Click', function(MouseEvent){
      player = findEntityByName('Player', 'Player' + playersTurn);
      if (player._ignore) {
        player._ignore = false;
      } else {
        res = getRandomInt(1, 6);
        console.log('Rolled ' + res + ' for Player' + playersTurn + ' moving from '+ player._currentPos + ' to ' + (player._currentPos + res))
        player._currentPos += res
        if (player._currentPos >= Crafty('Tile').get().length) {
           player._currentPos -= player._currentPos - Crafty('Tile').get().length + 2
         }
        player.color(player._colorCode, 1);
        target = Crafty('Tile').get(player._currentPos)
        player.x = target.x + player._offsetX * 64
        player.y = target.y + player._offsetY * 64
      }
      playersTurn += 1;
      if (playersTurn > 4) playersTurn = 1;
    })
    .attr({w: 128, h:96})
    .textFont({ size: '20px', weight: 'bold' })
    .textAlign('center')
    .css({
      "display":"flex",
      "align-items":"center",
      "justify-content":"center",
      "border-radius": "25px",
      // "padding": "20px",
      "border": "2px solid #73AD21",
    });
  }
});

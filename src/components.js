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
    this.requires('Actor, Color, Text')
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
      });
  },
});

Crafty.c('Player', {
  init: function() {
    this.requires('Actor, Color, Text, Draggable')
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
      .bind('StartDrag ', function(evt) {
        e = Crafty.findPointerEventTargetByComponent('Player', evt);
        e.color(e._colorCode, 0.5);
      })
      .bind('StopDrag', function(evt) {
        e = Crafty.findPointerEventTargetByComponent('Player', evt);
        e.x = Math.max(evt.clientX - evt.clientX % 64, 0);
        e.y = Math.max(evt.clientY - evt.clientY % 64, 0);
        tile = Crafty.findPointerEventTargetByComponent('Tile', evt);
        e.color(e._colorCode, 1);
        if (tile !== undefined) {
          if (tile.hasOwnProperty('_withPlayer')){
            tile._withPlayer(e);
          }
        } else {
          e.x = e._oldX;
          e.y = e._oldY;
        }

      });
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
  }
});
//                     Crafty.trigger("PostRender"); // Post-render cleanup opportunity crafty.js 4431
Crafty.c('Roll', {
  init: function() {
    this.requires('2D, DOM, Color, Mouse, Text')
    .color('red')
    .bind('Click', function(MouseEvent){
      alert('clicked', MouseEvent);
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
  },
});

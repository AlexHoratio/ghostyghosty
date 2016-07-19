Game.Tutorial = function(){};

Game.Tutorial.prototype = {
	create: function(game){

		// Make the map look worthwhile
		this.stage.backgroundColor = '#d3d3d3';
		map = this.add.tilemap('Tutorial', 25, 25);
		map.addTilesetImage('tileset');
		layer = map.createLayer(0);

		initPlayer(game);

		initControls(game);
	},

	update: function(game){

		updtMovementPlayer(game);
	}
}
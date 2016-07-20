Game.Tutorial = function(){};

var enemies = {};

Game.Tutorial.prototype = {
	create: function(game){

		// Make the map look worthwhile
		this.stage.backgroundColor = '#d3d3d3';
		map = this.add.tilemap('Tutorial', 25, 25);
		map.addTilesetImage('tileset');
		map.setCollisionBetween(0, 3);
		layer = map.createLayer(0);

		initPlayer(game, 150, 275);

		initEnemyRanged(game, "enemy1", 350, 275);
		console.log(name);
		addEnemyNodes(game, enemies["enemy1"]);

		initControls(game);
	},

	update: function(game){

		updtMovementPlayer(game);

		updtEnemyMovement(game, enemies["enemy1"]);
	}
}
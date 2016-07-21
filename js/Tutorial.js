Game.Tutorial = function(){};

Game.Tutorial.prototype = {
	create: function(game){

		// Activate physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 2000;

		// Make the map look worthwhile
		game.add.sprite(0, 0, 'tutorial_background');
		map = this.add.tilemap('Tutorial', 25, 25);
		map.addTilesetImage('tileset');
		map.setCollisionBetween(0, 3);
		layer = map.createLayer(0);
		layer.resizeWorld();

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
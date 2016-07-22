Game.Tutorial = function(){};

Game.Tutorial.prototype = {
	create: function(game){

		// Activate physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 1500;

		// Make the map look worthwhile
		game.add.sprite(0, 0, 'tutorial_background');
		map = this.add.tilemap('Tutorial', 32, 32);
		map.addTilesetImage('tileset');
		map.setCollisionBetween(0, 3);
		layer = map.createLayer(0);

		// General initialization
		this.initPlayerTutorial(game);

		//initEnemyRanged(game, "enemy1", 350, 275);
		//console.log(name);
		//addEnemyNodes(game, enemies["enemy1"]);

		initBullets(game);

		initControls(game);

		initUI(game);
	},

	update: function(game){

		if(player){
			updtMovementPlayer(game);
			for (var enemyKey in enemies){
				var enemy = enemies[enemyKey];
				updtEnemyMovement(game, enemy);
			}
		} else if (drainingplayer && ectoplasm >0 && jumpTimer < game.time.now){
			jumpTimer = game.time.now + 50
			ectoplasm -=1
			ectoplasm_text.text = ': ' + ectoplasm.toString() + '/15';
		} else if (protoplayer.visible && enter_underworld.visible){
			controls.right.onUp.add(function(){
				enter_underworld.destroy();
				portal = game.add.sprite(protoplayer.x + 80, protoplayer.y - 75, 'portal');
				portal_open = portal.animations.add('main', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, false);
				drainingplayer = true;
				portal_open.onComplete.add(function(){
					portal.animations.add('sustain', [9, 10, 11, 12], 5, true);
					portal.animations.play('sustain');
				})
				portal.animations.play('main');
			})
		}
	},

	initPlayerTutorial: function(game){
		protoplayer = game.add.sprite(374, 430, 'player');
		protoplayer.anchor.setTo(0.5);
		appearFromGrave = protoplayer.animations.add('appearFromGrave', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 0], 12, false);
		appearFromGrave.onComplete.add(function(){
			//protoplayer.destroy();
			//initPlayer(game, 374, 430)

			enter_underworld = game.add.text(protoplayer.x - 300, protoplayer.y - 40, ' Press D to enter\n the underworld!', {fontSize: '32px', fill: '#fff'});

		}, this);
		protoplayer.animations.play('appearFromGrave');
	}

}
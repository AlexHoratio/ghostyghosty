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
		sleeping_enemy = game.add.sprite(490, 320, 'sleeping_enemy');
		sleeping_enemy.animations.add('sleep', [0, 1, 2, 3, 4], 1, true);
		sleeping_enemy.animations.play('sleep');

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
		} else if (drainingplayer && ectoplasm > 0 && jumpTimer < game.time.now){
			jumpTimer = game.time.now + 50
			ectoplasm -=1
			ectoplasm_text.text = ': ' + ectoplasm.toString() + '/30';
			if(ectoplasm > 0 && ectoplasm < 30){
				ectoplasm_icon.frame = 1;
				ectoplasm_text.fill = '#f00';
			} else {
				ectoplasm_icon.frame = 0;
				ectoplasm_text.fill = '#fff';
			}
		} else if (protoplayer.visible && enter_underworld.visible && controls.right.isDown){
			enter_underworld.destroy();
			enter_underworld.visible = false;
			portal = game.add.sprite(protoplayer.x + 80, protoplayer.y - 75, 'portal');
			portal_open = portal.animations.add('main', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, false);
			drainingplayer = true;
			portal_open.onComplete.add(function(){
				portal.animations.add('sustain', [9, 10, 11, 12], 5, true);
				portal.animations.play('sustain');
				portal_sustain = game.add.audio('portal_sustain')
				portal_sustain.loop = true;
				portal_sustain.play();
				game.time.events.add(1000, function(){
					game.physics.arcade.moveToXY(protoplayer, 454, protoplayer.y, 50);
					protoplayer.animations.play('walkRight');
				})
			})
			portal.animations.play('main');
		} else if (protoplayer.x >= 450){
			protoplayer.body.velocity.x = 0;
			if (!already_surprised){
				game.add.audio('alerted').play();
				alerted_text = game.add.sprite(protoplayer.x - 62, protoplayer.y - 170, 'alert');
				protoplayer.animations.play('surprised');
				already_surprised = true;
				portal_sustain.stop();
				portal_close = portal.animations.add('close', [8, 7, 6, 5, 4, 3, 2, 1, 0], 9, false);
				portal_close.onComplete.add(function(){portal.destroy();})
				game.time.events.add(1000, function(){alerted_text.destroy();portal.animations.play('close');})
			}
		}
	},

	initPlayerTutorial: function(game){
		protoplayer = game.add.sprite(374, 430, 'player');
		protoplayer.anchor.setTo(0.5);
		protoplayer.physicsBodyType = Phaser.Physics.ARCADE;
		game.physics.arcade.enable(protoplayer);
		game.physics.enable(protoplayer, Phaser.Physics.ARCADE);
		protoplayer.body.allowGravity = false;
		protoplayer.animations.add('walkRight', [20, 21, 24, 25], 5, true);
		protoplayer.animations.add('surprised', [0, 23], 3, false);
		appearFromGrave = protoplayer.animations.add('appearFromGrave', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 0], 12, false);
		appearFromGrave.onComplete.add(function(){
			//protoplayer.destroy();
			//initPlayer(game, 374, 430)

			enter_underworld = game.add.text(protoplayer.x - 300, protoplayer.y - 80, 'Press D to open a\n    portal to the\n    underworld!', {font: 'start_font', fontSize: '32px', fill: '#fff'});

		}, this);
		game.add.audio('ghost_appear').play();
		protoplayer.animations.play('appearFromGrave');
	}

}
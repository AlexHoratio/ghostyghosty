//Initializing variables, hopefully globally
var map;
var player;
var game;
var playerSpeed = 150;
var rightPlayed = 0;
var leftPlayed = 0;
var enemies = {};
var jumpTimer = 0;
var ectoplasm = 15;
var gameStarted = false;
var drainingplayer = false;

//Auxiliary functions that are useful to call
function initControls(game){
	controls = {
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
	}	
	cursors = game.input.keyboard.createCursorKeys();
}

function initPlayer(game, x, y){
	player = game.add.sprite(x, y, 'player');
	player.anchor.setTo(0.5);
	player.animations.add('idle', [0, 1, 4, 5], 5, true);
	player.animations.add('turnRight', [8, 9, 12, 13, 16, 17], 18, false);
	player.animations.add('walkRight', [20, 21, 24, 25], 5, true);
	player.animations.add('turnLeft', [11, 10, 15, 14, 19, 18], 18, false);
	player.animations.add('walkLeft', [23, 22, 27, 26], 5, true);
	player.animations.add('startfall', [53, 54], 5, false);
	player.animations.add('fallling', [55], 5, true);
	player.animations.add('endfall', [56, 57], 5, false);
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.physicsBodyType = Phaser.Physics.ARCADE;
	player.body.setSize(45, 96, 20, 4);
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	player.startedfalling = false;
}

function initEnemyRanged(game, name, x, y){
	enemies[name] = game.add.sprite(x, y, 'enemy_ranged');
	enemies[name].enableBody = true;
	enemies[name].anchor.setTo(0.5);
	game.physics.arcade.enable(enemies[name]);
	enemies[name].body.collideWorldBounds = true;
	game.physics.enable(name, Phaser.Physics.ARCADE);
	enemies[name].physicsBodyType = Phaser.Physics.ARCADE;
	enemies[name].animations.add('walkRight', [1, 0, 2], 8, true);
	enemies[name].animations.add('walkLeft', [3, 5, 4], 8, true);
	enemies[name].animations.add('shootRight', [8, 7, 6, 9], 8, false);
	enemies[name].animations.add('shootLeft', [12, 13, 14, 17], 8, false);
	enemies[name].sight = new Phaser.Line(x, y, 0, 0);
	enemies[name].sightBlocked;
	enemies[name].body.setSize(23, 42, 30, 98);
	enemies[name].body.allowGravity = true;
	enemies[name].shootTime = 0;
}

function initBullets(game){
	enemyBullets = game.add.group();
	enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(50, 'bullet');
    enemyBullets.setAll('anchor.x',0.5);
    enemyBullets.setAll('anchor.y',0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
    enemyBullets.setAll('allowGravity', false);
}

function initUI(game){
	game.add.sprite(10, 0, 'ectoplasm_icon');
	ectoplasm_text = game.add.text(65, 10, ': ' + ectoplasm.toString() + '/15', {fontSize: '32px', fill: '#fff'});
}

function addEnemyNodes(game, enemy){
	enemy.nodes_x = [];
	enemy.nodes_y = [];
	for (i = 0; i < 4; i++){  //   ---------------Tweak these numbers if necessary-------------------
		node_x = game.rnd.integerInRange(enemy.body.x - 200, enemy.body.x + 200);
		node_y = game.rnd.integerInRange(enemy.body.y - 200, enemy.body.y + 200);
		enemy.nodes_x.push(node_x);
		enemy.nodes_y.push(node_y);
	}
	//Not necessary for the node generation, but helpful later on in the update function
	enemy.actionTimestamp = 0;
}

function updtMovementPlayer(game){


	if(Math.abs(player.body.velocity.x) >= playerSpeed){
        player.body.velocity.x = playerSpeed*(player.body.velocity.x/Math.abs(player.body.velocity.x));
    }

    //if(Math.abs(player.body.velocity.y) >= playerSpeed){
    //    player.body.velocity.y = playerSpeed*(player.body.velocity.y/Math.abs(player.body.velocity.y));
    //}

	if(!controls.right.isDown && !controls.left.isDown && !controls.up.isDown && !controls.down.isDown){
		player.animations.play('idle');
	}

	if(controls.right.isDown){
		player.body.velocity.x += playerSpeed;
		if(rightPlayed = 1){
			player.animations.play('walkRight');
		} else {
			player.animations.play('turnRight');
			rightPlayed = 1;
		}
	}
	game.input.onUp.add(function(){rightPlayed=0});

	if(controls.left.isDown){
		player.body.velocity.x -= playerSpeed;
		if(leftPlayed = 1){
			player.animations.play('walkLeft');
		} else {
			player.animations.play('turnLeft');
			leftPlayed = 1;
		}
	}
	game.input.onUp.add(function(){leftPlayed=0});

    game.physics.arcade.collide(player, layer);

	if(controls.up.isDown && player.body.blocked.down && jumpTimer < game.time.now){
		jumpTimer = game.time.now + 200;
		player.body.velocity.y -= 2500;
	}

	if(controls.down.isDown){
		player.body.velocity.y += playerSpeed;
	}

    player.body.velocity.x = 0.8*player.body.velocity.x;

    player.body.velocity.y = 0.8*player.body.velocity.y;

    // Falling animation
    if(player.body.velocity.y < 0 && !player.startedfalling){
    	player.animations.play('startfall')
    	player.startedfalling = true;
    } else if (player.body.velocity.y >= 0.1 && player.startedfalling){
    	player.animations.play('endfall');
    } else {
    	player.animations.play('falling');
    }


}

function updtEnemyMovement(game, enemy){
	if (enemy.actionTimestamp < game.time.now){
		enemy.actionTimestamp = game.time.now + 4000;

		switch(game.rnd.integerInRange(0, 4)){
			case 0:
				enemy.body.velocity.x = 0;
				enemy.body.velocity.y = 0;
				break;
			case 1:
				game.physics.arcade.moveToXY(enemy, enemy.nodes_x[0], enemy.y, 75);
				game.time.events.add(2500, function(){enemy.body.velocity.x = 0;enemy.body.velocity.y = 0;enemy.animations.stop(true)}, this);
				break;
			case 2:
				game.physics.arcade.moveToXY(enemy, enemy.nodes_x[1], enemy.y, 75);
				game.time.events.add(2500, function(){enemy.body.velocity.x = 0;enemy.body.velocity.y = 0;enemy.animations.stop(true)}, this);
				break;
			case 3:
				game.physics.arcade.moveToXY(enemy, enemy.nodes_x[2], enemy.y, 75);
				game.time.events.add(2500, function(){enemy.body.velocity.x = 0;enemy.body.velocity.y = 0;enemy.animations.stop(true)}, this);
				break;
			case 4:
				game.physics.arcade.moveToXY(enemy, enemy.nodes_x[3], enemy.y, 75);
				game.time.events.add(2500, function(){enemy.body.velocity.x = 0;enemy.body.velocity.y = 0;enemy.animations.stop(true)}, this);
				break;
		}
	
	} 

	if(enemy.body.velocity.x > 0){
		enemy.animations.play('walkRight');
		enemy.meat = 1;
	}

	if(enemy.body.velocity.x < 0){
		enemy.animations.play('walkLeft');
		enemy.meat = -1
	}

	// Player visible to enemy?
	enemy.sight.start.set(enemy.x, enemy.y);
	enemy.sight.end.set(player.x, player.y);
	tileHits = layer.getRayCastTiles(enemy.sight, 4, true, false); 
	if (tileHits.length > 0){
		enemy.sightBlocked = true;
	} else if (tileHits.length == 0) {
		enemy.sightBlocked = false;
	}

	if (Math.abs(game.physics.arcade.angleBetween(player, enemy)) < 0.8 && enemy.meat == -1 && !enemy.sightBlocked){
		enemyShootBullet(game, enemy);
		enemy.alerted = true;
		if (!enemy.meatTimer) {
			enemy.meatTimer = game.time.events.add(5000, function(){enemy.alerted = false;console.log("NO MORE MEAT");enemy.meatTimer = false;}, this);
		}
	}

	if (Math.abs(game.physics.arcade.angleBetween(player, enemy)) > Math.PI - 0.8 && enemy.meat == 1 && !enemy.sightBlocked){
		enemyShootBullet(game, enemy);
		enemy.alerted = true;
		if (!enemy.meatTimer) {
			enemy.meatTimer = game.time.events.add(5000, function(){enemy.alerted = false;console.log("NO MORE MEAT");enemy.meatTimer = false;}, this);
		}
	}

	// Enemy alerted?
	if (enemy.alerted && enemy.sightBlocked){
		if (!enemy.fleshTimer) {
			console.log("THE MEAT");
			enemy.fleshTimer = game.time.events.add(5000, function(){enemy.fleshTimer = false;}, this);
		}
	}
	game.physics.arcade.collide(layer, enemy);
}

function enemyShootBullet(game, enemy){
	if(game.time.now > enemy.shootTime){
		enemy.shootTime = game.time.now + 1000;
		var enemyBullet = enemyBullets.getFirstDead();
		enemyBullet.rotation = game.physics.arcade.angleBetween(enemy, player);
		enemyBullet.body.allowGravity = false;
		enemy.body.velocity.x = 0;
		enemy.body.velocity.y = 0;
		if(enemy.meat==1){
			enemy.animations.play('shootRight');
			enemyBullet.reset(enemy.x + 30, enemy.y - 25);
		} else if (enemy.meat==-1){
			enemy.animations.play('shootLeft');
			enemyBullet.reset(enemy.x - 30, enemy.y - 25);
		}
		game.physics.arcade.moveToObject(enemyBullet, player, 7500);
	}
}
//Initializing variables, hopefully globally
var map;
var player;
var game;
var playerSpeed = 200;
var rightPlayed = 0;
var leftPlayed = 0;

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

function initPlayer(game){
	player = game.add.sprite(150, 275, 'player');
	player.anchor.setTo(0.5);
	player.animations.add('idle', [0, 1, 4, 5], 5, true);
	player.animations.add('turnRight', [8, 9, 12, 13, 16, 17], 18, false);
	player.animations.add('walkRight', [20, 21, 24, 25], 5, true);
	player.animations.add('turnLeft', [11, 10, 15, 14, 19, 18], 18, false);
	player.animations.add('walkLeft', [23, 22, 27, 26], 5, true);
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.physicsBodyType = Phaser.Physics.ARCADE;
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
}

function updtMovementPlayer(game){

    player.body.velocity.x = 0.8*player.body.velocity.x;

    player.body.velocity.y = 0.8*player.body.velocity.y;

	if(Math.abs(player.body.velocity.x) >= playerSpeed*2){
        player.body.velocity.x = playerSpeed*2*(player.body.velocity.x/Math.abs(player.body.velocity.x));
    }

    if(Math.abs(player.body.velocity.y) >= playerSpeed*2){
        player.body.velocity.y = playerSpeed*2*(player.body.velocity.y/Math.abs(player.body.velocity.y));
    }

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

	if(controls.up.isDown){
		player.body.velocity.y -= playerSpeed;
	}

	if(controls.down.isDown){
		player.body.velocity.y += playerSpeed;
	}
}
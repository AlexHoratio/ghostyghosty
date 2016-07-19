//Initializing variables, hopefully globally
var map;
var player;
var game;


//Auxiliary functions that are useful to call
function initControls(game){
	controls = {
		right: game.input.keyboard.addKey(Phaser.Keyboard.A),
		left: game.input.keyboard.addKey(Phaser.Keyboard.D),
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
	}	
}

function initPlayer(game){
	player = game.add.sprite(150, 275, 'player');
	player.anchor.setTo(0.5);
	player.animations.add('idle', [0, 1, 2, 3], 60, true);
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.physicsBodyType = Phaser.Physics.ARCADE;
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
}

function updtMovementPlayer(game){
	if(!controls.right.isDown && !controls.left.isDown && !controls.up.isDown && !controls.down.isDown){
		player.animations.play('idle');
	}
}
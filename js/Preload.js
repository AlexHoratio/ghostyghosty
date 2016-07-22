Game.Preload = function(){
	this.preloadBar = null;
};

Game.Preload.prototype = {
	preload: function(){

		// Preload bar rendering
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY + 25, 'preloader');
		this.preloadBar.anchor.setTo(0.5);
		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);

		// Loading assets
		this.load.spritesheet('start_button', 'assets/spritesheets/start_button.png', 196, 91);
		this.load.spritesheet('player', 'assets/spritesheets/player.png', 84, 102, 53);
		this.load.spritesheet('enemy_ranged', 'assets/spritesheets/enemy_ranged.png', 104, 148, 18);
		this.load.tilemap('Tutorial', 'assets/maps/tutorial.csv');
		this.load.image('tileset', 'assets/maps/tileset.png');
		this.load.image('tutorial_background', 'assets/images/tutorial_background.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.image('ectoplasm_icon', 'assets/images/ectoplasm.png');

	}, 

	create: function(){
		this.game.state.start('MainMenu');
	}
};
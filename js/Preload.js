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
		this.load.spritesheet('start_button', 'assets/spritesheets/start_button.png', 256, 256);
		this.load.spritesheet('player', 'assets/spritesheets/player.png', 128, 128, 28);
		this.load.spritesheet('enemy_ranged', 'assets/spritesheets/enemy_ranged.png', 256, 256, 8);
		this.load.tilemap('Tutorial', 'assets/maps/tutorial.csv');
		this.load.image('tileset', 'assets/maps/tileset.png');

	}, 

	create: function(){
		this.game.state.start('MainMenu');
	}
};
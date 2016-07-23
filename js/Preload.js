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
		this.load.spritesheet('player', 'assets/spritesheets/player.png', 112, 104, 59);
		this.load.spritesheet('enemy_ranged', 'assets/spritesheets/enemy_ranged.png', 104, 148, 18);
		this.load.spritesheet('portal', 'assets/spritesheets/portal.png', 160, 160, 14);
		this.load.spritesheet('sleeping_enemy', 'assets/spritesheets/sleeping_enemy.png', 148, 148, 5);
		this.load.spritesheet('ectoplasm_icon', 'assets/spritesheets/ectoplasm.png', 64, 64, 2);
		this.load.bitmapFont('start_font', 'assets/spritesheets/start_font.png', 'assets/spritesheets/start_font.xml');
		this.load.tilemap('Tutorial', 'assets/maps/tutorial.csv');
		this.load.image('tileset', 'assets/maps/tileset.png');
		this.load.image('tutorial_background', 'assets/images/tutorial_background.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.image('alert', 'assets/images/alert.png');
		this.load.audio('alerted', 'assets/audio/alerted.ogg');
		this.load.audio('portal_sustain', 'assets/audio/portal_sustain.ogg');
		this.load.audio('gun1', 'assets/audio/gun1.ogg');
		this.load.audio('gun2', 'assets/audio/gun2.ogg');
		this.load.audio('ghost_appear', 'assets/audio/ghost_appear.ogg');

	}, 

	create: function(){
		this.game.state.start('MainMenu');
	}
};
var Game = {};

Game.Boot = function(){};

Game.Boot.prototype = {

	init: function(){
		this.stage.disableVisibilityChange = true;
	},

	preload: function(){
		this.load.image('preloader', 'assets/preload_bar.png');
	},

	create: function(){
		//this.state.start('Preload');
	}

};
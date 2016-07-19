Game.MainMenu = function(){};

Game.MainMenu.prototype = {
	create: function(){
		//Main menu buttons + text
		titleText = this.game.add.text(155, 75, "ghosty ghosty", {fontSize: '72px', fill:'#fff'});
		startButton = this.add.button(this.world.centerX - 128, 225, 'start_button', function(){
			this.game.state.start('Tutorial');
		},this,1,0,2);

	}
};
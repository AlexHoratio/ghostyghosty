Game.MainMenu = function(){};

Game.MainMenu.prototype = {
	create: function(){

		titleText = this.game.add.text(155, 75, "ghosty ghosty", {fontSize: '72px', fill:'#fff'});
		startButton = this.add.button(305, 225, 'start_button', function(){
			//this.game.state.start('Tutorial');
		},this,2,1,0);

	}
};
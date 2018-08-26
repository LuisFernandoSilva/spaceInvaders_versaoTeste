cc.Class({
    extends: cc.Component,

    properties: {

    },

   
    onLoad: function () {

        this.node.on('touchend', function(){
            cc.audioEngine.stopAll();
            cc.director.loadScene('Game');

        },this);
    },

});

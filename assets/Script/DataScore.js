/**
 * Classe responsavel por pegar o que estiver na variavel de no local storage, e setar o valor da 
 * scoreLabel com os valores guardados localmente.
 */

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Label,
    },

    onLoad () {
        let dataScore = cc.sys.localStorage.getItem('score');
        this.scoreLabel.string = dataScore.toString();
    },

});

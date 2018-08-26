
/**
 * Nesse script iremos juntar os metodos que se reptem em outros dos scripts de 
 * mesmo tipo, usaremos a herança para faze los herderam estes metodos deste
 * script, que ira ser modulado e depois requirido. Que para isso iremos guardaremos
 * a execuçao da class do cocos em uma variavel. Para depois podemos exporta la
 * com o uso do module.exports
 */
let Character  = cc.Class({
    extends: cc.Component,

    properties: {
        shotPreFab: cc.Prefab,
        _direction: cc.Vec2,
        
    },

    onLoad () {},
    /**
     * metodo que ira atirar, para isso instaciaremos um objeto tiro
     * o posicionamos saindo da nave inimiga e lhe damos uma direçao, 
     * indicamos seu pai na cena, e por fim a direçao que deve ir alvo
     */
    shoot: function(){
        //com isso instanciamos o objto tiro na variavel tiro
        let shot = cc.instantiate(this.shotPreFab);
        //para desenhar ele na tela temos que informar quem é o objeto pai deste 
        //como vamos disparar da nave o configuramos igual ao pai da nave.
        shot.parent = this.node.parent;
        //cria o tiro a partir da posiçao da nave
        shot.position = this.node.position;
        shot.group = this.node.group;
        /*o tiro tem o mesmo comportamento de direçao da nave em seu script
         por esse motivo podemos buscar seu componente para que o tiro que sai da nave
         siga a mesma direçao do mouse. 
         */
        let componentShot = shot.getComponent("Shot");
        componentShot.direction = this._direction;
    },
    /**
     * metodo criado para diferenciar o comportamento do jogador e do inimigo 
     * 
     */
    takeDamage: function(){

    },
    update (dt) {},

});
module.exports = Character;



cc.Class({
    extends: cc.Component,

    properties: {

        direction: cc.Vec2,
        speed: 200,
    },
    /**
     * o tiro nao varia de velocidade porem ele e mais rapido que a nave de onde ele veio,
     * por isso criamos uma variavel global aonde controlamos essa velocidade, como ele nao varia 
     * nao podemos normalizar o vetor, porem como sua direçao parte de uma das naves esta precisa ser normalizada
     */
    onLoad () {

        this.direction = this.direction.normalize();
              
    },
    /**
     * quando se ativa os eventos de colisao o cocos assiona esse metodo de colisao, que tem dois paramentros 
     * o objeto que sera colidido e uma referencia ao proprio objeto que ira colidir,ira executar 
     * o metodo tomar dano da classe personagem e nao simplesmente destroir
     */
    onCollisionEnter: function(target, me){
        //ira chamar o metodo da classe personagem
        let character = target.getComponent("Character");
        //para o caso dos tiros se chocarem verifica se a varivavel esta nula
        if(character != null){
            character.takeDamage(2);
        }else{
            target.node.destroy();
        }    
        me.node.destroy();
    },

    update (dt) {
        //criamos uma variavel local de deslocamento que ira ter o resultado da multplicaçao do vetor de direcao e a velocidade
        let displacement = this.direction.mul(this.speed *dt);
        //com esse deslocamento somamos a posiçao para a calcular a direçao do tiro
        this.node.position = this.node.position.add(displacement);
    },
});

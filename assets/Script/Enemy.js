let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {
        _target: cc.Node, //quem a nave ira perseguir
      
        speed: 50,
     
        timeAttack: 1, 

    },

    onLoad () {
        //para encontrar o objeto na cena para ser o alvo usamos o fin
        this._target = cc.find("player");
        //usamos o schedule para agendar um ataque
        this.schedule(this.shoot, this.timeAttack);

    },
    /**
     * diferente do jogador que usa o mouse para definir sua direçao no inimigo
     * isso e mais simples e so subtrair seu vetor direçao pelo do alvo, 
     */
    changeDirection: function(){
        let direction = this._target.position.sub(this.node.position);
        direction = direction.normalize();
        this._direction = direction;

        // usamos o atan2 para descobrir o angulo entre este dois vetores
        let angle = Math.atan2(direction.y, direction.x); 
        /*convertemos este valor do angulo em graus por que o atan2 retorna um valor em radianos,
         para isso multiplicamos o valor da divisao de 180 por pi
         porem no cocos os angulos sao inversos da matematica por isso temos que inverte los apenas modificado o sinal e colocando o "-"
         este resultado e atribuido a propriedade de rotacao do objeto na cena
         */
         this.node.rotation = -angle *(180/Math.PI);
    },

    /**
     * Metodo que sera diferente em cada uma das classes,
     * para contabilise os pontos iremos chamar o componete do jogador 
     * de adicionar o score e atriburemos uma valor por cada nave destroida
     * 
     */
    takeDamage: function(){
        let player = this._target.getComponent("Player");
        player.scorePoints(10);
        


        this.node.destroy();

      

    },

     update (dt) {
         /*agora utilizamos a funcao mudar direçao sendo executada junto 
         ao calculo de deslocamento e reposicionamento 
         */
        this.changeDirection();
        let dispachment = this._direction.mul(this.speed*dt);
        this.node.position = this.node.position.add(dispachment);
     },
});

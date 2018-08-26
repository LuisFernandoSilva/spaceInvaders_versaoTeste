

cc.Class({
    extends: cc.Component,

    properties: {

        enemyPrefab: cc.Prefab,
        area: 10,// area em torno do nodeGerador que ira ser criados os inimigos
        time: 2, //tempo em que os inimigos serao gerados
        wait: 3,
    },

     onLoad () {
         //o metodo da biblioteca chamado schedule agenda uma evento para acontecer num determindado tempo
         this.schedule(this.startGeneration, this.time);
     },
     /**
      * metodo que ira contralar o tempo de espera para começar
      * a gerar os inimigos na tela 
      */
     startGeneration: function(){
        this.schedule(this.generate, this.wait);
     },
     /**
      * da mesma forma que o tiro vamos instaciamos o objeto inimigo, 
      * definimos sua posiçao e seu pai
      */
     generate: function(){
        let enemy = cc.instantiate(this.enemyPrefab);
        enemy.parent = this.node.parent;
        //criamos o posicao do inimigo de forma aleatoria usando o randow com valores de 0 a 1
        let position = new cc.Vec2(Math.random -.5,Math.random -.5);
        //normalizamos esse vetor 
        position = position.normalize();
        //posterior multiplicamos pela area para que eles surgem em torno desta
        position = position.mul(this.area);
        //depois para saber a posiçao atual do inimigo somamos essa informaçoes
        position = this.node.position.add(position);
        //juntamos esses tres passos para a posicao do inimigo
        enemy.position = position;

     },


    // update (dt) {},
});

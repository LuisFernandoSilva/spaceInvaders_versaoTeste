
let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {

        _speeding: false,
        _lifeCurrent: 0,//varivel privada que controla a quantidade de vida que resta
        lifeMax: 100,
        speed: 200,
        lifeBar: cc.ProgressBar,
        score: 0,
        scoreLabel: cc.Label,
        _canvas: cc.Canvas,

    },
    //Metodo onload, inicializa uma unica vez todos os objetos da cena.
    onLoad () {
        //iniciamos a vida atual sendo igual ao maximo de vida
        this._lifeCurrent = this.lifeMax;
        //a  progrees bar trabalha com numeros fracionados do 1 ao 0 para indicar que ela esta ao maximo lhe começamos com o valor de 1
        this.lifeBar.progress = 1;
        //ativa o collider da nave, por ser ela que atira e destroi os inimigos, chama o director que controla todas as propriedades da cena
        cc.director.getCollisionManager().enabled = true;
        //aciona um evento toda a vez que uma tecla e pressionada, chamando um metodo e referenciando a ela mesma no final
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyIdle, this); 
        /* o evento de mouse não deve considerar o objeto em si mas o canvas que é toda a area visivel,
           por isso temos que associar o canvas ao evento de mouse , usando o metodo find da biblioteca 
           da cocos, aonde se passa o nome do objeto e ele busca na cena.
        */
        this._canvas = cc.find("Canvas");
        //evento do proprio node , não tendo uma captura de dirção do mouse usaremos um string como nome de evento a ser capturado
        this._canvas.on("mousemove", this.changeDirection, this);
        //como o evento de tiro e um clique do mouse no canvas vamos registra lo 
        this._canvas.on("mousedown", this.shoot, this);
        this._camera = cc.find("CameraControl");
        
         
    },
    //metodo que aciona por um evento, com os comandos de qual tecla e pressionada e sua ação.
    keyPressed: function(event){
        //se a tecla 'a' for pressionada , realiza o comando de movimento
        if(event.keyCode == cc.KEY.a){
            this._speeding = true;

        }

    },
    //metodo que aciona quando a tecla e solta
    keyIdle: function(event){
        //se a tecla 'a" for solta 
        if(event.keyCode == cc.KEY.a){
            
            this._speeding = false;

        }
    },
    /*
    *Para pegar a direção do mouse com a direção do player, vamor pegar o vetor de cada subtrair e 
    *depois somar com a posiçao atual do player assim teremos o vetor de direção.
.   *Para rotacionar a nave na direção do mouse precisamos descobri seu angulo arcotangente
    */
    changeDirection: function(event){

        //pega a posição do mouse e transforma em um vetor
        let positionMouse = event.getLocation();
        positionMouse = new cc.Vec2(positionMouse.x,positionMouse.y);
        
        //subtrai o vetor de mouse com a posiçao do player
        let direction = positionMouse.sub(this.node.position);
        /*por ser os vetores com valores variaveis os valores acabam variando muito acontecendo erros ao usar os valores de vetores 
          para a direçao, assim usamos a funcao normalize dividindo por ele mesmo em tamanhos menores e iguais.
        */ 
        direction = direction.normalize();
        //atribui o resultado da variavel direction para a variavel global.
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
     * Metodo que sera diferente em cada uma das classes
     * para atualizar a barra de vida que trabalha com numeros fracionado ou porcentagens
     * vamos dividir a vida atual pela maxima entao, entao dar esse valor para barra de vida
     */
    takeDamage: function(damage){
        this._lifeCurrent -= damage;
        let characterLife = this._lifeCurrent/this.lifeMax;
        this.lifeBar.progress = characterLife;
        //quando a vida acabar chama a cena de game over
        if(this._lifeCurrent < 0){
            cc.director.loadScene("GameOver");
        };
    },
    /**
     * Metodo que adiciona os pontos no score,
     *  mostrado na tela por um label na hud
     */
    scorePoints: function(score){
      this.score += score;
      this.scoreLabel.string = this.score;  
      //salva os valores do score no local storage , dando um nome a variavel e passando a variavel que dara valores para serem armazenados localmente
      cc.sys.localStorage.setItem('score', this.score);

    },
    update (dt) {
        //soma a posiçao atual com a direçao para obter o terceiro vetor de direcao
        if(this._speeding){
            //para sair da dependecia do frames por segundo, usamos uma variavel de tempo continua
            //para nos mover de forma mais livre sem depender dos frames
            let dispachment = this._direction.mul(this.speed * dt);
            this.node.position = this.node.position.add(dispachment);
        }

        
    },
});

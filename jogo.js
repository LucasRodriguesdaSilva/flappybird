console.log("Flappy Bird");

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Configurações iniciais]

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
    },
  };
  
  // [Chao]
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };

const flappyBird = {
    spritX: 0,
    spritY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    velocidade : 0,
    gravidade: 0.25,

    atualiza(){
      flappyBird.velocidade += flappyBird.gravidade;
      flappyBird.y += flappyBird.velocidade;
    },

    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spritX, flappyBird.spritY, // sprite x, sprite y
            flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
        )
    }
}

const mensagemGetReady = {
    spritX: 134,
    spritY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174/2,
    y: 50,
    
    desenha() {
      contexto.drawImage(
        sprites,
        mensagemGetReady.spritX, mensagemGetReady.spritY,
        mensagemGetReady.largura, mensagemGetReady.altura,
        mensagemGetReady.x, mensagemGetReady.y,
        mensagemGetReady.largura, mensagemGetReady.altura
      );
    }
}

// [Telas]
let telaAtiva = {}

const mudarParaTela = (novaTela) => {
  telaAtiva = novaTela;
}
const telas = {
  inicio: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudarParaTela(telas.jogo);
    },
    atualiza() {
      
    }
  },
  jogo: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
    },
    atualiza(){
      flappyBird.atualiza();
    }
  },
}


// JOGO 

const loop = () => {
  telaAtiva.desenha();
  telaAtiva.atualiza();
  requestAnimationFrame(loop);
}

window.addEventListener('click', ()=>{
  if(telaAtiva.click){
    telaAtiva.click();
  }
})
mudarParaTela(telas.inicio);
loop();
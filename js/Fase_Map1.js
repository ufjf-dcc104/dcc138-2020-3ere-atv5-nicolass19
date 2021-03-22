import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

export default class Fase_Map1 extends Cena{
    
    quandoColidir(a, b){
    

        if(a.tags.has("pc") && b.tags.has("enemy")){
            this.assets.play("boom");
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            }
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
            this.rodando = false;
            this.game.selecionaCena("fim")
        }
        if(a.tags.has("enemy") && b.tags.has("enemy")){
            this.assets.play("boom");
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            }
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
        }
        if(a.tags.has("pc") && b.tags.has("moeda")){
            this.assets.play("moeda");
            this.game.ponto+=1;
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
            
        }
        if(a.tags.has("pc") && b.tags.has("tp")){
            this.assets.play("tp");
            this.rodando = false;
            this.game.selecionaCena("fase2");
        }
    }
    preparar(){
        super.preparar();
        const mapa1 = new Mapa(10,14,32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x: 50, vx: 10});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function (dt) {
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.vx = -50;
            } else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.vx = +50;
            } else {
                this.vx = 0;
            }
            if(cena.input.comandos.get("MOVE_CIMA")){
                this.vy = -50;
            } else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.vy = +50;
            } else {
                this.vy = 0;
            }
        };
        this.adicionar(pc);
        

        function perseguePC(dt) {
            this.vx = 25*Math.sign(pc.x - this.x);
            this.vy = 25*Math.sign(pc.y - this.y);
        }
        

        const c = new Sprite({x: 400, y: 270, color: "black", tags:["tp"]});
        this.adicionar(c);
        const moeda = new Sprite({x: 100, y: 200, color: "yellow", tags:["moeda"]});
        this.adicionar(moeda);
        const moeda1 = new Sprite({x: 180, y: 200, color: "yellow", tags:["moeda"]});
        this.adicionar(moeda1);
        const moeda2 = new Sprite({x: 70, y: 500, color: "yellow", tags:["moeda"]});
        this.adicionar(moeda2);
        const moeda3 = new Sprite({x: 300, y: 240, color: "yellow", tags:["moeda"]});
        this.adicionar(moeda3);
        const en1 = new Sprite({x: 400, y: 200, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        this.adicionar(en1);
        const en2 = new Sprite({x: 200, y: 200, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        this.adicionar(en2);
        const en3 = new Sprite({x: 80, y: 170, vx: -10, color: "red", controlar: perseguePC, tags:["enemy"]});
        this.adicionar(en3);
    }
}
    

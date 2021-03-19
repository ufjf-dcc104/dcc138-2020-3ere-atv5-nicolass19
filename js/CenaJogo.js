import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import Sprite from "./Sprite.js";


export default class CenaJogo extends Cena {
  quandoColidir(a, b) {
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
    this.assets.play("boom");
  }

  preparar() {
    const mapa1 = new Mapa(10, 14, 32);
    mapa1.carregaMapa(modeloMapa1);
    this.configuraMapa(mapa1);

    const pc = new Sprite({ x: 50, y: 150 });
    pc.controlar = function (dt) {
      if (input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
      } else if (input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50;
      } else {
        this.vx = 0;
      }
      if (input.comandos.get("MOVE_CIMA")) {
        this.vy = -50;
      } else if (input.comandos.get("MOVE_BAIXO")) {
        this.vy = +50;
      } else {
        this.vy = 0;
      }
    };
    this.adicionar(pc);

    function perseguePC(dt) {
      this.vx = 25 * Math.sign(pc.x - this.x);
      this.vy = 25 * Math.sign(pc.y - this.y);
    }

    this.adicionar(
      new Sprite({ x: 115, y: 160, vy: 0, color: "red", controlar: perseguePC })
    );
    /*cena1.adicionarSpriteAleatorio(15);
cena1.recolocarSprite(4000);
*/
  }
}

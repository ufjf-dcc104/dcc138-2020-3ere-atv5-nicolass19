export default class AssetManager {
    constructor(){
        this.aCarregar = 0;
        this. aCarregadas = 0;
    }

    progresso(){
        if(this.aCarregar>0){
                return `${(this.aCarregadas/this.aCarregar*100).toFixed(2)}%`;
        }
        return "Nada a carregar";
    }
}
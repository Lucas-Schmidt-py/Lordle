class game_row extends HTMLElement{
    constructor(){
        super();
    }
}

class game_tile extends HTMLElement{
    constructor(){
        super();
    }
}

window.customElements.define('game-row', game_row);
window.customElements.define('game-tile', game_tile);

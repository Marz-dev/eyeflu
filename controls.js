class Controls{
    constructor(){
        this.jump = false;
        this.enter = false;
        this.#addKeyboardListeners();
    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case " " || "Space" || 32:
                    this.jump=true;
                break;
                case "x":
                    this.enter= true;
                break;
            }
        }

        document.onkeyup=(event)=>{
            switch(event.key){
                case " " || "Space" || 32:
                    this.jump=false;
                break;
                case "x":
                    this.enter= false;
                break;
            }
        }
    }
}
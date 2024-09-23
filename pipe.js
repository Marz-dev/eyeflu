class Pipes{
    constructor(){
        this.pipeHeight = canvas.height;
        this.pipeWidth = canvas.width/16;
        this.bottomPipeImg = new Image();
        this.bottomPipeImg.src = "bp.png";
        this.topPipeImg = new Image();
        this.topPipeImg.src =  "tp.png";
        this.pipeArray = [];       
    }
    addPipes(pipeX){
        let randomPipeY =- this.pipeHeight/4 - Math.random()*(this.pipeHeight/2);
        let openingSpace = canvas.height/4;
    
        let topPipe = {
            img : this.topPipeImg,
            x : pipeX,
            y : randomPipeY,
            width : this.pipeWidth,
            height : this.pipeHeight,
            passed : false,
            type: "top"
        }
        this.pipeArray.push(topPipe);
    
        let bottomPipe = {
            img : this.bottomPipeImg,
            x : pipeX,
            y : randomPipeY + this.pipeHeight + openingSpace,
            width : this.pipeWidth,
            height : this.pipeHeight,
            passed : false,
            type: "bottom"
        }

        
        this.pipeArray.push(bottomPipe);
        
    }

        update(ctx){
          
            for (let i = 0; i < this.pipeArray.length; i++) {
                let pipe = this.pipeArray[i];
                if(!gameOver && start){
                pipe.x -= eye[0].vx;
                }
                ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
               
            }
            let n = 0;
            while (this.pipeArray.length > 0 && this.pipeArray[0].x < -this.pipeWidth) {
                this.pipeArray.shift();
                n +=1;
                if(n == 2){
                    n==0;
                placePipes();
                }
            }
        
    }
   
}
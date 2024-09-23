class Eye {
    constructor(x, y, width, height){
        this.x =x;
        this.y= y;
        this.gravity = 0.25;
        this.vy = 0;
        this.vx = 3;
        this.img = new Image();
        this.img.src = "eye.png";
        this.width = width;
        this.height =height;
        this.dead = false;
        this.score = 0;
        this.brain = new NeuralNetwork([5, 6, 1]);
        this.controls = new Controls();
        this.offsets = 0;
    }
    update(){
        if(start){
            if(!gameOver){
                if(!this.dead){
                    for(let i = 0; i<pipe.pipeArray.length; i++){
                        let pipes = pipe.pipeArray[i];
                        let cx = Math.abs(Math.max(pipes.x, Math.min(pipes.x+pipes.width, this.x)) - this.x);
                        let cy = Math.abs(Math.max(pipes.y, Math.min(pipes.y+pipes.height, this.y)) - this.y);
                        let bottomCy =0;
                        let topcy = 0;
                      if(!pipes.passed && cx <= pipeXincrement){
                        if(pipes.type == "top"){
                         bottomCy = canvas.height/4 - this.height - cy;
                        }else{
                             topcy = canvas.height/4 - this.height - cy;
                           this.offsets = [cx, topcy, bottomCy, canvas.height - canvas.height/16 - this.y, this.vy];
                        }
                    }
                        if(detectCols(cx, cy, this.width/2)){
                            this.dead = true;
                            genD += 1;
                            return 0;
                        }
                      
                        if (!pipes.passed && this.x > pipes.x + pipes.width) {
                            this.score += 0.5;
                            pipes.passed = true;
                        }
                }
                const outputs=NeuralNetwork.forwardPropagate(this.offsets,this.brain);
             this.controls.jump = outputs[0];
            this.#move();
            if(this.score > highscore){
                highscore = this.score;
            }
        }else{
            this.x -= this.vx;
        }

            }else{
                    if((bestBrain != 0)){
                        if(eye.indexOf(this) == 0){
                            this.brain =  this.deepCopy(bestBrain);
                        }else{
                            if(this.score > 1 && this.score > highscore){
                                bestBrain =  this.deepCopy(this.brain);
                            }
                            this.brain = this.deepCopy(bestBrain);
                              NeuralNetwork.mutate(this.brain, 0.5);
                        }
                        }else{
                            if(this.score >= 1){
                                bestBrain =  this.deepCopy(this.brain);
                            }else{
                                NeuralNetwork.mutate(this.brain, 1.5);
                            }
                        }
                    this.x=30;
                    this.y=canvas.height/2 *Math.random() + 100;
                    this.vy = 0;
                    this.score = 0;
                    genD -= 1;
                    this.offsets = 0;
                    if(genD <= -1){
                        gameOver = false;
                        pipe.pipeArray.splice(0, pipe.pipeArray.length); 
                        restart = true;
                        gen +=1;
                        genD =0;
                        start = true;
                    }
                    this.dead = false;
            }
        }else{
            if(this.controls.enter){
                start = true;
                gameOver = false;
            }
        }
    }
 deepCopy(obj) {
        if (typeof obj !== 'object' || obj === null) {
            //For Null
            return obj;
        }
    
        //newObj Vals
        const newObj = Array.isArray(obj) ? [] : {};
    
        // Copying Each Property Recursively
        for (let key in obj) {
            newObj[key] = this.deepCopy(obj[key]);
        }
    
        return newObj;
    }
    
    #move(){
        if(this.controls.jump){
            this.vy = - 5;
            this.controls.jump = false;
        }
        if(this.y + this.height >= canvas.height-canvas.height/16){
            this.y = canvas.height- canvas.height/16 -this.height/2;
            this.dead = true;
            genD += 1;
        }else{
            if(this.y > this.height/2){
                this.vy += this.x + this.vx >= canvas.width/2? 0 : this.gravity;
                this.y += this.vy;  
            }
        }
    }
    draw(ctx){
    if(!start){
        if(!phone){
        ctx.font="18px sans-serif";
        ctx.fillText("Press X to Play", canvas.width/10, canvas.height/2);
        }else{
            ctx.font="18px sans-serif";
            ctx.fillText("Click to play..", canvas.width/10, canvas.height/2);
        }
    }
    ctx.font="20px sans-serif";
    ctx.fillText("Gen: " + gen, canvas.width-100, 45);
    ctx.font="30px sans-serif";
    ctx.fillText("HS: " + highscore, 5, 45);
    // If Dead, u rn --> :O
    if(gameOver){
        ctx.font="40px sans-serif bold";
        ctx.fillText("You Died", canvas.width/4, canvas.height/6);
    }
        ctx.save();
        
      
        ctx.drawImage(this.img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.fill();
        ctx.restore();
        for(var i = 0; i <= buffer ; i++){
            ctx.drawImage(parallax.platform, i*buffer - parallax.px, canvas.height - canvas.height/16, buffer, canvas.height/16);
       }
    }
}
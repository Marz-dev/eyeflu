class Parallax{
    constructor(){
        this.platform = new Image();
        this.platform.src = "platform.png";
        this.cloud = new Image();
        this.cloud.src = "cloud.png";
        this.mbg2 = new Image();
        this.mbg2.src = "mbg2.png";
        this.mbg1 = new Image();
        this.mbg1.src = "mbg1.png";
        this.bg = new Image();
        this.bg.src = "bg1.png";
        this.px = 0;
        this.cx = 0;
        this.mb1X = 0;
        this.mb2X = 0;
        this.bgX = 0;
    }
    update(){
        if(start){
            if(!gameOver){
                this.px += buffer/24;
                this.px = this.px >= buffer ? 0 : this.px;
                this.cx += .5;
                this.cx = this.cx >= cluffer ? 0 : this.cx;
                this.mb1X += .25;
                this.mb1X = this.mb1X >= cluffer ? 0 : this.mb1X;
                this.mb2X += .8;
                this.mb2X = this.mb2X >= cluffer ? 0 : this.mb2X;
                this.bgX += .1;
                this.bgX = this.bgX >= cluffer ? 0 : this.bgX;
            }
        }
    }
    draw(ctx){
        for(var i = 0; i<=1; i++){
            ctx.drawImage(this.bg, i*cluffer - this.bgX, 0, cluffer, canvas.height);
        }
        for(var i = 0; i<=1; i++){
            ctx.drawImage(this.mbg1, i*cluffer - this.mb1X, 0, cluffer, canvas.height);
        }
        for(var i = 0; i<=1; i++){
            ctx.drawImage(this.cloud, i*cluffer - this.cx, 0, cluffer, canvas.height - canvas.height/15);
        }
        for(var i = 0; i<=1; i++){
            ctx.drawImage(this.mbg2, i*cluffer - this.mb2X, 0, cluffer, canvas.height);
        }
    }
}
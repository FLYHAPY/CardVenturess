class Window {
    constructor (x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.opened = false;
        this.buttonList = [];
        this.createButton('X',x+width-35,y+5,()=> { this.close()});
    }

    createButton(name, x,y, action, widthCenter) {
        let button = createButton(name);
        this.buttonList.push(button);
        button.parent('game');
        if (widthCenter) {
            button.size(widthCenter);
            button.position(x-widthCenter/2,y);    
        } else button.position(x,y);
        button.mousePressed(action);
        button.addClass('game');
        button.hide();
    }

    open() {
        this.opened = true;
        for(let button of this.buttonList) {
            button.show();
        }
    }

    close() {
        this.opened = false;
        for(let button of this.buttonList) {
            button.hide();
        }
    }

    draw() {
        if (this.opened) {
            fill(100,200,100);
            stroke(0,0,0);
            rect (this.x,this.y,this.width,this.height,5,5,5,5);
        }
    }


}
import { DataStore } from "./DataStore.js";

//各种图片的父类

export class Sprite{
    constructor(img=null,srcX=0,srcY=0,srcW=0,srcH=0,x=0,y=0,width=0,height=0){
        //获取变量池
        const dataStory=DataStore.getInstance();
        this.ctx=dataStory.ctx;
        this.img=img;//图片
        this.srcX=srcX;//图片的起始x位置
        this.srcY=srcY;//图片的起始y位置
        this.srcW=srcW;//图片的宽
        this.srcH=srcH;//图片的高
        this.x=x;//在画布上x的坐标
        this.y=y;//有的坐标
        this.width=width;//画的宽
        this.height=height;//画的高
    }

    //画图
    draw(img=this.img,srcX=this.srcX,srcY=this.srcY,srcW=this.srcW,srcH=this.srcH,x=this.x,y=this.y,width=this.width,height=this.height){
        this.ctx.drawImage(img,srcX,srcY,srcW,srcH,x,y,width,height);
    }
    
    //获取指定图片
    static getImage(key){
        return DataStore.getInstance().res.get(key);
    }
}
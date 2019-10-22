import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

//'小鸟类

export class Birds extends Sprite{
    constructor() {
        const img=Sprite.getImage('birds');
        super(img,0,0,img.width,img.height,0,0,img.width,img.height);
        //设置三只小鸟的尺寸位置
        //小鸟宽是34,高24,上下边距是10,左右边距9
        this.clippingX=[9,61,9+34+18+34+18];//裁剪的x左标
        this.clippingY=[10,10,10];//裁剪的y左标
        this.clippingWidth=[34,34,34];//裁剪的宽度
        this.clippingHerght=[24,24,24];//裁剪的高度
        const canvas=DataStore.getInstance().canvas;
        const birdX=canvas.width/4;//小鸟的初始x坐标
        this.birdsX=[birdX,birdX,birdX];
        const land=Sprite.getImage('land');
        const birdY=(canvas.height-land.height)/2;//小鸟初始y坐标
        this.birdsY=[birdY,birdY,birdY];
        this.birdsWidth=[34,34,34];//小鸟的宽度
        this.birdsHeight=[24,24,24];//小鸟的高度
        this.y=[birdY,birdY,birdY];//小鸟的实时y坐标
        this.index=0;//切换小鸟实现动态效果
        this.count=0;//计数器
        this.time=0;//计时器,自由落体时间

    }
    draw(){
        //小鸟的状态切换(翅膀方向切换)
       this.count+=0.2;
       if(this.index>=2){
           this.count=0;
       }
       this.index=Math.floor(this.count);

       //小鸟自由落体运动
       const g=0.48;//模拟重力加速度
       //小鸟向上的位移量
       const Y=20;
       //小鸟下落的距离
       const offsetY=(g*this.time*(this.time-Y))/2;
       for(let i=0;i<3;i++){
        this.birdsY[i]=this.y[i]+offsetY;
       }
       this.time++;


        super.draw(this.img,this.clippingX[this.index],this.clippingY[this.index],
            this.clippingWidth[this.index],this.clippingHerght[this.index],
            this.birdsX[this.index],this.birdsY[this.index],this.birdsWidth[this.index],this.birdsHeight[this.index]);
    }
}
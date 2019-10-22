//'程序的主类,用于小程序过程中的初始化,以及点击事件的绑定

import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Land } from "./js/runtime/Land.js";
import { Director } from "./js/Director.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";
// import { UpPipe } from "./js/runtime/UpPipe.js";


export class Main{
    constructor(){
        console.log('游戏开始');
        //初始化画布
        this.canvas=document.getElementById('game');
        // this.canvas=wx.createCanvas();
        this.ctx=this.canvas.getContext('2d');
        //初始化资源加载器
        this.loader=new ResourceLoader();
        //初始化变量池
        this.datastore=DataStore.getInstance();

        //初始化导演
        this.director=Director.getInstance();

        //加载完成后,执行其他的操作
        this.loader.onloaded(map=>this.onResourceLoaded(map));

    }
    //资源加载完成后执行其他操作的方法
    onResourceLoaded(map){
        // console.log(map);
        // 模拟画背景图
        // let bg=map.get('background');//拿背景图
        // this.ctx.drawImage(bg,0,0,bg.width,bg.height,0,0,this.canvas.width,this.canvas.height);
        //保存各种资源
        //不使用set方法保存的原因,set方法保存的数据在用细结束时,会被销毁,而下面的数据即使用细结束也不会销毁,下一局继续使用
        this.datastore.canvas=this.canvas;
        this.datastore.ctx=this.ctx;
        this.datastore.res=map;

        this.init();

     
    }
    //游戏初始化,初始化游戏中的数据,将其保存到变量池中
    init(){
        //将游戏初始化改为false
        this.director.isGameOver=false;
        //模拟画背景图
        // new Background().draw();
        // new Land().draw();
        this.datastore.set('background',new Background())
                                    .set('land',new Land())
                                    .set('pipes',[])
                                    .set('birds',new Birds())
                                    .set('startButton',new StartButton())
                                    .set('score',new Score())

        //调用单击事件的方法
        this.gameEvent();
        
        //先创建一组水管
        this.director.createPipes();
        //开始运行
        this.director.run();

    }

    //绑定单击事件
    gameEvent(){
        this.canvas.addEventListener('touchstart',e=>{
            if(this.director.isGameOver){
                //游戏结束,点击重新开始
                this.init();

            }else{
                //游戏未结束,点击触发小鸟向上飞行
                this.director.birdsUp();
            }
        })
    }
}
//'程序的主类,用于小程序过程中的初始化,以及点击事件的绑定

import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";


export class Main{
    constructor(){
        console.log('游戏开始');
        //初始化画布
        this.canvas=document.getElementById('game');
        this.ctx=this.canvas.getContext('2d');
        //初始化资源加载器
        this.loader=new ResourceLoader();
        //初始化变量池
        this.datastore=DataStore.getInstance();

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
    //游戏初始化
    init(){

    }
}
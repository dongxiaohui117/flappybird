import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

//导演类,控制游戏的主流程,逻辑

export class Director{
    constructor(){
        //获取变量池
        this.datastore=DataStore.getInstance();
    }
    //导演只能有一个
    static getInstance(){
        if(!Director.instance){
            Director.instance=new Director();
        }
        return Director.instance;
    }

    //创建水管
    createPipes(){
        const minTop=this.datastore.canvas.height/8;//最小值
        const maxTop=this.datastore.canvas.height/2;//最大值
        const top=Math.random()*(maxTop-minTop)+minTop;//top值
        this.datastore.get('pipes').push(new UpPipe(top));
        this.datastore.get('pipes').push(new DownPipe(top));

    }
    //运行
    run(){
        //画背景图
        this.datastore.get('background').draw();
       
        //获取水管数组
        const pipes=this.datastore.get('pipes');
        // this.createPipes();//调用创建水管的方法
        //创建水管之前先判断
        //有没有出界,出界了就从数组中删除
        if(pipes[0].x<-pipes[0].width && pipes.length==4){
            pipes.shift();
            pipes.shift();
        }
        //创建水管:前面一组水管有没有越过屏幕中央,如果越过,开始创建下一个水管
        const CanvasWidth=this.datastore.canvas.width;
        if(pipes[0].x<(CanvasWidth/2-pipes[0].width)/2 && pipes.length==2){
            this.createPipes();
        }

        //遍历数组,画水管
        pipes.forEach(pipe=>{
            pipe.draw();
        });
        //获取小鸟,并画出来
        this.datastore.get('birds').draw();
        //画地板图
        this.datastore.get('land').draw();
        
        //循环运行
        requestAnimationFrame(()=>this.run());
    }
}

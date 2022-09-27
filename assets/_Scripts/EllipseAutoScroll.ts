import { _decorator, Component, Node, Vec3, tween } from 'cc';
import { Nodecri } from './Nodecri';
const { ccclass, property } = _decorator;

@ccclass('EllipseAutoScroll')
export class EllipseAutoScroll extends Component {
    
    @property([Nodecri])
    nodes : Nodecri[] = [];
    @property
    time = 5
    @property
    timeOffset = 5
    @property
     dstartAngle = 0;
     @property
     dendAngle = 2;
     @property
     radius = 2
 
     @property
     rotate1 = 0;
     @property
     rotate2 = 2;
    start () {
        this.init();
    }

    init () {

        for (var i = 0; i < this.nodes.length; i++) {
            var child = this.nodes[i];

             this.dendAngle = 2*Math.PI;  // 结束的角度
            let center = new Vec3();   // 转动的时候的中心点位置
            this. rotate2 = 2*Math.PI;
            tween(child).repeatForever(
                tween( this.rotate1 as any).by( this.time + (0.2 *i), ( this.rotate2 as any), {
                    'onUpdate' : (t, r=0) => {
                        var a = ( this.dendAngle -  this.dstartAngle) * (r) +  this.dstartAngle
                        this. dstartAngle = r *  this.rotate1;
            
                        var x = center.x +  this.radius * Math.sin(a);
                        var z = center.y +  this.radius * Math.cos(a);
                        (t as Node).setPosition(x, 0, z);
                    }
                }).start()
            ).start();
        }
    }
}
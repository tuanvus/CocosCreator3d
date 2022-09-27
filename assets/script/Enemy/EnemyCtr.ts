import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyCtr')
export class EnemyCtr extends Component {
    @property({ type: Node })
    target: Node = new Node
    @property()
    tweenDuration: number = 1
    @property
    dir: Vec3 = new Vec3
    @property
    d: Vec3 = new Vec3

    start() {

    }
    update(delta: number) {

        console.log( Vec3.distance(this.node.position, this.target.position))

        if (Vec3.distance(this.node.position, this.target.position) > 2) {
            this.d = new Vec3((this.target.position.x - this.node.position.x), 0,
                (this.target.position.z - this.node.position.z))
            this.d.y = 0
            this.dir = new Vec3((this.d.x + this.node.position.x), 0, (this.d.z + this.node.position.z))
            this.dir.lerp(this.d, this.tweenDuration * delta)
            // this.node.setPosition(this.d)
            this.node.setPosition(new Vec3(this.node.position.x + this.dir.x, 2,
                this.node.position.z + this.dir.z));
        }
   
    }



}


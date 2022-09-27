import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {

    @property({ type: Node })
    target: Node = new Node
    @property
    zOffset = 0
    start() {

    }

    update(deltaTime: number) {

        let vec = new Vec3(this.target?.position.x, this.node.position.y, this.target?.position.z + 17)
        this.node.setPosition(vec)
    }
}


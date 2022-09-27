import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Nodecri')
export class Nodecri extends Component {
    @property 
    speed = 2;
}


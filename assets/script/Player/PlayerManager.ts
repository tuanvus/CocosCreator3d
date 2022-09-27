import { _decorator, Component, Node } from 'cc';
import { PlayerColider } from './PlayerColider';
import { PlayerMovement } from './PlayerMovement';
import { XP_Ctr } from './XP_Ctr';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    @property({type : PlayerMovement})
    playerMovement : PlayerManager | null = null


    start()
    {
        
    }

    update(deltaTime: number) {
        
    }
}


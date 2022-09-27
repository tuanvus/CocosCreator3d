import {
  _decorator,
  Component,
  Node,
  Collider,
  CapsuleCollider,
  ITriggerEvent,
} from "cc"
import { XP_Drop } from '../XP_Drop'
import { XP_Ctr } from './XP_Ctr'
const { ccclass, property } = _decorator

@ccclass('PlayerColider')
export class PlayerColider extends Component {
  @property({ type: CapsuleCollider })
  collider: CapsuleCollider | null = null
  @property({ type: XP_Ctr })
  xp_Ctr: XP_Ctr | null = null

  public int(XP_ctr: XP_Ctr): void {
    this.xp_Ctr = XP_ctr
  }

    start() {
    this.collider?.on('onTriggerEnter', this.onTriggerEnter, this)
  }
    private onTriggerEnter(event: ITriggerEvent) {
    if (event.otherCollider.node.getComponent(XP_Drop) != null) {
      event.otherCollider.node.active = false
      console.log("xp "+this.xp_Ctr?.valueXp)
      console.log("xp value "+event.otherCollider.node.getComponent(XP_Drop)?.valueXP)
     let valueExp = event.otherCollider.node.getComponent(XP_Drop)?.valueXP
     this.xp_Ctr?.ChangeValue(valueExp)

    }
  }
  update(deltaTime: number) {}
}

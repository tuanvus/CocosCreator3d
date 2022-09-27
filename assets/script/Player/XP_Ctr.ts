import { _decorator, Component, Node, ProgressBar, RichText } from 'cc'
const { ccclass, property } = _decorator

@ccclass('XP_Ctr')
export class XP_Ctr extends Component {
  @property
  level = 1
  @property
  valueXp = 0
  @property
  valueXPLv = 100
  @property({ type: ProgressBar })
  progressbar: ProgressBar | null = null
  @property({ type: RichText })
  richText: RichText | null = null

  start() {
    this.richText.string =
      '<color=#00ff00>Level</color><color=#00ff00>' + this.level + '</color>'
  }
  public ChangeValue(xp = 0) {
    if (this.valueXp + xp >= this.valueXPLv) {
      this.valueXp = this.valueXp + xp - this.valueXPLv
      this.valueXPLv *= 2
      this.level++
    } else {
      this.valueXp += xp
    }
    this.richText.string =
      '<color=#00ff00>Level</color><color=#0fffff>' + this.level + '</color>'
    this.progressbar.progress = this.valueXp / this.valueXPLv
    console.log(' log =' + this.valueXp / this.valueXPLv)
  }
}

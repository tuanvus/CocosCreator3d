import { _decorator, Component, Node, Enum, tween } from 'cc';
const { ccclass, property } = _decorator;

enum SizeDrop {
     small = 30,
     medium = 50,
     big = 70
} 

enum TypeDrop
{
    XP,
    HP
}
Enum(TypeDrop)
Enum(SizeDrop)


@ccclass('XP_Drop')
export class XP_Drop extends Component {

    @property({type :  TypeDrop})
    typeDrop  : TypeDrop | null = TypeDrop.XP
    @property
    valueXP =50;
    @property({type :  SizeDrop})
    size  : SizeDrop | null = SizeDrop.small


    start() {
    }

  
}


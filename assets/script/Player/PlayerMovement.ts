import { _decorator, Component, Node, systemEvent, SystemEventType, Touch, Vec2, Vec3, loader, Sprite, math, Animation } from "cc";
const { ccclass, property } = _decorator;

// ζδ½εεΎ
const TOUCH_RADIUS = 400;
const ROLE_MOVE_FRAME = 0.2;
const _tempPos = new Vec3();
const _tempDelta = new Vec2();
const Horizontal = new Vec2(1, 0);
const MOVE_DELTA = 0.2;




@ccclass("PlayerCtr")
export class PlayerMovement extends Component {
    @property(Node)
    ctrlSprite: Node = null!;
    @property(Node)
    role: Node = null!;
    @property(Vec3)
    originPos = new Vec3();

    private _isTouch = false;
    private _touchPos = new Vec2();
    private _startPos = new Vec2();
    private _movePos = new Vec2();
    private _animComp: Animation = null!;
    private _animState = 'idle';

    start () {
        this.ctrlSprite.setPosition(this.originPos);
        _tempPos.set(0, 90, 0);
        this.role.eulerAngles = _tempPos;
        this._animComp = this.role.getComponentInChildren(Animation)!;
        systemEvent.on(SystemEventType.TOUCH_START, this.touchStart, this);
        systemEvent.on(SystemEventType.TOUCH_MOVE, this.touchMove, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.touchEnd, this);
    }

    onDestroy() {
        systemEvent.off(SystemEventType.TOUCH_START, this.touchStart, this);
        systemEvent.off(SystemEventType.TOUCH_MOVE, this.touchMove, this);
        systemEvent.off(SystemEventType.TOUCH_END, this.touchEnd, this);
    }

    touchStart(touch: Touch){
        this.changeState('running');
        touch.getUILocation(this._startPos);
        const distance = this._startPos.length();
        if (distance < TOUCH_RADIUS) {
            this._touchPos.set(this._startPos);
            this._movePos.set(this._startPos);
            _tempPos.set(this.ctrlSprite.position);
            this.ctrlSprite.setWorldPosition(this._startPos.x, this._startPos.y, _tempPos.z);
            this._isTouch = true;
        }
    }

    touchMove(touch: Touch){
        if(!this._isTouch){
            return;
        }

        touch.getUILocation(this._movePos);
        Vec2.subtract(_tempDelta, this._movePos, this._touchPos);
        // θ?‘η?θ§θ²ηζ΄δ½ζθ½¬εΌ
        const deltaRadian = _tempDelta.angle(Horizontal);
        const angle = deltaRadian * 180 / Math.PI;
        const rot = this.role.eulerAngles;
        _tempPos.set(rot.x, 90 + (Math.sign(_tempDelta.y)) * angle, rot.z);
        this.role.eulerAngles = _tempPos;

        // ιζ°θ§εη§»ε¨ζΉεεΌ
        _tempDelta.multiply2f(MOVE_DELTA, MOVE_DELTA);
        Vec2.add(this._movePos, this._startPos, _tempDelta);
        const distance = this._movePos.length();

        // ζ―ε¦θΆεΊιεΆεεΎ
        if(distance > TOUCH_RADIUS){
            const radian = this._movePos.angle(Horizontal);
            const x = Math.cos(radian) * TOUCH_RADIUS;
            const y = Math.sin(radian) * TOUCH_RADIUS;
            this._movePos.set(x, y);
        }

        this.ctrlSprite.setWorldPosition(this._movePos.x, this._movePos.y, 0);
        this._touchPos.set(this._movePos);
    }

    touchEnd(touch: Touch){
        this._isTouch = false;
        this.changeState('Idle');
        this.ctrlSprite.setPosition(this.originPos);
    }

    changeState(name: string){
        if(this._animState === name){
            return;
        }

        this._animComp.play(name);
        this._animState = name;
    }

    update(){
        if(!this._isTouch){
            return;
        }

        _tempPos.set(0, 0, ROLE_MOVE_FRAME);
        this.role.translate(_tempPos);
    }
}
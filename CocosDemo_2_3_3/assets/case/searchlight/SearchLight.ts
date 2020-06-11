const {ccclass, property} = cc._decorator;

@ccclass
export default class SearchLight extends cc.Component {

    @property({
        type: cc.Sprite
    })
    public sp: cc.Sprite = null;

    // 材质对象
    private _materi: cc.MaterialVariant;

    public start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        // 计算窗口或界面的宽高比，该例子是屏幕的宽高比
        let ratio = cc.winSize.width / cc.winSize.height;
        // 获取材质并初始化纹理的各个属性
        this._materi = this.sp.getMaterial(0);
        // 屏幕宽高比，用于纠正坐标
        this._materi.effect.setProperty("wh_ratio", ratio);  
        // 光源半径
        this._materi.effect.setProperty("light_radius", 0.2);   
        // 光源中心点，默认设置到屏幕外
        this._materi.effect.setProperty("light_center", cc.v2(2.0, 2.0)); 
        // 环境光强度，就是光源没照到的地方亮度。
        this._materi.effect.setProperty("ambient_strength", 0.1);  
        // 光源强度，这里设置为最大1。
        this._materi.effect.setProperty("light_strength", 0.8); 
        // 光源颜色，这里设置为白光
        this._materi.effect.setProperty("light_color", new cc.Vec4(1, 0, 0, 1)); 
    }

    public touchBegin(event: cc.Event) {
        let touch: cc.Touch = event.touch;
        let center = this.getLightCenter(touch.getLocation());
        this._materi.effect.setProperty("light_center", center);
    }

    public touchMove(event: cc.Event) {
        let touch: cc.Touch = event.touch;
        let center = this.getLightCenter(touch.getLocation());
        this._materi.effect.setProperty("light_center", center);
    }

    public touchEnd(event: cc.Event) {
        this._materi.effect.setProperty("light_center", cc.v2(2.0, 2.0));
    }

    /** 根据touch坐标计算光源中心点 */
    public getLightCenter(pos: cc.Vec2): cc.Vec2 {
        let x = pos.x / (cc.winSize.width / 2) - 1;
        let y = pos.y / (cc.winSize.height / 2) - 1;
        return cc.v2(x, y);
    }
}
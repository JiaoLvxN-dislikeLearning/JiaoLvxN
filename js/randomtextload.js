const quotes = [
    "点击输入文本",
    "Never gonna give you up",
    "我已经67分钟没有听到大只切的故事了",
    "数学书总是很忧郁，因为它有太多的问题。",
    "冰箱在吵架中赢了，因为它擅长冷场。",
    "鱼不敢上网，因为怕被渔网捕获。",
    "铅笔的腿很短，因为橡皮总是擦掉它的脚印。",
    "苹果手机摔在地上没碎，因为地上贴了膜。",
    "鸡蛋被石头砸中后，石头哭了，因为蛋碎了它的心。",
    "可乐打不过牛奶，因为可乐没气。",
    "扫帚走路歪歪扭扭，因为它有扫地综合征。",
    "面包烤糊了之后，它说自己‘焦透了’。",
    "书比手机重，但手机更会装。",
    "蜘蛛总是上网，因为它要查聊天记录。",
    "番茄和西红柿只是名字不同而已。",
    "电风扇感冒了还继续转，因为它怕被吹走。",
    "皮鞋总在哭，因为天天被踩还不敢出声。",
    "灯泡坏了之后，黑暗最高兴，因为它终于有机会上场。",
    "时钟总是很忙，因为它有很多时间要打发。",
    "香蕉先道歉，因为它的皮比较软。",
    "电脑饿的时候会吃芯片饼干。",
    "雨伞总是不开心，因为它的生活总是被颠来倒去。",
    "闹钟响了也不起床，因为它只负责叫醒别人。"
];

function RandomText(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (el._listenerAdded) return;
    let lastIndex = -1;
    const soundUrl = '/assets/sound/remold.mp3';
    el.addEventListener('click', function() {
        const audio = new Audio(soundUrl);
        audio.volume = 0.01;
        audio.play().catch(() => {});
        if (quotes.length === 1) {
            this.textContent = quotes[0];
            return;
        }
        let idx;
        do {
            idx = Math.floor(Math.random() * quotes.length);
        } while (idx === lastIndex);
        this.textContent = quotes[idx];
        lastIndex = idx;
    });

    el._listenerAdded = true;
}
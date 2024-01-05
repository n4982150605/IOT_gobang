// delay
var interval = 1500; // delay between each identical ajax request; unit: ms

// 棋盤
var flagArr = [];
var size = 36;

// 默認黑色先手
var currentFlag = true;

// time
var timeId = null;
var time = 10 * 60;// 10 min


// 保存落子前的樣子映射
var flagCurMap = [];
// 黑子
flagCurMap[true] = "black_flag_cur";
// 白子
flagCurMap[false] = "white_flag_cur";


// 保存落子後的樣式映射
var flagMap = [];
// 黑子
flagMap[true] = "black_flag";
// 白子
flagMap[false] = "white_flag";

// 保存結果映射關係
var resultMap = [];
resultMap[true] = "黑子勝利！";
resultMap[false] = "白子勝利！";

var textMap= [];
textMap[true] = "棋手：黑子";
textMap[false] = "棋手：白子";

// 初始化棋盤
var container = document.getElementById("container");

for (var i = 0; i < 15; i++) {
        var arr = [];
        for (var j = 0; j < 15; j++) {
            var div = document.createElement("div");
            div.className = "none";
            div.style.top = (i * size) + "px";
            div.style.left = (j * size) + "px";
            container.appendChild(div);
            arr.push(div);
        }
        flagArr.push(arr);
    }


// 連線至IOTTALK
var profile = {
    'dm_name': 'Gobang',
    'df_list': ['sendPiece', 'recPiece', 'sendConfirm', 'recConfirm'],
}

csmRegister(profile, (msg) => {
    console.log(JSON.stringify(msg));
    document.title = msg.d_name;
    alert(msg.d_name);

    var da_parity = parseInt(msg.d_name);
    
    if (da_parity % 2 == 0) {
        // 偶數為白子，後手
        currentFlag = false;
        var cflag = document.getElementById("flag");
        cflag.innerHTML = textMap[currentFlag];
        // 先等對手落子
        wait();
    } else {
        // 奇數為黑子，先手
        currentFlag = true;
        var cflag = document.getElementById("flag");
        cflag.innerHTML = textMap[currentFlag];
        // 先落子
        alert("你先落子");
        container.addEventListener("click",place_piece);
    }
});

// 倒數計時
var ctime = document.getElementById("time");
var countdown = time;
timeId = setInterval(function() {
    if (countdown == 0) {
        gameOver();
        alert("時間到，比賽結束！");
        return;
    }
    countdown --;
    ctime.innerHTML = ("剩餘時間："+countdown + " 秒");
},1000);

// 設置滑鼠樣式
var mouse = document.createElement("div");
mouse.id = "mouse";

container.addEventListener("mouseenter",mouseenter);
container.addEventListener("mouseleave",mouseleave);

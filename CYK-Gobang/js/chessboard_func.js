// 落子
function place_piece(){
    
    if (event.target.className != "none") {
        alert("此處不行落子！");
        return;
    }
    
    //取消聽指令
    container.removeEventListener("click",place_piece,false);
    
    event.target.className = flagMap[currentFlag];

    // 當前落子座標
    var x = Math.floor(event.target.offsetLeft / size);
    var y = Math.floor(event.target.offsetTop / size);
    
    // 送出落子座標
    send_piece(x, y);
    
    // 判斷是否勝利
    if (checkSuccess(x, y)) {
        gameOver();
        alert(resultMap[currentFlag]);
        return;
    }
    
}

// push落子座標
function send_piece(x, y) {
    //alert("send");
    csmPush('sendPiece', {
        row: x,
        col: y,
    });
    
     csmPull('recConfirm', (data) => {
        if (data) {
            // handle outdated data
            if (data.row != x || data.col != y) {
                setTimeout(send_piece.bind(null, x, y), interval);
                return;
            }
            else {
                wait();
                return;
            }
        } else {
            setTimeout(send_piece.bind(null, x, y), interval);
            return;
        }
    });
}

// 等待對手落子座標回傳
function wait() {
    //alert("waiting");
    csmPull('recPiece', (data) => {
        if (data) {
            // handle outdated data
            var xx = data.row;
            var yy = data.col;
            
            if (flagArr[yy][xx].className != "none") {
                setTimeout(wait, interval);
                return;
            }
            //alert("receive");
            
            // 對手落子
            flagArr[yy][xx].className = flagMap[!currentFlag];
        
            // 判斷是否勝利
            if (checkSuccess(xx, yy)) {
                gameOver();
                alert(resultMap[!currentFlag]);
                return;
            }
            
            var z=0;
            pushdata(xx, yy, z);
            
            // 切換至落子
            alert("換你落子");
            container.addEventListener("click",place_piece);
            return;
        } else {
            setTimeout(wait, interval);
        }
    });
}

//
function pushdata(xx, yy, turn){
    //alert(turn);
    turn++;
    if(turn>=3){
        return;
    }
    else {
        //alert("repush");
        csmPush('sendConfirm', {
            row: xx,
            col: yy,
        });
        setTimeout(pushdata.bind(null, xx, yy, turn), interval);
    }
}

// 判斷是否勝利
function checkSuccess(x, y){
    var result = false;
    // 當前落子的樣式/顏色
    var className = flagArr[y][x].className;
    

    // 橫向判斷
    var count = 0;
    for (var i = 0; i < 15; i++) {
        if (className == flagArr[y][i].className) {
            count++;
            if (count >= 5) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    // 縱向判斷
    for (var j = 0; j < 15; j++) {
        if (className == flagArr[j][x].className) {
            count++;
            if (count >= 5) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    // 左上到右下判斷
    var a = y - x;
    var index = 0;
    if (a > 0) {
        for (a; a < 15; a++) {
            if (className == flagArr[a][index++].className) {
                count++;
                if (count >= 5) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    } else {
        a = Math.abs(a);
        for (a; a < 15; a++) {
            if (className == flagArr[index++][a].className) {
                count++;
                if (count >= 5) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    // 右上到左下判斷
    var b = 14 - y - x;
    var index2 = 14;
    if (b > 0) {
        b = 14 - b;
        index2 = 0;
        for (b; b >= 0; b--) {
            if (className == flagArr[index2++][b].className) {
                count++;
                if (count >= 5) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    } else {
        b = Math.abs(b);
        for (b; b < 15; b++) {
            if (className == flagArr[index2--][b].className) {
                count++;
                if (count >= 5) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    if (count >= 5) {
        result = true;
    }

    return result;
}

// 棋局結束
function gameOver(){
    document.getElementById("mouse").style.display = "none";
    document.body.onmousemove = null;
    container.removeEventListener("click",place_piece,false);
    container.removeEventListener("mouseenter",mouseenter);
    container.removeEventListener("mouseleave",mouseleave);
    clearInterval(timeId);
}

// 滑鼠進入棋盤後，設置滑鼠樣式
function mouseenter(){
    mouse.style.width = mouse.style.height = 36 + "px";
    document.body.appendChild(mouse);
    document.body.onmousemove = function(event) {
        mouse.className = flagCurMap[currentFlag];
        var x = event.clientX - 16;
        var y = event.clientY - 16;
        mouse.style.top = y + "px";
        mouse.style.left = x + "px";
    }
}

// 滑鼠離開棋盤後
function mouseleave(){
    document.body.onmousemove = null;
}

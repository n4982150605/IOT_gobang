# IOT_gobang
a gobang game using IOT

陳煜凱

摘要：我製作出 IoT 和 Gobang(五子棋) 的好玩遊戲。由於IOTTALK有延遲，並不適合需要低延遲的遊戲，所以我找了Gobang這種不需要低延遲的遊戲來製作。因為是雙方輪流落子，且落子前通常要思考，所以利用IOTTALK進行資料傳輸的延遲不會有甚麼感覺。兩位玩家透過 IOTTALK 與對方連線並進行五子棋的遊戲。輪流落子後，先連成直線或斜線5個的獲勝。只要執行程式並透過IOTTALK連線即可進行遊戲，不須其他額外動作。當一方落子後，會先傳送落子座標後再判斷勝利，傳送落子座標會一直持續到收到對方的確認訊息後才結束，並進入等待對方傳送落子座標的環節，這環節會一直pull直到接收到正確座標。確認接收的座標是有效的後，會回傳給對方確認信息，之後再進到自己的落子環節。雙方輪流落子直到一方勝利為止。


程式碼說明：點擊index.html執行遊戲，開好單雙後連接好IOT即可進行遊戲。

demo連結：https://youtu.be/3Gti43hhoDc

1. 開好兩個遊戲(要單雙)<br>
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%871.jpg)
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%872.jpg)

2. 到IOTTalk上註冊需要的model<br>
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%873.jpg)

3. 在IOTTalk上連線將兩個遊戲連線<br>
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%874.jpg)

4. 預設由黑子先手<br>

5. 雙方輪流push跟wait<br>
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%875.jpg)
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%876.jpg)

6. 雙方輪流落子直至其中一方勝利<br>
![image](https://github.com/n4982150605/IOT_gobang/blob/main/image/%E5%9C%96%E7%89%877.jpg)


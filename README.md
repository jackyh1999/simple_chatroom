# 說明文件

### 設計目標

1. UI上允許多個user使用
2. 文字聊天室必備的text area和send button
3. 按下send之後要考慮的問題
   (A) message event要包含的資訊 : event type, user info, text
   (B) 要以何種方式傳遞訊息 : JSON格式的string
   \(C\) 如何和後端溝通 : Websocket
4. 考慮未來可能的擴充並保持程式的彈性
   (A) login page功能擴充
   (B) user info增加
   \(C\) 各個UI的改動

### 檔案目錄

/main.go : 後端主程式(測試用,port:5000)

/go.mod : 需要的module

/go.sum : 存module的checksum

/template/html/reg.html : 聊天室前導頁面，像是讓user輸入暱稱等

/template/html/index.html : 聊天室主頁面

/template/assets/ : 存放相關的.js檔、.css檔

### 測試環境

- Chrome 99.0.4844.74
- Go 1.18

### 功能展示

![](https://i.imgur.com/9NtH1Ev.png)

![](https://i.imgur.com/1g6CFVJ.png)

![](https://i.imgur.com/vkCqwwV.png)

![](https://i.imgur.com/AxPfAmo.png)

### 參考資料

https://ithelp.ithome.com.tw/users/20120647/ironman/3110
https://bootsnipp.com/snippets/dldxB

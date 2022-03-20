// message alignment
const LEFT = "left";
const RIGHT = "right";

// message type
const EVENT_MESSAGE = "message";
const EVENT_JOIN = "join";
const EVENT_LEAVE = "leave";

// user info
// random icon and guest id
const ICONS = [
    "https://img.icons8.com/dusk/64/000000/flying-duck--v2.png",
	"https://img.icons8.com/dusk/64/000000/unicorn--v1.png",
	"https://img.icons8.com/dusk/64/000000/butterfly.png",
	"https://img.icons8.com/dusk/64/000000/cat--v1.png",
	"https://img.icons8.com/dusk/64/000000/crab--v1.png"
]
var user_icon = ICONS[getRandomNum(0, ICONS.length)];
var user_name = "Guest " + Math.floor(Math.random() * 10000);

// create socket
var url = "ws://" + window.location.host + "/ws?id=" + user_name;
var ws = new WebSocket(url);

// html dom elements
var chatroom = document.getElementsByClassName("msger-chat");
var text = document.getElementById("msg");
var send = document.getElementById("send");

send.onclick = function (e) {
    handleMessageEvent()
}

text.onkeydown = function (e) {
	// Enter in textarea
    if (e.keyCode === 13 && text.value !== "") {
        handleMessageEvent()
    }
};

ws.onopen = function (e) {
	console.log("open connection")
}

ws.onclose = function (e) {
    console.log("close connection")
}

// 將json格式字串傳到server端
function handleMessageEvent() {
    ws.send(JSON.stringify(
	{	"name" : user_name, 
		"photo": user_icon,
        "event": "message",
        "content": text.value
    }));
    text.value = "";
}

// 收到server端的訊息，根據event type進行不同的處理
ws.onmessage = function (e) {
    var m = JSON.parse(e.data)
    var msg = ""
    switch (m.event) {
        case EVENT_MESSAGE:
            if (m.name == user_name) {
                msg = getMessage(m.name, m.photo, RIGHT, m.content);
            } else {
                msg = getMessage(m.name, m.photo, LEFT, m.content);
            }
            break;
        case EVENT_JOIN:
            if (m.name != user_name) {
                msg = getEventMessage(m.name + " " + m.content)
            } else {
                msg = getEventMessage("您已" + m.content)
            }
            break;
		case EVENT_LEAVE:
			if (m.name != user_name) {
                msg = getEventMessage(m.name + " " + m.content)
            } else {
                msg = getEventMessage("您已" + m.content)
            }
            break;
    }
    insertMsg(msg, chatroom[0]);
};

// 加入/離開聊天室的訊息
function getEventMessage(msg) {
    var msg = `<div class="msg-left">${msg}</div>`
    return msg
}

// 對話訊息
// Simple solution for small apps
function getMessage(name, img, side, text) {
    const d = new Date()
    var msg = `
    <div class="msg ${side}-msg">
		<div class="msg-img" style="background-image: url(${img})"></div>
		<div class="msg-bubble">
			<div class="msg-info">
				<div class="msg-info-name">${name}</div>
				<div class="msg-info-time">${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}</div>
			</div>
			<div class="msg-text">${text}</div>
		</div>
    </div>
  `
    return msg;
}

// 將訊息插入DOM object(chat area)裡的最後一個子元素後面
function insertMsg(msg, domObj) {
    domObj.insertAdjacentHTML("beforeend", msg);
    domObj.scrollTop += 500;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
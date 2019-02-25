//var socket = new WebSocket("ws://192.168.1.112:8080/SaitongImServer/init");
var socket = new WebSocket("ws://127.0.0.1:8899/ws");

$(function () {
	listen();
})

function emit() {
	var text = encodeScript($("#msg").val());
	text = replace_em(text);

	var msg = {
		"text": text
	};
	msg = JSON.stringify(msg);

	socket.send(msg);

	$("#content").append("<kbd style='color: #" + "CECECE" + "; font-size: " + 12 + ";'>" + text + "</kbd><br/>");
	$("#msg").val("");
}

//查看结果
function replace_em(str) {
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g, '<img src="arclist/$1.gif" border="0" />');
	return str;
};

function listen() {

	socket.onopen = function () {
		$("#content").append("<kbd>连接成功!</kbd></br>");
	};
	socket.onmessage = function (evt) {
		$("#content").append(evt.data + "</br>");
	};
	socket.onclose = function (evt) {
		$("#content").append("<kbd>" + "Close!" + "</kbd></br>");
	}
	socket.onerror = function (evt) {
		$("#content").append("<kbd>" + "ERROR!" + "</kbd></br>");
	}
}

document.onkeydown = function (event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 13) { // enter 键
		emit();
	}
};
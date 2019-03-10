var socket = new WebSocket("ws://127.0.0.1:8899/ws");

$(function () {
	listen();
})

function emit() {
	var text = encodeScript($("#msg").val());
	text = replace_em(text);
	socket.send(text);

	$("#content").append("<kbd style='color: #" + "CECECE" + "; font-size: " + 12 + ";'>" + text + "</kbd><br/>");
	$("#msg").val("");
}

//替换为HTML上的标签
function replace_em(str) {
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g, '<img src="arclist/$1.gif" border="0" />');
	return str;
};

function listen() {

	socket.onopen = function () {
		$("#content").append("<kbd>连接成功! 时间(s):"+ parseInt(new Date().getTime()/1000) +"</kbd></br>");
		heartCheck();
	};
	socket.onmessage = function (evt) {
		$("#content").append(evt.data + "</br>");
	};
	socket.onclose = function (evt) {
		$("#content").append("<kbd>" + "连接关闭! 时间(s):" + parseInt(new Date().getTime()/1000) + "</kbd></br>");
	}
	socket.onerror = function (evt) {
		$("#content").append("<kbd>" + "ERROR!" + "</kbd></br>");
	}
}

//心跳包
function heartCheck(){
	setInterval(function () { 
		if(socket){
			var msg = {
				"type": 0
			};
			msg = JSON.stringify(msg);
			socket.send(msg);
			console.info("发送心跳",msg+" 时间(s):"+ parseInt(new Date().getTime()/1000));
		}
		
	}, 40000);
}


document.onkeydown = function (event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 13) { // enter 键
		emit();
	}
};
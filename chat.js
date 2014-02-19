var input = document.getElementById("send");
var message = document.getElementById("message");
var listitems = document.getElementById("chatitems");

if (window.WebSocket) {
		var ws = new WebSocket('ws://10.73.11.33:3000');
}

input.addEventListener('click',onsend);

function onsend() {
	var d = new Date;
	var timeEpoch = d.getTime();
	var date  = d.toUTCString(timeEpoch);
	var dateArray = date.split(" ");
	var time = dateArray[4];

	console.log(time);
	var msgObj = {
		"name": "Borja & Kike",
		"message": message.value,
		"time": time
	};

	ws.send(JSON.stringify(msgObj));

}

ws.onmessage = function(e) {
	var message = JSON.parse(e.data).message;
	var author = JSON.parse(e.data).name;
	var time = JSON.parse(e.data).time;

	var listli = document.createElement("li");
	var listlitime = document.createElement("span");
	var listlimsg = document.createElement("span");

	if (author === "Borja & Kike") {
		listli.setAttribute("class", "fromin");	
		listlimsg.setAttribute("class", "text");
		listlitime.setAttribute("class", "time");
	}
	else {
		listli.setAttribute("class", "fromout");
		listlimsg.setAttribute("class", "text");
		listlitime.setAttribute("class", "time");

	}
	listlitime.textContent = "[" + time + "]";
	listlimsg.textContent = message;
	listli.textContent = author + ": ";
	listli.appendChild(listlimsg);
	listitems.appendChild(listli);



	// textarea.value = textarea.value + '\n' + author + ': ' + message;
	 // alert('Mensaje recibido' + e.data);
}


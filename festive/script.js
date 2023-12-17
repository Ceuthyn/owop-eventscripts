OWOP.options.eventoggle = localStorage.getItem("evtoggle");
OWOP.options.snowen = localStorage.getItem("evtoggleadit");

OWOP.util.toggleevent = ()=>{ //literally just the thing for the button
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")==0 || localStorage.getItem("evtoggle")==undefined? 1 : 0;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	OWOP.chat.local(OWOP.options.eventoggle ? "enabled festivities! may have an impact on performance" : "disabled festivities.");
	if(OWOP.options.eventoggle){
		//enable bullshit
		OWOP.util.enablevnt();
	} else {
		//disable and have ""fun"" cleaning stuff up
		OWOP.util.disablevnt();
	} 
}

OWOP.util.loadvnttrig = ()=>{
	if(OWOP.options.eventoggle == 1 && OWOP.util.enabled != 1){
		OWOP.util.enablevnt();
	}
}

OWOP.util.enablevnt = ()=>{
	OWOP.util.enabled = 1; //because of reconnecting, we need this to not have everything freeze and remain
	OWOP.windowSys.addWindow( new OWOP.windowSys.class.window("adv",{closeable: true},(t)=>{
                t.container.innerHTML += `<style>
                        .dayb {
                                color: #000000;
                                transition: 0.5s;
                                margin-top: 0;
                                margin-bottom: 0;
                        }

                        .dayb:hover {
                                color: #ff0000;
				background-color: #880000;
                        }
			.disday {
				color: #333333;
				background-color: #888888;
			}
                </style>`
                let div = document.createElement('div');
                div.style.display = "grid";
                div.style["grid-template-columns"] = "50% 50%";
                t.container.appendChild(div);
		let day = new Date().getDate()-11;
		let month = new Date().getMonth();
                for(let i = 1; i<=12; i++){
                        div.innerHTML += `<button class="${month != 11 ? "dayb" : day >= i ? "dayb" : "disday"}" ${month != 11 ? "" : day >= i ? "" : "disabled"} style="width: 100%" onclick="OWOP.util.advclick(${i})">${i}</button>`;
                }
        }).move(0,window.innerHeight/2))
	if(OWOP.options.snowen) OWOP.util.enablesnow();
	OWOP.chat.local(`<button type="button" id="vntbutton" onclick="OWOP.util.togglesnow()">toggle snow</button>`);
}

OWOP.util.disablevnt = ()=>{
	OWOP.util.enabled = 0;
	OWOP.util.disablesnow();
}

OWOP.util.enablesnow = ()=>{
	OWOP.options.snowurl = "https://ceuthyn.github.io/owop-eventscripts/festive/img/snow.png";
	OWOP.elements.snow = [];
	OWOP.options.winddir = 0;
	OWOP.util.snow = snow;
	OWOP.util.snowint = setInterval(()=>{
		for(let i = 0; i<OWOP.elements.snow.length; i++){
			if(OWOP.elements.snow[i].update()){
				OWOP.elements.snow.splice(i,1);
				i--;
			}
		}
		if(OWOP.elements.snow.length < 200){
			OWOP.elements.snow.push(
				new OWOP.util.snow((Math.random()*(window.innerWidth + 200))-100, 0.5 + Math.random()*1.5, OWOP.options.winddir * 4, 3 + Math.random()*4, 360*Math.random())
			)
		}
		OWOP.options.winddir = Math.max(Math.min(OWOP.options.winddir + (Math.random()-0.5)/10,1),-1);

	},50)
}

OWOP.util.disablesnow = ()=>{
	clearInterval(OWOP.util.snowint);
	for(let i = 0; i<OWOP.elements.snow.length; i++){
		OWOP.elements.snow[i].deleteself();
	}
	delete OWOP.elements.snow;
}

OWOP.util.togglesnow = ()=>{
	OWOP.options.snowen = localStorage.getItem("evtoggleadit") == 0 || localStorage.getItem("evtoggleadit")==undefined? 1 : 0;
	localStorage.setItem("evtoggleadit", OWOP.options.snowen);
	if(OWOP.options.snowen){
		OWOP.util.enablesnow();
	} else {
		OWOP.util.disablesnow();
	}
}

OWOP.util.advclick = async (day)=>{
	day = day|0;
	if(day < 0 || day > 12){
		console.log("bad day");
		return;
	}
	let scr = await (await fetch(`https://ceuthyn.github.io/owop-eventscripts/festive/d/${day}.js`)).text();
	try{eval(scr)}catch(e){console.error(e)};
};

class snow{
	constructor(x, speed, direction, size, rotation){
		this.y = -15; //:3 i have no idea what im doing
		this.x = x;
		this.speed = speed;
		this.direction = direction;
		this.size = size;
		this.rotation = rotation;
		this.id = "sn"+Date.now();
		this.html = `<img src="${OWOP.options.snowurl}" class="snow" id="${this.id}" style="left: -50px; opacity: 0.8; rotate: ${this.rotation}deg;">`;
		this.css = `<style id="snowshit">
			.snow{
				pointer-events: none;
				width: ${this.size}%;
				position: absolute;
				z-index: 10;
				image-rendering: pixelated;
			}
		</style>`
		document.body.insertAdjacentHTML('beforeEnd', this.html);
		if(document.getElementById("snowshit") == null){
			document.body.insertAdjacentHTML('beforeEnd', this.css);
		}
		this.ele = document.getElementById(`${this.id}`);
		this.r = [];
		for(let i = 0; i<256; i++){
			this.r.push(Math.random());
		}
	}

	noise(x){ //behold, stolen code i have no idea where i got
		let scaledX = x;
		let xFloor = Math.floor(scaledX);
		let t = scaledX - xFloor;
		let tRemapSmoothstep = t * t * (3-2*t);
		let xMin = xFloor & 0xFF;
		let xMax = (xMin + 1) & 0xFF;
		let y = this.lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);
		return (y-0.5) * 0.75;
	}

	lerp(a,b,t){return t*(b-a)+a};

	update(){ 
		this.y += window.innerHeight*0.01*this.speed;
		this.x += (this.direction + (this.noise(this.y/window.innerHeight*10)*20))*this.speed;
		this.ele.style.left = this.x+"px";
		this.ele.style.top = this.y+"px";
		if(this.y > window.innerHeight + 10){
			this.deleteself();
			return true;
		}
	}

	deleteself(){
		this.ele.remove();
	}
}

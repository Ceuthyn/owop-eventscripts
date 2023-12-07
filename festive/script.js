OWOP.options.eventoggle = localStorage.getItem("evtoggle");

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
	OWOP.elements.snow = [];
	OWOP.util.winddir = 0;
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
				new OWOP.util.snow((Math.random()*(window.innerWidth + 200))-100, 0.5 + (Math.random()*1.5), OWOP.util.winddir, 4.5 + Math.random()*2, 360*Math.random())
			)
		}
		OWOP.util.winddir = Math.min(Math.max(OWOP.util.winddir + (Math.random()-0.5)/10,0.5),-0.5);

	},50)
}

OWOP.util.disablevnt = ()=>{
	OWOP.util.enabled = 0;
	for(let i = 0; i<OWOP.elements.snow.length; i++){
		OWOP.elements.snow[i].deleteself();
	}
	delete OWOP.elements.snow;
}

class snow{
	constructor(x, speed, direction, size, rotation){
		this.y = 0; //:3 i have no idea what im doing
		this.x = x;
		this.speed = speed;
		this.direction = direction;
		this.size = size;
		this.rotation = rotation;
		this.id = "sn"+Date.now();
		this.html = `<img src="https://ceuthyn.github.io/owop-eventscripts/festive/img/snow.png" class="snow" id="${this.id}" style="left: -50px; opacity: 0.8; rotate: ${this.rotation}deg;">`;
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

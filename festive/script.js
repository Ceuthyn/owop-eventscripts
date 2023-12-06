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
	if(OWOP.options.eventoggle == 1){
		OWOP.util.enablevnt();
	}
}

OWOP.util.enablevnt = ()=>{
	OWOP.elements.snow = [];
	OWOP.util.snow = snow;
}

OWOP.util.disablevnt = ()=>{
	for(let i = 0; i<OWOP.elements.snow.length; i++){
		OWOP.elements.snow[i].deleteself();
	}
	delete OWOP.elements.snow;
}

class snow{
	constructor(x, speed, direction){
		this.y = 0; //:3 i have no idea what im doing
		this.x = x;
		this.speed = speed;
		this.direction = direction;
		this.id = "sn"+Date.now();
		this.html = `<img src="https://ceuthyn.github.io/owop-eventscripts/festive/img/snow.png" class="snow" id="${this.id}" style="left: -50px; opacity: 0.8">`;
		this.css = `<style id="snowshit">
			.snow{
				pointer-events: none;
				width: 5%;
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
		let scaledX = x*0.05;
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
		this.y += window.innerHeight*0.01;
		console.log(this.noise(this.y/window.innerHeight*10)
		this.x += this.direction + (this.noise(this.y/window.innerHeight*10));
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

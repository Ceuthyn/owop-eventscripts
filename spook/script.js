OWOP.options.eventoggle = localStorage.getItem("evtoggle");
OWOP.util.toggleevent = () =>{
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")==0 || localStorage.getItem("evtoggle")==undefined? 1 : 0;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	OWOP.chat.local(`${OWOP.options.eventoggle ? "enabled spooky mode! enjoy :3 (no promises about quality)" : "disabled spooky mode. enjoy normalcy"}`);
	if(OWOP.options.eventoggle){
		//do stuff on enable
		OWOP.util.enablevnt()
	}else{
		//do stuff on disable
		OWOP.util.disablevnt();
	}
}
OWOP.options.loadedvnt = 0;
OWOP.util.loadvnttrig = ()=>{
	if(OWOP.options.eventoggle == 1){
		console.log("thanks to leg3nd for ghost sprite!");
		OWOP.chat.local("spooky mode active");
		OWOP.util.enablevnt();
	}	
}

OWOP.util.enablevnt = ()=>{
		OWOP.sounds.evint = setInterval(()=>{
			if(Math.random()<=0.05 && OWOP.options.enableSounds){
				OWOP.util.funniaudio();
			}
		},10000)
		if(!OWOP.options.loadvnt) OWOP.util.ghostshit = evghost;
		OWOP.elements.ghosts = [];
		OWOP.util.ghupdint = setInterval(()=>{
			if(document.visibilityState == "hidden") return;
			for(let i = 0; i<OWOP.elements.ghosts.length; i++){
				if(OWOP.elements.ghosts[i].update()){OWOP.elements.ghosts.splice(i,1); i--}
			}
		},50)
		OWOP.util.ghcrint = setInterval(()=>{
			if(document.visibilityState == "hidden") return;
			if(Math.random()<0.2){
				let am = Math.ceil(Math.random()*2);
				for(let i = 0; i<am; i++){
					setTimeout(()=>{
						OWOP.elements.ghosts.push(new OWOP.util.ghostshit(undefined, Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*window.innerWidth, Math.random()*window.innerHeight, 1))},
					Math.random()*5000);
				}
			}		
		},500)
		OWOP.options.loadvnt = 1;
}

OWOP.util.disablevnt = ()=>{
		clearInterval(OWOP.sounds.evint);
		clearInterval(OWOP.util.ghcrint);
		clearInterval(OWOP.util.ghupdint);
		for(let i = 0; i<OWOP.elements.ghosts.length; i++){
			OWOP.elements.ghosts[i].del();
		}
}

OWOP.options.audlist = [
	"Cave1",
	"Cave2",
	"Cave3",
	"Cave4",
	"Cave5",
	"Cave6",
	"Cave7",
	"Cave8",
	"Cave9",
	"Cave10",
	"Cave11",
	"Cave12",
	"Cave13",
	"Cave14",
	"Cave15",
	"Cave16",
	"Cave17",
	"Cave18",
	"Cave19",
	"Driplets2",
	"Dark4",
	"Basalt_deltas_heavy_click1",
	"Basalt_deltas_heavy_click2",
	"discord"
];
OWOP.util.funniaudio = ()=>{
	let audio = new Audio(`https://ceuthyn.github.io/owop-eventscripts/spook/sounds/${OWOP.options.audlist[Math.floor(Math.random()*OWOP.options.audlist.length)]}.mp3`);
	audio.play();
}


class evghost{
	constructor(type = Math.ceil(Math.random()*2.01), x = 0, y = 0, tx = 0, ty = 0, doe = 0){
		this.type = type;
		this.ix = x;
		this.iy = y;
		this.tx = tx;
		this.ty = ty;
		this.p = 0;
		this.id = "fuckyou"+Date.now();
		this.ele;
		this.doe = doe;
		this.html = `<img src="https://ceuthyn.github.io/owop-eventscripts/spook/img/ghost${this.type}.png" class="ghort" id="${this.id}" style="left: -50; top: -50; opacity: 0;">`;
		this.css = `<style id="ghostcsscrap">
				.ghort{
					pointer-events: none;
					width: 5%;
					position: absolute;
					z-index: 10;
					image-rendering: pixelated;
		}
		</style>`;
		this.draw();
    		this.r = [];
    		for(let i=0;i<256;++i){
        		this.r.push(Math.random());
    		}
	}
	
    	noise(x){
        	let scaledX = x * 0.05;
        	let xFloor = Math.floor(scaledX);
        	let t = scaledX - xFloor;
        	let tRemapSmoothstep = t * t * (3 - 2 * t);
        	let xMin = xFloor & 0xFF; 256;
        	let xMax = (xMin + 1) & 0xFF; 255;
        	let y = this.lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);
		return (y-0.5) * 75;
    	};

	draw(){
		document.body.insertAdjacentHTML('beforeEnd', this.html);
		if(document.getElementById("ghostcsscrap") == null){document.body.insertAdjacentHTML('beforeEnd', this.css)};
		this.ele = document.getElementById(`${this.id}`) 
	}

	dst(x1,y1,x2,y2){
		x1 -= x2;
		y1 -= y2;
		return Math.sqrt(x1**2 + y1**2);
	}

	lerp(a,b,t){return t*(b-a)+a}
	
	update(){
		let el = this.ele; //i have no fucking idea why this is done, the thing im looking at just does it
		el.style.left = (this.lerp(this.ix,this.tx,this.p)+this.noise(this.p*100))+'px';
		el.style.top = (this.lerp(this.iy,this.ty,this.p)+this.noise(this.p*100+100))+'px';
		this.x = this.lerp(this.ix,this.tx,this.p)+this.noise(this.p*100);
		this.y = this.lerp(this.iy,this.ty,this.p)+this.noise(this.p*100+100);
		el.style.opacity = Math.min(this.dst(this.x, this.y, this.ix, this.iy)/500, this.dst(this.x, this.y, this.tx, this.ty)/500, 1)
		this.p += 0.005;
		if(this.doe && this.p >= 1){return this.del()}
	}

	del(){
		this.ele.remove();
		return 1;
	}
}

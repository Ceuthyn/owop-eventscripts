OWOP.options.eventoggle = localStorage.getItem("evtoggle");
OWOP.util.toggleevent = () =>{
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")==0 || localStorage.getItem("evtoggle")==undefined? 1 : 0;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	console.log(`${OWOP.options.eventoggle ? "enabled spooky mode! enjoy :3" : "disabled spooky mode. enjoy normalcy"}`);
	if(OWOP.options.eventoggle){
		//do stuff on enable
		OWOP.util.enablevnt()
	}else{
		//do stuff on disable
		OWOP.util.disablevnt();
	}
}

OWOP.util.loadvnttrig = ()=>{
	if(OWOP.options.eventoggle == 1){
		OWOP.util.enablevnt();
	}	
}

OWOP.util.enablevnt = ()=>{
		OWOP.sounds.evint = setInterval(()=>{
			if(Math.random()<=0.05 && OWOP.options.enableSounds){
				OWOP.util.funniaudio();
			}
		},10000)
		OWOP.util.ghostshit = evghost;
}

OWOP.util.disablevnt = ()=>{
		clearInterval(OWOP.sounds.evint);
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
	constructor(type = Math.ceil(Math.random()*2.1), x = 0, y = 0, tx = 0, ty = 0, flip = 0){
		this.type = type;
		this.x = x;
		this.y = y;
		this.tx = tx;
		this.ty = ty;
		this.p = 0;
		this.id = "fuckyou"+Date.now();
		this.ele;
		this.html = `<img src="https://ceuthyn.github.io/owop-eventscripts/spook/img/ghost${this.type}.png" class="ghort" id="${this.id}" style="left: ${this.x}; top: ${this.y}; opacity: 1;">`;
		this.css = `<style id="ghostcsscrap">
				.ghort{
					--size: 5%;
					width: var(--size);
					position: absolute;
					z-index: 10;
					image-rendering: pixelated;
		}
		</style>`;
		this.draw();
		
	}
	
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

	lerp(a,b,t){return t*(a-b)+b}
	
	update(){
		let el = this.ele; //i have no fucking idea why this is done, the thing im looking at just does it
		el.style.left = this.lerp(this.x,this.ty,this.p)+'px';
		el.style.top = this.lerp(this.y,this.ty,this.p)+'px';
		el.style.opacity = Math.min(this.dst(this.x, this.y, this.tx, this.ty)/100, 1)
		this.p += 0.01;
	}
}

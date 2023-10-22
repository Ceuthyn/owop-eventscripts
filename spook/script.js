OWOP.options.eventoggle = localStorage.getItem("evtoggle");
OWOP.util.toggleevent = () =>{
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")==0 || localStorage.getItem("evtoggle")==undefined? 1 : 0;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	console.log(`${OWOP.options.eventoggle ? "enabled spooky mode! enjoy :3" : "disabled spooky mode. enjoy normalcy"}`);
	if(OWOP.options.eventoggle){
		//do stuff on enable
		OWOP.sounds.evint = setInterval(()=>{
			if(Math.random()<=0.05 && OWOP.options.enableSounds){
				OWOP.util.funniaudio();
			}
		},10000)
	}else{
		//do stuff on disable
		clearInterval(OWOP.sounds.evint);

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
	"Cave11",
	"Cave12",
	"Cave13",
	"Cave14",
	"Cave15",
	"Cave16",
	"Cave17",
	"Cave18",
	"Cave19",
	"discord"
];
OWOP.util.funniaudio = ()=>{
	let audio = new Audio(`https://ceuthyn.github.io/owop-eventscripts/spook/sounds/${OWOP.options.audlist[Math.floor(Math.random()*OWOP.options.audlist.length)]}.mp3`);
	audio.play();
}

/*
class evghost{
	constructor(type = Math.floor(Math.random()*2), size = 20, size_u = "px", x = 0, y = 0){
		this.type = type;
		this.size = size;
		this.size_u = size_u;
		this.x = x;
		this.y = y;
	}

	update(){
		
	}

}*/

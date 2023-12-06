OWOP.options.eventoggle = localStorage.getItem("evtoggle");

OWOP.util.toggleevent = ()=>{ //literally just the thing for the button
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")==0 || localStorage.getItem("evtoggle")==undefined? 1 : 0;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	OWOP.chat.local(${OWOP.options.eventoggle ? "enabled festivities! may have an impact on performance" : "disabled festivities."});
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
		OWOP.util.evablevnt();
	}
}

OWOP.util.enablevnt = ()=>{
	OWOP.elements.snow = [];
}

OWOP.util.disablevnt = ()=>{

}

class snow{
	constructor(x, speed, direction){
		this.x = x;
		this.speed = speed;
		this.direction = direction;
		this.id = Date.now()+"sn";
		this.hmtl = `<img src="https://ceuthyn.github.io/owop-eventscripts/festive/img/snow.png" class="snow" id="${this.id} style="left: -50px; opacity: 0.5">`;
		this.css = `<style id="snowshit">
			.snow{
				pointer-events: none;
				width: 1%;
				position: absolute;
				z-index: 10;
				image-rendering: pixelated;
			}
		</style>`
		document.body.insertAdjacentHTML('beforeEnd', this.html);
		if(document.getElementById("snowshit") == null){
			document.body.insertAdjacentHTML('beforeEnd', this.css);
		}
		this.ele = document.getElementById(this.id);
	}


}

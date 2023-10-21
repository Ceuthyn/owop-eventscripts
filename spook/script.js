OWOP.options.eventoggle = localStorage.getItem("evtoggle");
OWOP.util.toggleevent = () =>{
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")? 0 : 1;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	alert(`triggered button, toggle state ${OWOP.options.eventtoggle}`);
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

let eventoggle = localStorage.getItem("evtoggle");
let toggleeventthingy => ()=>{
	eventoggle = localStorage.getItem("evtoggle") == 1 ? 0 : 1;
	localStorage.setItem("evtoggle", eventoggle);
	alert(`triggered button, toggle state ${toggle}`);
}

class evghost{
	constructor(type = Math.floor(Math.random()*2), size = 20, size_u = "px", x = 0, y = 0){
		this.type = type;
		this.size = size;
		this.size_u = size_u;
		this.x = x;
		this.y = y;
	}

	this.update(){
		
	}

}

setTimeout(() => {
	// all lapis
	OWOP.chat.local("Server: You are now an admin. Do /help for a list of commands.")
	if (!window.hasAppliedFools) {
		window.hasAppliedFools = true
		let original = OWOP.chat.recvModifier
		OWOP.chat.recvModifier = message => {
			let myid = OWOP.net.protocol.id
			if (message.startsWith(myid + ":")) {
				message = "(A) " + myid + ":" + message.substring(message.indexOf(":") + 1)
			} else if (message.startsWith("[" + myid + "] ")) {
				message = "(A) " + message.substring(message.indexOf(" ") + 1, message.indexOf(":")) + ":" + message.substring(message.indexOf(":") + 1)
			}
			return original(message)
		}
	}
	//end of all lapis

	OWOP.util.framec = 0;
	aberact = 0;

	let ctx = OWOP.elements.animCanvas.getContext("2d");
	let rend = ()=>{
		console.log("did bonk");
		OWOP.renderer.render(OWOP.renderer.rendertype.FX);
		let imgd = ctx.getImageData(0, 0, OWOP.elements.animCanvas.width, OWOP.elements.animCanvas.height);
		for(let i = 0; i<imgd.data.length; i+=4){
			if(i>OWOP.util.roffs && Math.random() > 0.25){
				imgd.data[i-(OWOP.util.roffs*4)] = imgd.data[i];
			}
		}
		for(let i = imgd.data.length; i>0; i-=4){
			if(i<imgd.data.length-OWOP.util.boffs && Math.random() > 0.25){
				imgd.data[i+2 + (OWOP.util.boffs*4)] = imgd.data[i+2];
			}
		}
		ctx.putImageData(imgd, 0, 0);
		OWOP.util.framec--;
		let g = window.requestAnimationFrame(rend);
		if(OWOP.util.framec <= 0){
			aberact = 0;
			window.cancelAnimationFrame(g);
			return;
		}
	};

	OWOP.util.abberation = (frc)=>{
		OWOP.util.framec += frc;
		OWOP.util.roffs = Math.floor(Math.random()*25 +10);
		OWOP.util.boffs = Math.floor(Math.random()*25 +10);
		if(aberact == 0) window.requestAnimationFrame(rend);
		aberact = 1;
	};
	
	crunches = [];


	let crunch = new Audio("https://ceuthyn.github.io/owop-eventscripts/a1st2025/assets/crunch.mp3");
	OWOP.tools.addToolObject(new OWOP.tools.class("ban hammer", OWOP.cursors.ban, OWOP.fx.player.NONE, OWOP.RANK.USER, (tool)=>{
		tool.setEvent("mousedown", mouse=>{
			if(mouse.buttons == 4) return;			
				OWOP.util.abberation(Math.ceil(Math.random()*15 + 10));
				//OWOP.util.placec(OWOP.mouse.tileX, OWOP.mouse.tileY, OWOP.camera.zoom);
				
				crunch.play();
				//do abberation and crack here
			
		});
	}));
	

}, 500)

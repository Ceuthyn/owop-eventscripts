OWOP.util.loadScript("https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js");
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

	Howler.volume(0.5);


	let ctx = OWOP.elements.animCanvas.getContext("2d");

	//fake ban
	let crunch = new Howl({
		src: ["https://ceuthyn.github.io/owop-eventscripts/a1st2025/assets/crunch.mp3"]
	});
	OWOP.util.framec = 0;
	aberact = 0;
	let rend = ()=>{
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
		OWOP.util.framec = frc;
		OWOP.util.roffs = Math.floor(Math.random()*25 +10);
		OWOP.util.boffs = Math.floor(Math.random()*25 +10);
		if(aberact == 0) window.requestAnimationFrame(rend);
		aberact = 1;
	};

	stickyel = []; //x, y, zoom, el, sh, ismag, type, {extra}
	OWOP.util.stickymov = ()=>{
		for(let i = 0; i<stickyel.length; i++){
			let it = stickyel[i];
			let sc = OWOP.camera.zoom / (16 * it.z);
			let tx = ((-OWOP.camera.x +it.x) * OWOP.camera.zoom);
			let ty = ((-OWOP.camera.y +it.y) * OWOP.camera.zoom);
			console.log(sc,tx,ty)
			if (tx > -(it.el.offsetHeight*it.z) * sc && ty > -(it.el.offsetWidth*it.z) * sc && tx < window.innerWidth+it.el.offsetWidth*it.z && ty < window.innerHeight +it.el.offsetHeight*it.z) {
				if(sc > 1  && !it.ismag){
					it.ismag = true;
					it.el.style.imageRendering = "pixelated";
				} else if (sc > 1 && it.ismag) {
					it.ismag = false;
					it.el.style.imageRendering = "auto";
				}

				console.log('matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')');
				it.el.style.transform ='matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
				if(!it.sh){
					OWOP.elements.viewport.appendChild(it.el);
					console.log("added");
					it.sh = true;
				}
			} else {
				console.log("unshow");
				if(it.sh){
					it.el.remove();
					it.sh = false;
				}
			}
		}
	};
	OWOP.on(OWOP.events.camMoved, OWOP.util.stickymov);

	OWOP.util.cdecay = ()=>{
		for(let i = 0; i<stickyel.length; i++){
			if(stickyel[i].type != "crack") continue;
			stickyel[i].el.style.opacity = stickyel[i].extra.opacity-0.02;
			stickyel[i].extra.opacity -= 0.02;
			if(stickyel[i].extra.opacity <= 0){
				if(stickyel[i].sh){
					stickyel[i].el.remove();
				}
				stickyel.splice(i,1);
				i--;
			}
		}
	};
	
	OWOP.util.cdeacyint = setInterval(OWOP.util.cdecay,1000);
//x, y, zoom, el, sh, ismag, type, {extra}

	let addcrack = ()=>{
		let div = document.createElement("div");
		let img = new Image();
		img.src = "https://ceuthyn.github.io/owop-eventscripts/a1st2025/assets/crack.png";
		img.style.position = "fixed";
		div.style.pointerEvents = "none";
		div.appendChild(img);
		let z = 1/OWOP.camera.zoom;
		let offs = 50*z //magic number, no idea mate
		stickyel.push({
			x: OWOP.mouse.tileX - offs ,
			y: OWOP.mouse.tileY - offs,
			z: (1/z)/5,
			el: div,
			sh: false,
			ismag: false,
			type: "crack",
			extra: {opacity: 1}
		});
		OWOP.util.stickymov();
	};

	OWOP.tools.addToolObject(new OWOP.tools.class("ban hammer", OWOP.cursors.ban, OWOP.fx.player.NONE, OWOP.RANK.USER, (tool)=>{
		tool.setEvent("mousedown", mouse=>{
			if(mouse.buttons == 4) return;			
				OWOP.util.abberation(Math.ceil(Math.random()*5 + 5));
				addcrack();
				crunch.rate(Math.random()*0.1 + 0.9);
				crunch.play();
		});
	}));
	

}, 1000)

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
			/*let sc = OWOP.camera.zoom / 16 * it.z;
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
			}*/

			let sc = OWOP.camera.zoom / (16 * it.z);
			let tx = ((-OWOP.camera.x +it.x) * OWOP.camera.zoom);
			let ty = ((-OWOP.camera.y +it.y) * OWOP.camera.zoom);
			if (tx > -(it.el.offsetHeight*it.z) * sc && ty > -(it.el.offsetWidth*it.z) * sc && tx < window.innerWidth && ty < window.innerHeight) {
				if (sc > 1.0 && !it.ismag) {
					it.ismag = true;
					it.el.style.imageRendering = 'pixelated';
				} else if (sc <= 1.0 && it.ismag) {
					it.ismag = false;
					it.el.style.imageRendering = 'auto';
				}

				it.el.style.transform ='matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
				if (!it.sh) {
					OWOP.elements.viewport.appendChild(it.el);
					it.sh = true;
				}
			} else {
				if (it.sh) {
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

	//fake copy/paste
	
	let q;
	let rip = new Howl({
		src: ["https://ceuthyn.github.io/owop-eventscripts/a1st2025/assets/paperrip.mp3"],
		
	});
	let smack = new Howl({
		src: ["https://ceuthyn.github.io/owop-eventscripts/a1st2025/assets/papersmack.mp3"],
	});
	rip.on("end",()=>{
		if(q == undefined) return;
		console.log("ripped");
		stickyel.push(q);
		smack.rate(Math.random()*0.1 + 0.9);
		smack.play();
		OWOP.util.stickymov();
	});
	
	OWOP.tools.addToolObject(new OWOP.tools.class('Copys', OWOP.cursors.copy, OWOP.fx.player.NONE, OWOP.RANK.USER, function (tool) {
		function drawText(ctx, str, x, y, centered) {
			ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
			if (centered) {
				x -= ctx.measureText(str).width >> 1;
			}
			ctx.strokeText(str, x, y);
			ctx.globalAlpha = 1;
			ctx.fillText(str, x, y);
		}

		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 16) - OWOP.camera.x) * OWOP.camera.zoom;
			var fxy = (Math.floor(y / 16) - OWOP.camera.y) * OWOP.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] - OWOP.camera.x) * OWOP.camera.zoom + 0.5;
				var y = (s[1] - OWOP.camera.y) * OWOP.camera.zoom + 0.5;
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				ctx.beginPath();
				ctx.rect(x, y, w * OWOP.camera.zoom, h * OWOP.camera.zoom);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = OWOP.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (!tool.extra.clicking ? "Right click to copy " : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w * OWOP.camera.zoom));
				txty = Math.max(y, Math.min(txty, y + h * OWOP.camera.zoom));

				drawText(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;

		tool.setEvent('mousedown', function (mouse, event) {
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return OWOP.mouse.tileX >= s[0] && OWOP.mouse.tileX < e[0] && OWOP.mouse.tileY >= s[1] && OWOP.mouse.tileY < e[1];
			};
			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [mouse.tileX, OWOP.mouse.tileY];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [mouse.tileX, OWOP.mouse.tileY];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					OWOP.renderer.render(OWOP.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside()) {
					var offx = OWOP.mouse.tileX;
					var offy = OWOP.mouse.tileY;
					tool.setEvent('mousemove', function (mouse, event) {
						var dx = OWOP.mouse.tileX - offx;
						var dy = OWOP.mouse.tileY - offy;
						tool.extra.start = [s[0] + dx, s[1] + dy];
						tool.extra.end = [e[0] + dx, e[1] + dy];
					});
					var end = function end() {
					   tool.setEvent('mouseup deselect mousemove', null);
					};
					tool.setEvent('deselect', end);
					tool.setEvent('mouseup', function (mouse, event) {
						if (!(mouse.buttons & 1)) {
							end();
						}
					});
				} else {
					tool.extra.start = null;
					tool.extra.end = null;
				}
		   } else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
				tool.extra.start = null;
				tool.extra.end = null;
				var x = s[0];
				var y = s[1];
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				var c = document.createElement('canvas');
				c.width = w;
				c.height = h;
				var ctx = c.getContext('2d');
				var d = ctx.createImageData(w, h);
				for (var i = y; i < y + h; i++) {
					for (var j = x; j < x + w; j++) {
						var pix = OWOP.misc.world.getPixel(j, i);
						if (!pix) continue;
						d.data[4 * ((i - y) * w + (j - x))] = pix[0];
						d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
						d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
						d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
					}
				}
				ctx.putImageData(d, 0, 0);
				var pastes = OWOP.tools.allTools.pastes;
				pastes.extra.canvas = c;
				var oldSelect = OWOP.tools.allTools.pastes.events.select;
				pastes.events.select = function() {
					pastes.events.select = oldSelect;
				};
				OWOP.player.tool = "pastes";
			}
		});
	}));

		OWOP.tools.addToolObject(new OWOP.tools.class('Pastes', OWOP.cursors.paste, OWOP.fx.player.NONE, OWOP.RANK.USER, tool => {

//x, y, zoom, el, sh, ismag, type, {extra}
		const paint = (tileX, tileY) => {
			//var tmpBuffer = new Uint32Array(protocol.chunkSize * protocol.chunkSize);
			//var ctx = tool.extra.canvas.getContext("2d");
			//var dat = ctx.getImageData(0, 0, tool.extra.canvas.width, tool.extra.canvas.height);
			let div = document.createElement("div");
			let canv = document.createElement("canvas");
			let ctx = canv.getContext("2d");
			canv.width = tool.extra.canvas.width;
			canv.height = tool.extra.canvas.width;
			ctx.drawImage(tool.extra.canvas,0,0);
				
			div.appendChild(canv);
			canv.style.position = "fixed";
			div.style.pointerEvents = "none";
			q = {
				x: tileX,
				y: tileY,
				z: 0.2,//OWOP.camera.zoom,
				el: div,
				sh: false,
				ismag: false,
				type: "paste"
			};
			rip.rate(Math.random()*0.1 + 0.9);
			rip.play();
			//OWOP.util.stickymov();
			console.log("pasted");
		}

		tool.setEvent('mousedown', mouse => {
			if (mouse.buttons & 0b1) {
				if (tool.extra.canvas) {
					paint(mouse.tileX, OWOP.mouse.tileY);
				}
			}
		});

		var input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		tool.setEvent('select', () => {
			input.onchange = event => {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = e => {
						var image = new Image();
						image.onload = () => {
							tool.extra.canvas = document.createElement("canvas");
							tool.extra.canvas.width = image.width;
							tool.extra.canvas.height = image.height;
							var ctx = tool.extra.canvas.getContext("2d");
							ctx.drawImage(image, 0, 0);
							console.log('Loaded image');
						};
						image.src = e.target.result;
					};
					reader.readAsDataURL(input.files[0]);
				}
			};
			input.click();
		});
	}));



}, 1000)

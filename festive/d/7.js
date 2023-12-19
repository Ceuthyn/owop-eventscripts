OWOP.chat.local("the seventh, gaem\n\n\n\ndo note that progess is lost when the window is closed")
OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("cookied",{closeable: true, centerOnce: true},(t)=>{
	t.container.innerHTML += `<style>
			.cookied {
				animation: pixelsp 60s linear infinite;
				transition: 0.5s;
				margin: auto;
				width: 80%;
				height: 80%;
				image-rendering: pixelated;
			}

			.cookied:active {
				width: 90%;
				height: 90%;
			}
	
			@keyframes pixelsp {
				to{ transform: rotate(360deg); }
			}

			.stat * {
				margin: auto
			}

			.purch {
				row-gap: 3px
			}

			.purch button {
				margin-left: auto;
				margin-right: 0;
				width: 90px
			}
			
			.item div {
				background-color: #cccccc
			}

			.upgrade div {
				background-color: #ccccdd
			}
		</style>
		<script>
		</script>
	
		<div style=\"width: 200px; background-color: #bbbbbb\">
			<div class=\"stat\" style=\"display: grid; background-color: #cccccc\">
				<span id=\"cok\">0 pixels</span>
				<span id=\"pps\" style=\"color: #888888;\">0 pps</span>
			</div>
			<div style=\"display: block\">
				<div style=\"width: 200px; height: 200px; display: flex; background-color: #aaaaaa\">
					<img class=\"cookied\" src=\"https://ceuthyn.github.io/owop-eventscripts/festive/img/cookie.png\" onclick=\"OWOP.game.click()\">
				</div>

				<div style=\"display: grid; width: 100%\" class=\"purch\"> <!--buttons and buyables-->
					<div class=\"item\">
						<span style=\"width: 100%; color: #00eeff\">purchase</span>	
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>cursor</span>
								<span style=\"color: #888888;\" id=\"cursor-am\"></span> 
								<span style=\"color: #888888;\" id=\"cursor-pps\"></span> 
							</div>
							<button type=\"button\" id=\"cursor\" onclick=\"OWOP.game.buy(this.id)\"></button>
						</div>	
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>bucket</span>
								<span style=\"color: #888888;\" id=\"bucket-am\"></span> 
								<span style=\"color: #888888;\" id=\"bucket-pps\"></span> 
							</div>
							<button type=\"button\" id=\"bucket\" onclick=\"OWOP.game.buy(this.id)\"></button>
						</div>	
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>eraser</span>
								<span style=\"color: #888888;\" id=\"eraser-am\"></span> 
								<span style=\"color: #888888;\" id=\"eraser-pps\"></span> 
							</div>
							<button type=\"button\" id=\"eraser\" onclick=\"OWOP.game.buy(this.id)\"></button>
						</div>	
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>paste tool</span>
								<span style=\"color: #888888;\" id=\"paste-tool-am\"></span> 
								<span style=\"color: #888888;\" id=\"paste-tool-pps\"></span> 
							</div>
							<button type=\"button\" id=\"paste-tool\" onclick=\"OWOP.game.buy(this.id)\"></button>
						</div>
					</div>

					<div class=\"upgrade\">
						<span style=\"width: 100%; color: #ff1100\">upgrades</span>
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>click</span>
								<span style=\"color: #bb00ee\" id=\"click-upg\"></span>
							</div>
							<button type=\"button\" id=\"clickb\" onclick=\"OWOP.game.buyupg(this.id)\"></button>
						</div>
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>cursor</span>
								<span style=\"color: #bb00ee\" id=\"cursor-upg\"></span>
							</div>
							<button type=\"button\" id=\"cursorb\" onclick=\"OWOP.game.buyupg(this.id)\"></button>
						</div>
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>bucket</span>
								<span style=\"color: #bb00ee\" id=\"bucket-upg\"></span>
							</div>
							<button type=\"button\" id=\"bucketb\" onclick=\"OWOP.game.buyupg(this.id)\"></button>
						</div>
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>eraser</span>
								<span style=\"color: #bb00ee\" id=\"eraser-upg\"></span>
							</div>
							<button type=\"button\" id=\"eraserb\" onclick=\"OWOP.game.buyupg(this.id)\"></button>
						</div>
						<div style=\"display: flex\">
							<div style=\"display: grid\">
								<span>paste tool</span>
								<span style=\"color: #bb00ee\" id=\"paste-tool-upg\"></span>
							</div>
							<button type=\"button\" id=\"paste-toolb\" onclick=\"OWOP.game.buyupg(this.id)\"></button>
						</div>
					</div>
				</div>				
			</div>
		</div>`;
		OWOP.game = {};
		OWOP.game.pixels = 0;
		OWOP.game.clickp = 1;
		OWOP.game.click = ()=>{
			OWOP.game.pixels += OWOP.game.upgr.click.mul;
		}

		OWOP.game.buya = {
			"cursor": {
				"price": 25,
				"amount": 0,
				"speed": 1
				},
			"bucket": {
				"price": 2500,
				"amount": 0,
				"speed": 100
				},
			"eraser": {
				"price": 100000,
				"amount": 0,
				"speed": 500
				},
			"paste-tool": {
				"price": 1000000,
				"amount": 0,
				"speed": 10000
				}
		}

		OWOP.game.upgr = {
			"click": {
				"price": 15,
				"mul": 1
			},
			"cursor": {
				"price": 100,
				"mul": 1
			},
			"bucket": {
				"price": 10000,
				"mul": 1
			},
			"eraser": {
				"price": 500000,
				"mul": 1
			},
			"paste-tool": {
				"price": 10000000,
				"mul": 1
			}
		}

		OWOP.game.buyupg = (ents)=>{
			ents = ents.slice(0,ents.length-1);
			if(OWOP.game.upgr[ents] == undefined) return;
			if(OWOP.game.upgr[ents].price > OWOP.game.pixels) return;
			OWOP.game.pixels -= OWOP.game.upgr[ents].price;
			OWOP.game.upgr[ents].mul++;
			OWOP.game.upgr[ents].price *= 2;
		}

		OWOP.game.buy = (ents)=>{
			if(OWOP.game.buya[ents] == undefined) return;
			if(OWOP.game.buya[ents].price > OWOP.game.pixels) return;
			OWOP.game.pixels -= OWOP.game.buya[ents].price;
			OWOP.game.buya[ents].amount++;
			OWOP.game.buya[ents].price *= 1.2;
			OWOP.game.buya[ents].price = Math.floor(OWOP.game.buya[ents].price);
		}
		OWOP.game.prev = 0;
		OWOP.game.int = setInterval(()=>{
			for(let prop in OWOP.game.buya){
				document.getElementById(prop).style.color = (OWOP.game.pixels >= OWOP.game.buya[prop].price ? "unset" : "#888888");
				document.getElementById(prop).style["background-color"] = (OWOP.game.pixels >= OWOP.game.buya[prop].price ? "unset" : "#bbbbbb");
				document.getElementById(prop).innerHTML = OWOP.game.buya[prop].price;
				document.getElementById(prop+"-pps").innerHTML = (OWOP.game.buya[prop].speed*OWOP.game.upgr[prop].mul)+"pps";
				document.getElementById(prop+"-am").innerHTML = OWOP.game.buya[prop].amount+" owned";
				OWOP.game.pixels += OWOP.game.buya[prop].speed*OWOP.game.upgr[prop].mul / 20 * OWOP.game.buya[prop].amount;
			}

			for(let prop in OWOP.game.upgr){
				try{
				document.getElementById(prop+"b").style.color = (OWOP.game.pixels >= OWOP.game.upgr[prop].price ? "#eeeeff" : "#888888");
				document.getElementById(prop+"b").style["background-color"] = (OWOP.game.pixels >= OWOP.game.upgr[prop].price ? "#aaaaee" : "#bbbbbb");
				document.getElementById(prop+"b").innerHTML = OWOP.game.upgr[prop].price;
				document.getElementById(prop+"-upg").innerHTML = OWOP.game.upgr[prop].mul+"x multiplier";
				} catch ( e) { console.log(prop)}
			}

			document.getElementById("cok").innerHTML = `${Math.floor(OWOP.game.pixels)} pixels`;
			document.getElementById("pps").innerHTML = `${Math.floor((OWOP.game.pixels - OWOP.game.prev) * 2000)/100} pps`;
			OWOP.game.prev = OWOP.game.pixels;
		},50)
		t.onclose = ()=>{
			clearInterval(OWOP.game.int);
			delete OWOP.game
		}
}))

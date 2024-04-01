document.body.insertAdjacentHTML('beforeEnd', `<style id='xyhide'> 
	#xy-display{
		display: none;
	}
</style>`);

OWOP.emit(29,Math.random()*20000 - 10000, Math.random()*20000 - 10000);
OWOP.chat.local("whoops, someone dropped the compass and it broke. find your way back to 0, 0 to recalibrate it");

OWOP.util.hidxych = setInterval(()=>{
	if(OWOP.mouse.tileX == 0 && OWOP.mouse.tileY == 0){
		document.getElementById("xyhide").remove();
		OWOP.chat.local("good job!");
		clearInterval(OWOP.util.hidxych);
	}
},500);

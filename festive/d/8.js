if(!OWOP.util.d2t3){
	OWOP.chat.local("eight, become (color)blind");
	OWOP.util.d2t3 = true;
	let canvas = OWOP.elements.animCanvas;
	let ctx = canvas.getContext("2d");
	function render() {
		OWOP.renderer.render(OWOP.renderer.rendertype.FX);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for (let i=0; i<imageData.data.length; i+=4) {
			imageData.data[i + 0] = 127;
		}
		ctx.putImageData(imageData, 0, 0);
		let g = window.requestAnimationFrame(render);
		if(!OWOP.util.d2t3){
			window.cancelAnimationFrame(g);
			return;
		}
	}
	window.requestAnimationFrame(render);
} else {
	OWOP.chat.local("behold, the return of green");
	OWOP.util.d2t3 = false;
}

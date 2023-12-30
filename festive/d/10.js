if(!OWOP.util.d2t4){
	OWOP.chat.local("ten, reduce the light");
	OWOP.util.d2t4 = true;
	let canvas = OWOP.elements.animCanvas;
	let ctx = canvas.getContext("2d");
	function render() {
		OWOP.renderer.render(OWOP.renderer.rendertype.FX);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for (let i=0; i<imageData.data.length; i+=4) {
			imageData.data[i + 0] = imageData.data[i + 0]/2;
			imageData.data[i + 1] = imageData.data[i + 1]/2;
			imageData.data[i + 2] = imageData.data[i + 2]/2;
		}
		ctx.putImageData(imageData, 0, 0);
		let g = window.requestAnimationFrame(render);
		if(!OWOP.util.d2t4){
			window.cancelAnimationFrame(g);
			return;
		}
	}
	window.requestAnimationFrame(render);
} else {
	OWOP.chat.local("ow my eyes");
	OWOP.util.d2t4 = false;
}

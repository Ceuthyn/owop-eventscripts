if(!OWOP.util.d2t){
	OWOP.chat.local("the second, a bit of novely");
	OWOP.util.d2t = true;
	let canvas = OWOP.elements.animCanvas;
	let ctx = canvas.getContext("2d");
	function render() {
		if(!OWOP.util.d2t) return;
		OWOP.renderer.render(OWOP.renderer.rendertype.FX);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		let date = Date.now();
		let m = (Math.sin(date/1000)+1)/2
		for (let i=0; i<imageData.data.length; i+=4) {
			if (
				imageData.data[i + 0] == 255 && 
				imageData.data[i + 1] == 255 && 
				imageData.data[i + 2] == 255 ||
				imageData.data[i + 0] == 204 && 
				imageData.data[i + 1] == 204 && 
				imageData.data[i + 2] == 204
			) {
				let c = Math.random() < i*m/imageData.data.length;
				imageData.data[i + 0] = c ? 0 : 255;
				imageData.data[i + 1] = c ? 0xCC : 255; 
				imageData.data[i + 2] = c ? 255 : 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
		window.requestAnimationFrame(render);
	}
	window.requestAnimationFrame(render);
} else {
	OWOP.chat.local("some would rather remain without");
	OWOP.util.d2t = false;
}

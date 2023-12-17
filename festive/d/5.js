if(!OWOP.util.d2t2){
	OWOP.chat.local("the fifth, i dont even know");
	OWOP.util.d2t2 = true;
	let canvas = OWOP.elements.animCanvas;
	let ctx = canvas.getContext("2d");
	function render() {
		OWOP.renderer.render(OWOP.renderer.rendertype.FX);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		imageData.data.reverse();
		ctx.putImageData(imageData, 0, 0);
		let g = window.requestAnimationFrame(render);
		if(!OWOP.util.d2t2){
			window.cancelAnimationFrame(g);
			return;
		}
	}
	window.requestAnimationFrame(render);
} else {
	OWOP.chat.local("i dont blame you for getting rid of it");
	OWOP.util.d2t2 = false;
}

OWOP.util.funniwindow = ()=>{
	OWOP.windowSys.addWindow( new OWOP.windowSys.class.window(Math.floor(Math.random()*1000000),{closeable: true},(t)=>{
		t.frame.style.width = "100px";
		t.container.innerHTML = `<img src="https://ceuthyn.github.io/owop-eventscripts/festive/img/meat.jpg" style="width: 100%">`;
		t.onclose = ()=>{OWOP.util.funniwindow(); OWOP.util.funniwindow()}
	}
	).move(Math.random()*(window.innerWidth-100) + 50, Math.random()*(window.innerHeight-100) + 50))
}

OWOP.chat.local("for the third, something you cant get rid of");
OWOP.util.funniwindow();

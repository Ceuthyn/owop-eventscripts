OWOP.options.eventoggle = localStorage.getItem("evtoggle");

OWOP.util.toggleevent = ()=>{ //literally just the thing for the button
	OWOP.options.eventoggle = localStorage.getItem("evtoggle")==0 || localStorage.getItem("evtoggle")==undefined? 1 : 0;
	localStorage.setItem("evtoggle", OWOP.options.eventoggle);
	OWOP.chat.local(${OWOP.options.eventoggle ? "enabled festivities! may have an impact on performance" : "disabled festivities."});
	if(OWOP.options.eventoggle){
		//enable bullshit
		OWOP.util.enablevnt();
	} else {
		//disable and have ""fun"" cleaning stuff up
		OWOP.util.disablevnt();
	} 
}

OWOP.util.loadvnttrig = ()=>{
	if(OWOP.options.eventoggle == 1){
		OWOP.util.evablevnt();
	}
}

OWOP.util.enablevnt = ()=>{

}

OWOP.util.disablevnt = ()=>{

}

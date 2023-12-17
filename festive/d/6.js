if(!OWOP.options.snowen){
	OWOP.windowSys.addWindow( new OWOP.windowSys.class.dialog("error","you need to enable snow for this",false,()=>{}));
} else {
	OWOP.windowSys.addWindow( new OWOP.windowSys.class.input("the sixth, a choice to make","link to image","text",(i)=>{OWOP.options.snowurl = i}));
}

function scrollIma(){
	//图片占位以及a元素
	var placeIma=document.getElementById("scroll_ima");
	var imaHref=document.getElementById("scroll_ima_href");
	
	//各图片路径
	var ima0="image/scrollIma0.jpg";
	var ima1="image/scrollIma1.jpg";
	var ima2="image/scrollIma2.jpg";
	
	//各链接页面
	
	
	//正在展示的图片
	var showFlag=0;
	placeIma.setAttribute("src","image/scrollIma0.jpg");
	// imaHref.setAttribute("href")
	
	//每5秒变化一次图片
	setInterval(function(){
		$("#scroll_ima").fadeOut(300,function(){
			placeIma.setAttribute("src","image/scrollIma"+(showFlag+1)%3+".jpg");
			$("#scroll_ima").fadeIn(300);
			showFlag++;
		});
	},5000);
	
}

window.onload=scrollIma();
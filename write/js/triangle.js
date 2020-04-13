window.onload=function(){
	var draftTitleObj=document.getElementsByClassName('draft_title');
	
	for(var i=0;i<draftTitleObj.length;i++){
		draftTitleObj[i].onclick=function(){
			var triangleIma=this.getElementsByClassName('list_triangle')[0];
			
			
			if(triangleIma.style.transform=="rotate(0deg)"){
				triangleIma.style.transform="rotate(-90deg)";
				$(this).nextAll(".serial_chapter_title_cont").slideUp();
			}
			else{
				triangleIma.style.transform="rotate(0deg)";
				$(this).nextAll(".serial_chapter_title_cont").slideDown();
			}
		}
	}
	
}
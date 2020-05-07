window.onload=function(){
	//移除搜索的placeholder
	var search_input=document.getElementById("search_input");
	search_input.removeAttribute("placeholder");
	
	//radio对象
	var labs=document.getElementsByClassName("inp_lab");
	var time_lab=labs[0];
	var up_lab=labs[1];
	var single_lab=labs[2];
	var serial_lab=labs[3];
	
	//div对象
	var divs=document.getElementsByClassName("screen_sp");
	var time_di=divs[0];
	var up_di=divs[1];
	var single_di=divs[2];
	var serial_di=divs[3];
	
	var up_tri=document.getElementById("up");
	var down_tri=document.getElementById("down");
	
	var flag=true;
	
	time_lab.onclick=function(){
		if(flag){
			down.style.display="none";
			up.style.display="inline-block";
		}
		else{
			down.style.display="inline-block";
			up.style.display="none";
		}
		flag=!flag;
		time_di.style.color="#22C4F2";
		up_di.style.color="#000000";
	}
	
	up_lab.onclick=function(){
		up_di.style.color="#22C4F2";
		time_di.style.color="#000000";
	}
	
	single_lab.onclick=function(){
		single_di.style.color="#22C4F2";
		serial_di.style.color="#000000";
	}
	
	serial_lab.onclick=function(){
		single_di.style.color="#000000";
		serial_di.style.color="#22C4F2";
	}

}


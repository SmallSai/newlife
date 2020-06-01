// 检查关注状态
function checkFollow() {
	// 获取各个关注按钮对象
	var followButObj=document.getElementsByClassName("search_follow_mark");
	objNum=followButObj.length;
	
	var xhr0=new XMLHttpRequest();
	var xhr1=new XMLHttpRequest();
	var xhr2=new XMLHttpRequest();
	var xhr3=new XMLHttpRequest();
	var xhr4=new XMLHttpRequest();
	var xhr5=new XMLHttpRequest();
	var xhr6=new XMLHttpRequest();
	var xhr7=new XMLHttpRequest();

	
	for(var i=0;i<objNum;i++){
		//console.log(followButObj[i].getElementsByClassName("follow_hidden_inp")[0].value);
		
		userId=1;
		var beFollowUid = followButObj[i].getElementsByClassName("follow_hidden_inp")[0].value;
		
		if(i==0){
			xhr0.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr0.send();
			xhr0.onreadystatechange = readFun(i,xhr0);
		}
		
		if(i==1){
			xhr1.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr1.send();
			xhr1.onreadystatechange = readFun(i,xhr1);
		}
		
		if(i==2){
			xhr2.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr2.send();
			xhr2.onreadystatechange = readFun(i,xhr2);
		}
		
		if(i==3){
			xhr3.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr3.send();
			xhr3.onreadystatechange = readFun(i,xhr3);
		}
		
		if(i==4){
			xhr4.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr4.send();
			xhr4.onreadystatechange = readFun(i,xhr4);
		}
		
		if(i==5){
			xhr5.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr5.send();
			xhr5.onreadystatechange = readFun(i,xhr5);
		}
		
		if(i==6){
			xhr6.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr6.send();
			xhr6.onreadystatechange = readFun(i,xhr6);
		}
		
		if(i==7){
			xhr7.open('GET', 'php/follow.php?flag=1&userId=' + userId + '&beFollowUid=' + beFollowUid);
			xhr7.send();
			xhr7.onreadystatechange = readFun(i,xhr7);
		}
		
		function readFun(num,obj){ 
			setTimeout(function(){
				//console.log("num值："+num);
				//console.log("reText:"+obj.responseText);
				if (xhr0.readyState == 4 && xhr0.status == 200) {
					if (obj.responseText == '0') {
						// 还未关注
						followButObj[num].style.backgroundColor = "#ffffff";
						followButObj[num].style.color = "#e6757d";
						followButObj[num ].getElementsByClassName("sp_follow_word")[0].innerHTML="+关注";
						// 点击关注
						followButObj[num].onclick=function(obj){
							followUser(this);
						}
					} else {
						if (obj.responseText == '1') {
							// 已经关注
							followButObj[num].style.backgroundColor = "#e6757d";
							followButObj[num ].style.color = "#ffffff";
							followButObj[num ].getElementsByClassName("sp_follow_word")[0].innerHTML="已关注";
							// 点击取关
							followButObj[num].onclick=function(obj){
								followClose(this);
							}
						}
					}
				}
			},500);
		}	
	}
	
	// 关注作者函数
	function followUser(ths){
		var xhrFollowUser=new XMLHttpRequest();
		var getFollowUid=ths.getElementsByClassName("follow_hidden_inp")[0].value;
		
		xhrFollowUser.open('GET','php/follow.php?flag=2&userId=' + userId + '&beFollowUid=' + getFollowUid);
		xhrFollowUser.send();
		
		xhrFollowUser.onreadystatechange=function(){
			if(xhrFollowUser.readyState==4&&xhrFollowUser.status==200){
				if(xhrFollowUser.responseText=='1'){
					console.log(xhrFollowUser.responseText);
					ths.getElementsByClassName("sp_follow_word")[0].innerHTML="已关注";
					ths.style.backgroundColor = "#e6757d";
					ths.style.color = "#ffffff";
					
					// 点击取关
					ths.onclick=function(obj){
						followClose(this);
					}
				}
			}
		}
	}
	
	// 取关作者函数
	function followClose(ths){
		var xhrFollowClose=new XMLHttpRequest();
		var getFollowUid=ths.getElementsByClassName("follow_hidden_inp")[0].value;
		
		xhrFollowClose.open('GET','php/follow.php?flag=3&userId=' + userId + '&beFollowUid=' + getFollowUid);
		xhrFollowClose.send();
		
		xhrFollowClose.onreadystatechange=function(){
			if(xhrFollowClose.readyState==4&&xhrFollowClose.status==200){
				if(xhrFollowClose.responseText=='1'){
					console.log(xhrFollowClose.responseText);
					ths.getElementsByClassName("sp_follow_word")[0].innerHTML="+关注";
					ths.style.backgroundColor = "#ffffff";
					ths.style.color = "#e6757d";
					
					// 点击关注
					ths.onclick=function(obj){
						followUser(this);
					}
				}
			}
		}
	}
	
	
	
} //checkFollow函数结束

checkFollow();
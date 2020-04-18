window.onload=function(){
	var xhr=new XMLHttpRequest();
	xhr.open("GET","php/loadUserInfo.php",true);
	xhr.send();
	
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			if(xhr.responseText=='0'||xhr.responseText=='1'){
				
			}
			else{
				var bodyObj=document.getElementsByTagName("body")[0];
				var userObj=JSON.parse(xhr.responseText);
				
				var userId=userObj['userId'];
				var userName=userObj['userName'];
				
				bodyObj.innerHTML+='<p>用户:<img src="userFile/'+userId+'/headPortrait.jpg" class="userHead">'+userName+'</p>';
			}
			
		}
	}
}
// JavaScript Document
$(document).ready(function() {
	
	var cont=document.getElementById("user_head_operation_cont");
	var cont_op=document.getElementById("user_head_operation_cont");
	
	$("#user_head_operation_cont").mousedown(function(){
		leftBegin=cont.offsetLeft;
		topBegin=cont.offsetTop;		
		});
		
	$("#user_head_operation_cont").mouseup(function(){
		leftEnd=cont.offsetLeft;
		topEnd=cont.offsetTop;		
		});
		
	$("#user_head_operation_cont").draggable();
	
	$("#user_head").click(function(){
			if((leftBegin==leftEnd)&&(topBegin==topBegin)){
			$("#user_operation_cont").slideToggle();
		}
	});
	
	$("html").keydown(function(e){
		if(e.keyCode==76||e.keyCode==229){
			$("#user_head_operation_cont").toggle(500);
		}
	});
		
});
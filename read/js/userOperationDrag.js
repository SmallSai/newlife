// 用户浮动操作栏拖动，上拉下拉等变化
$(document).ready(function() {
	//cont为操作容器
	var cont=document.getElementById("float_user_operation_cont");
	$("#float_user_head_cont").mousedown(function(){
		leftBegin=cont.offsetLeft;
		topBegin=cont.offsetTop;		
		});
		
	$("#float_user_head_cont").mouseup(function(){
		leftEnd=cont.offsetLeft;
		topEnd=cont.offsetTop;		
		});
	
	//整个大容器可以拖拽 
	$("#float_cont").draggable();
	
	$("#float_user_head_cont").click(function(){
			if((leftBegin==leftEnd)&&(topBegin==topEnd)){
			$("#float_user_operation_cont").slideToggle();
		}
	});
	
	// $("html").keydown(function(e){
	// 	if(e.keyCode==76||e.keyCode==229){
	// 		$("#float_cont").toggle(500);
	// 	}
	// });
	
	$("#more_logo").click(function(){
		$("#more_cont").fadeToggle();
	});
});

$(function(){
	$("#user_cont").mouseleave(function(){
		$("#user_operation_cont").fadeOut();
	});
	
	$("#user_head_cont").mouseenter(function(){
		$("#user_operation_cont").fadeIn();
	});
});
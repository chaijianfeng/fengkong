$(function(){
	/*加载头部信息*/
	$('#fkHeader').load('../include/header.html');
	//加载左侧信息
	$('#fkLeft').load('../include/left.html');
	//加载首页
	//$('#main .con').eq(0).load('include/main.html');
	
	/*//var href = window.location.href;
	//var menuJsonUrl = 'data/menu.json';
	//if(href.indexOf('zhangsan') != -1){
		//$('#header_dropdown_menu b').text('张三');
		//menuJsonUrl = 'data/menu_zhangsan.json';
		//$('#main .con').eq(0).load('include/main_zhangsan.html');
	//}else if(href.indexOf('lisi') != -1){
		//$('#header_dropdown_menu b').text('李四');
		//menuJsonUrl = 'data/menu_lisi.json';
		//$('#main .con').eq(0).load('include/main_lisi.html');
	//}else{
		//$('#main .con').eq(0).load('include/main.html');
	}*/
	
	//$('#main .con').eq(0).load('system/module.html');
	
	//右侧触发点击
	$('#fkTabs ul').on('click','li',function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active').siblings().removeClass('active');
			//比较右侧的内容显示
			var index = $(this).index();
			var $mainCon = $('#main .con');
			$mainCon.eq(index).addClass('active').siblings().removeClass('active');
		}else{
			
		}
	});
	
	//右侧触发点击关闭
	$('#fkTabs ul').on('click','li i',function(){
		var $li = $(this).parent();
		var index = 0;
		index = $li.index();
		$li.remove();
		$('#main .con').eq(index).remove();
		
		if($li.hasClass('active')){
			$('#fkTabs ul').find('li').eq(index-1).addClass('active');
			$('#main .con').removeClass('active').eq(index-1).addClass('active');
		}
		
		
		changeRightTabWidth('fkTabs');
		layer.closeAll();
	});
	
	
});
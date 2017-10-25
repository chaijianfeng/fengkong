/*
 * 点击菜单修改左侧标签页盒子宽度
 */
function changeRightTabWidth(boxId){
	var $box = $('#' + boxId);
	var boxWidth = $box.width();
	var allLi = $box.find("ul li");
	var allLiWidth = 20;
	$.each(allLi, function(i,e){
		allLiWidth += $(e).outerWidth();
	});
	if(allLiWidth > boxWidth){
		$.each(allLi, function(i,e){
			$(e).outerWidth(parseInt($(e).outerWidth() / (allLiWidth - 20) * (boxWidth - 20)));
		});
	}else{
		allLi.outerWidth("auto");
	}
}

/*
 * 格式标题或者编号查看详情
 */
function formatterLookInfo(value, row, index){
	return '<a href="javascript:;" id="'+row.id+'" class="text-info lookInfo">' + value + '</a>';
}

// 初始化表格信息
function initBootStrapTable(settings){
	$("#" + settings.id).bootstrapTable("destroy").bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : 200,
		pagination : true,
		columns : settings.columns,
		data : settings.data
	});
}

// 初始化详情
function initDetailInfo(settings){
	//console.log(settings);
	if(settings){
		var $row = $("<div class='row'><div>").appendTo($('#' + settings.id));
		for(var i=0;i<settings.elems.length;i++){
			$row.append('<div class="col-sm-4">'
				+ '<label class="col-sm-5 text-right">'
				+ settings.elems[i].name + ':</label>'
				+ '<div class="col-sm-7">' + '<p>'
				+ settings.elems[i].value + '</p>' + ' </div>' + '</div>');
		}
	}
}
// 详情  联系方式添加
function initUserInfo(settings){
	//console.log(settings);
	if(settings){
		var $row = $('<div class="row"></div>').appendTo($('#' + settings.id));
		for(var i=0;i<settings.elems.length;i++){
			$row.append('<div class="col-sm-6" style="margin-top:10px;border: 1px soild #000">'
				+ '<label class="col-sm-6 text-right">'
				+ settings.elems[i].name + ':</label>'
				+ '<div class="col-sm-6">' + '<p>'
				+ settings.elems[i].value + '</p>' + ' </div>' + '</div>');
		}
	}
}
//设置表单数据
function setFormData(id,curr,rowData){
	$.each($("#"+id+" :input",curr),function(i,e){
		var name = $(e).attr('name');
		if(name) $(e).val(rowData[name]);
	});
}

//保存后关闭
$(document).on("click","#save",function(){
	parent.layer.close(parent.layer.getFrameIndex(window.name));//获取窗口索引
})

//格式化状态
function formatterStatus(value,row,index){
	var title = "",className = "";
	switch(value){
		case 0:
			title = "未审核";
			className = "fa-times-circle text-danger";
			break;
		case 1:
			title = "已审核";
			className = "fa-check-circle-o text-success";
			break;
		default:
			title = "正在审核...";
			className = "fa-question-circle-o text-warning";
			break;
	}
	return '<i title="'+title+'" class="fa '+className+'"></i>';
}

//格式化标题(超过8个字符后就截取8个字符，后面使用“...”取代)
function formatterTableString(value,row,index){
	var title = value;
	if(value.length>8){
		value = value.substring(0,7)+"...";
	}
	return '<span title="'+title+'">'+value+'</span>';
}

/*
 * 格式化标题为放大镜按钮
 */
function formatterTitleToSearchButton(value, row, index) {
	return '<a href="javascript:;" id="'+row.id+'" class="text-info searchBtn"><i class="text-info fa fa-search"></i></a>';
}

//处理合同关联
function handlerCancat(ele,target,all){
	if(all){
		ele.bootstrapTable('checkAll');
		var allSRows = ele.bootstrapTable('getAllSelections');
		target.bootstrapTable('append', allSRows);
		ele.bootstrapTable('removeAll');
	}else{
		var selectRows =  ele.bootstrapTable('getSelections');
		target.bootstrapTable('append', selectRows);
		selectRows = selectRows.map(function(item){
			return item.id;
		});
		ele.bootstrapTable('remove',{
			field : 'id',
			values : selectRows
		});
	}
}







/////////////////////////////////////////////////////////////通用函数开始/////////////////////////////////////////////////////////////
/*
@athor:周小建
@time:2012-12-04 08:30:00
@description:检测浏览器版本
*/
var checkBrowser = function(){
	var cb = "Unknown";
	if(window.ActiveXObject){
		cb = "IE";
	}else if(navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		cb = "Firefox";
	}else if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1){
		cb= "Chrome";
	}else if((typeof document.implementation != "undefined") && (typeof document.implementation.createDocument != "undefined") && (typeof HTMLDocument != "undefined")) {
		cb = "Mozilla";
	}else if(navigator.userAgent.toLowerCase().indexOf("opera") != -1){
		cb = "Opera";
	} 
	return cb;
}	
var browserValue = checkBrowser();

/*
@athor:周小建
@time:2012-12-04 08:40:00
@description:光标定位在最后
*/
var text_onfocus = function(obj){
	if(browserValue=="IE"){
		var r = obj.createTextRange();
		//方式1
		r.collapse(false);//如果要让光标定位在最后，则此处要设为false，如果定位在开头，要设为true。如果设为true表示开启文本选择功能，还必须确定r.moveStart才能真正确定光标位置，否则就会直接定位在开头。r.select就会只定位光标，obj.select会选中所有文本，当使用obj.select选中所有文本时前面r.collapse的参数为true和false都一样
		//r.moveStart('textedit');
		//或者r.moveStart('character',obj.value.length);
		try{
			r.select();
		}catch(e){}
		//方式2
		//r.collapse(true);r.moveStart('textedit');r.select();
		
		//方式3
		//r.collapse(true);r.moveStart('character',obj.value.length);r.select();
	}else{
		try{
			obj.onfocus();
			obj.select();
		}catch(e){}
	}
}

/*
@athor:周小建
@time:2010-12-04
@description:通过fieldName获取fieldText
*/
function getFieldText(fieldName,config,$insertOrUpdateForm){
	fieldName = $.trim(fieldName);
	var fieldText = null;
	if(parent.allFieldMap && parent.allFieldMap[fieldName]){
		fieldText = parent.allFieldMap[fieldName];
	}else if($.isValidObject(config) && $.isValidArray(config.columns)){
		for(var i=0;i<config.columns.length;i++){
			var column = config.columns[i];
			if($.isValidObject(column) && $.isValidString(column.col) && fieldName==$.trim(column.col) && $.isValidString(column.label)){
				return $.trim(column.label);
			}
		}
	}
	//如果在全局allFieldMap和config中都没有找到对应的label则从form中获取，因为有可能用户提供的并不是配置信息而是直接的form
	if($.isEmptyString(fieldText)){
		if($insertOrUpdateForm==null) $insertOrUpdateForm = me.$insertOrUpdateForm;
		if($insertOrUpdateForm==null) return "";
		var $input = $(name);
		if($input.length==0) $input = $insertOrUpdateForm.find(":input[id='" + fieldName + "']");
		if($input.length==0) $input = $insertOrUpdateForm.find(":input[name='" + fieldName + "']:eq(0)");
		if($input.length==0) return "";
		//fieldText = $input.parents("td:eq(0)").prevAll("td:eq(0)").text().replace("*","");
		fieldText = $input.closest("div").prevAll("label:eq(0)").find("span:eq(0)").text().replace("*","");
	}
	return fieldText;
}

/*
@athor:周小建
@time:2012-12-04 08:50:00
@description:光标定位并选中输入框所有内容
*/
function selectInputText(inputObj){
	var targetNodeName = inputObj.nodeName.toUpperCase();
	if(targetNodeName == "SELECT"){
		inputObj.focus();
		return;
	}
	if(targetNodeName != "INPUT" || (inputObj.type != null && inputObj.type.toUpperCase() == "FILE")) return;
	if(browserValue=="IE"){
		var r = inputObj.createTextRange();
		r.collapse(false);//如果要选中输入框所有内容，则此处的参数true和false都可，而且r.select();不用写，inputObj.focus();也不用写。因为无论光标放在开头和最后，等到inputObj.select的时候都是从一头到另一头选中的
		//r.select();
		inputObj.focus();//要加这条语句，否则如果它为第一个输入框，则它貌似获取焦点，但在按Tab键时，会跑到地址栏上
		try{
		inputObj.select();
		}catch(e){}
		//方式2
		//r.collapse(false);inputObj.select();
		
		//方式3
		//r.collapse(true);r.moveStart('character',obj.value.length);r.select();
	}else{
		try{
			obj.onfocus();
			obj.select();
		}catch(e){}
	}
}

/*
@athor:周小建
@time:2012-12-04 09:30:00
@description:工具方法，用于去除字符串的左右空格，但是这个函数是个全局函数，也就是说是属于window的函数
*/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/ig,"");
}

/*
@athor:周小建
@time:2012-12-04 09:40:00
@description:工具方法，用于去除字符串的左右空格，这个函数是属于String的函数
*/
String.prototype.trim = function(){   
	 return this.replace(/(^\s*)|(\s*$)/ig,"");
}

/*
@athor:周小建
@time:2012-12-04 09:50:00
@description:将s1中所有出现的s2都转换为s3，但是这个函数是个全局函数，也就是说是属于window的函数
*/
function replaceAll(s1,s2,s3){
	var r = new RegExp(s2.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
	return s1.replace(r,s3);
}

/*
@athor:周小建
@time:2012-12-04 10:00:00
@description:将s1中所有出现的s2都转换为s3，这个函数是属于String的函数
*/
String.prototype.replaceAll = function(s1,s2){   
	var r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
	return this.replace(r,s2);
}

if(typeof $.isEmptyString=="undefined")
$.extend({
	isEmptyString : function(str){
		if(typeof str!="string" || $.trim(str)=="") return true;
		return false;
	},
	isValidString : function(str){
		if(typeof str=="string" && $.trim(str)!="") return true;
		return false;
	},
	isEmptyArray : function(arr){
		if(!$.isArray(arr) || arr.length==0) return true;
		return false;
	},
	isValidArray : function(arr){
		if($.isArray(arr) && arr.length>0) return true;
		return false;
	},
	isValidObject:function(obj){
		return !$.isEmptyObject(obj);
	}
});
/////////////////////////////////////////////////////////////通用函数结束/////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////处理form开始/////////////////////////////////////////////////////////////
function formGenerator(obj){
	if(obj && !$.isEmptyObject(obj) && obj.container){
		var $container = typeof obj.container == "string" ?  $("#"+obj.container) : obj.container;
		//$container.addClass("tab-pane clearfix active");
		if(obj.columns && obj.columns.length>0){
			for(var i=0;i<obj.columns.length; i++){
				if(obj.columns[i]) $container.append(getInputByType(obj.columns[i],4,5));
			}
		}
		return $container;
	}
}
//根据类型获取input
function getInputByType(column,sm,xs){
	var required = column.required;
	if(required==null && $.isValidObject(column.validate)) required = column.validate.required;
	
	var prefix = '<div class="form-group col-sm-'+(sm||column.sm||12)+'"><label class="col-xs-'+(xs||column.xs||0)+' control-label">'+(required?'<span class="text-danger req">*&nbsp;</span>':'')+ column.label + ':</label><div class="col-xs-'+(12-(xs||column.xs||0))+'">',input='',suffix='</div></div>';
	var type = $.trim(column.type || 'text');
	switch(type){
		case 'text':
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm"/>';
			break;
		case 'select':
			var array = ['<select name="'+column.col+'" class="form-control input-sm">'];
			if(column.options && column.options.length>0){
				for(var i=0;i<column.options.length;i++) array.push('<option value="'+column.options[i].value+'"'+(column.options[i].selected ? ' selected' : '')+'>'+column.options[i].text+'</option>');
			}
			input = array.join('') + '</select>';
			break;
		case 'radio':
			break;
		case 'checkbox':
			break;
		case 'date':
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" onclick="WdatePicker();"/>';
			break;
		case 'file':
			input = '<input type="file" name="'+column.fil+'" class="file inputBtn"/>';
			break;
		default:
			//不处理
			break;
	}
	return prefix + input + suffix;
}
/////////////////////////////////////////////////////////////处理form结束/////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////JQuery提示开始/////////////////////////////////////////////////////////////
/*
@athor:周小建
@time:2012-12-04 10:30:00
@description:定义一个jquery验证中有关消息的poshytip的选项集合，专门为了验证消息的配置使用
*/
//首先定义一个选项集合
var poshytipBasicConfig = {
	//content: text,
	className: 'tip-yellowsimple',
	showOn: 'none',
	alignTo: 'target',
	alignX: 'right',
	//offsetX: inputId == "yzm" ? 125 : 5,
	offsetX: 5,
	alignY: 'center'
};

/*
@athor:周小建
@time:2012-12-04 11:00:00
@description:将两个选项集合进行合并，专门为了每个具体输入框的验证消息配置，这个方法需要在每个输入框中都调用一次，一般用在循环体中
*/
function getPoshytipConfig(idOrName,text){
	var empty = {};
	var poshytipXConfig = typeof getPoshytipXConfig == "function" ? getPoshytipXConfig(idOrName) : {};
	var poshytipYConfig = typeof getPoshytipYConfig == "function" ? getPoshytipYConfig(idOrName) : {};
	return $.extend(empty,poshytipBasicConfig,{content:text},poshytipXConfig,poshytipYConfig);
}

/*
@athor:周小建
@time:2012-12-04 11:30:00
@description:显示提示信息
*/
function togglePoshytip(idOrName,message,timeout){
	function togglePoshytipTool(){
		/*
		if(messageArray){
			for(var i in messageArray){
				$(".tip-yellowsimple:contains('" + messageArray[i] + "')").remove();
			}
		}else{
			$(".tip-yellowsimple").remove();
		}
		*/
		if(idOrName != null && message != null){
			var $obj = $("#" + idOrName);
			if($obj.length <= 0) $obj = $(":input[name='" + idOrName + "']").eq(0);
			$obj.poshytip('destory');
			$obj.poshytip(getPoshytipConfig(idOrName,message));
			$obj.poshytip('show');
			//selectInputText($obj.get(0));
		}
	}
	if(timeout){
		setTimeout(togglePoshytipTool,timeout);
	}else{
		togglePoshytipTool();
	}
}
/////////////////////////////////////////////////////////////JQuery提示结束/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////JQuery验证配置开始/////////////////////////////////////////////////////////////
/*
@athor:周小建
@time:2012-12-04 11:30:00
@description:全局验证消息
*/
var globalValidateMessageConfig={
	required:"不可为空",
	num:"必须是合法数字",
	validcharnum:"须是字母数字下划线组合",
	min:"最小{0}",
	max:"最大{0}",
	minlength:"最短{0}个字符",
	maxlength:"最长{0}个字符",
	equalTo:"必须与{0}相等",
	dateformat:"格式非法",
	range_other:"应是{0}",
	range:"应在{0}和{1}之间",
	rangelength_other:"长度应是{0}",
	rangelength:"长度应在{0}和{1}之间",
	age:"只能是合法数值",
	invalid:"非法",
	le:"不能大于{0}",
	ge:"不能小于{0}",
	tel:"非法",
	mobile:"非法",
	ip:"非法",
	qq:"非法",
	email:"非法",
	invalid:"非法"
};

/*
@athor:周小建
@time:2012-12-04 11:10:00
@description:定义默认的输入框验证消息的配置
*/
//之所以没有将这段代码放入公共包中，是因为涉及到具体气泡地方需要自定义
if(typeof $.validator!="undefined")
$.validator.setDefaults({
	showErrors: function(errorMap, errorList){
		$(".tip-yellowsimple").remove();
		this.defaultShowErrors();
		for(var i = 0;this.errorList[i];i++){
			var error = this.errorList[i];
			$(error.element).poshytip("destroy");
			var $target = $(error.element);
			if($target.is(":hidden")) $target = $target.prevAll("input").eq(0);
			//$(error.element).poshytip($.extend(options,{content:error.message,offsetX:error.element.id=="yzm"?125:5}));
			//$(error.element).poshytip($.extend(options,{content:error.message,offsetX:getX(error.element.id)}));
			//$target.poshytip(getPoshytipConfig(error.element.id||error.element.name,error.message));//如果有了dom对象或其jQuery对象则最好直接使用而不用id或name
			$(error.element).poshytip(getPoshytipConfig(error.element.id,error.message));
			$(error.element).poshytip("show");
			$(error.element).nextAll("em,span.glyphicon-ok").remove();
		}
		for(var i = 0;this.successList[i];i++){
			var success = this.successList[i];
			$(success.element).poshytip("destroy");
			//$(success.element).nextAll("span.glyphicon-remove").remove();
			//$(success.element).nextAll("em.error").remove();
		}
	}
});

/*
@athor:周小建
@time:2012-12-04 10:10:00
@description:定义JQuery验证提示信息的扩展配置，主要用在JQuery验证的全局配置选项中
*/
var validateExtendConfig = {
	errorClass : "invalidField",
	errorElement: "em",
	/*
	errorPlacement : function(error,element){
		var $siblings = element.nextAll("font");
		var $lastSiblings = $siblings.eq($siblings.length - 1);
		$lastSiblings.text(error.text());//替换原来的提示信息
	},
	*/
	errorPlacement: function(error,element){
		//Add the `help-block` class to the error element
		error.addClass("help-block");
		//Add `has-feedback` class to the parent div.form-group
		//in order to add icons to inputs
		//element.parents(".col-sm-5").addClass("has-feedback");
		element.closest("div").addClass("has-feedback");
		if(element.prop("type") === "checkbox"){
			error.insertAfter(element.parent("label"));
		}else{
			error.insertAfter(element);
		}
		//Add the span element,if doesn't exists,and apply the icon classes to it.
		/*
		if(!element.next("span")[0]){
			$("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
		}
		*/
		if(!element.nextAll( "span.glyphicon-remove" )[0]){
			$("<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
		}
	},
	success: function(label,element){
		//Add the span element,if doesn't exists,and apply the icon classes to it.
		/*
		if(!$(element).next("span")[0]){
			$("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
		}
		*/
		if(!$( element).next("span.glyphicon-ok")[0]){
			$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter($(element));
		}
		$(element).nextAll("span.glyphicon-remove").remove();
		$(element).nextAll("em").remove();
		$(element).poshytip("destroy");
	},
	highlight: function(element, errorClass){
		/*
		if(isFormSubmit){//如果是表单提交时触发的验证，则执行输入框闪动效果，如果是其它状况下的触发，则不执行
			if(!firstInvalidObj){//因为这个方法有可能会执行多次（只要发现一次错误就会执行一次），所以只将第一个错误项记录下来，并等待form验证失败后执行获取焦点操作
				firstInvalidObj = element;
			}
			$(element).fadeOut(function(){
				$(element).fadeIn()
			})
		}else{
			setTimeout(function(){
			//selectInputText(element);
			text_onfocus(element);
			},1);
		}
		*/
		//$(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
		$(element).closest("div").addClass("has-error").removeClass("has-success");
		$(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
		setTimeout(function(){
			//selectInputText(element);
			text_onfocus(element);
		},1);
	},
	unhighlight: function(element,errorClass,validClass){
		//$(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
		$(element).closest("div").addClass("has-success").removeClass("has-error");
		$(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
	}
}

var validateStandardConfig = {rules:{},messages:{}};

/*
@athor:周小建
@time:2010-12-04
@description:   这些处理是为了兼容多种情况，是非常重要的程序处理过程，里面包含了典型的数据结构转换和明确的程序思维逻辑，很值的看到这些代码的朋友进行查看和研究。
				不论用户有没有自定义基本选项集合，也不论定义中是否包含rules和messages，也不管字段的键是不是beanName.fieldName格式，都可以正常使用。
				如果用户自定义基本选项集合已经是标准集合，则将用户已经配置好的各个选项信息直接赋值过来进行使用，
				如果用户自定义基本选项集合中仅仅是短字段名格式，则直接将其改写为长字段名格式。
				如果用户自定义基本选项集合中没有rules或messages，则根据已有配置信息进行动态构建。
				也就是说，允许用户进行最简化、标准化、短字段名、长字段名、有message、无messages各种情况的随意的配置，这段程序都可以对其进行兼容方式的处理。
				也正因此，就加大了这段兼容程序的难度，必须考虑好多种因素，必须兼顾各种可能，而且代码尽可能的通用化、简洁化、标准化，既要正确、完善，还要高效、优雅、灵活、巧妙，
				一段程序逻辑的实现不但是一种技术，同时也是一种艺术。
				由于时间和精力的关系，这段实现代码只能达到尽可能的高效和优雅，必然还会有一些细微方面的缺陷和不足，我会在以后时间和精力允许情况下进行精化、细化、美化。
				参数示例：
				validateBasicConfig : {
					"userCode" :{
						required : true,//非空
						characterNum:true,//非法字符
						maxlength:40
					},
					"loginName":{
						required:true,
						//notStrictSpecChar:true,
						maxlength:40
					},
					"userName":{
						required:true,
						//characterNum:true,
						maxlength:60
					},
					"password":{
						required : true,
						characterNum:true,
						maxlength:10
					},
					"password2":{
						required : true,
						characterNum:true,
						maxlength:10,
						strEQInput:"password"
					},
					"birthday":{
						required : true,
						strictDate:true
					},
					"email":{
						email:true,
						maxlength:32
					},
					"cellphone":{
						mobile:true,
						maxlength:255
					},
					"address":{
						required:true,
						maxlength:600
					}
				}
*/
function getRealValidateStandardConfig(config,$insertOrUpdateForm){
	var validateBasicConfig = {};
	//先从config.columns的每个column中抽取其validate项，再覆盖合并到config.validateBasicConfig中，从而完成临时变量validateBasicConfig。
	if($.isValidArray(config.columns)){
		for(var i=0;i<config.columns.length;i++){
			var column = config.columns[i];
			var validate = column.validate;
			if(validate==null)validate = {};
			if(column.required)validate.required = true;
			if($.isValidObject(column) && $.isValidString(column.col) && $.isValidObject(validate)){
				var fieldName = $.trim(column.col);
				var originalValidate = validateBasicConfig[fieldName];
				if(originalValidate==null) validateBasicConfig[fieldName] = originalValidate = {};
				$.extend(true,originalValidate,validate);
				originalValidate["fieldText"] = $.trim(column.label);
			}
		}
	}
	if($.isValidObject(config.validateBasicConfig)) validateBasicConfig = $.extend(true,{},config.validateBasicConfig,validateBasicConfig);
	
	if($.isValidObject(validateBasicConfig)){
		for(var itemKey in validateBasicConfig){//itemKey为字段名
			var itemValue = validateBasicConfig[itemKey];
			if($.isValidString(itemValue)){//如果为username: "required"这样的直接配置则将字符串值转变为对象方便后续统一处理
				var obj = {};
				obj[itemValue] = true;
				itemValue = obj;
			}
			itemKey = $.trim(itemKey);
			var newItemKey = itemKey;
			var fieldName = itemKey;
			
			var fieldText = null;
			var tempFieldText = validateBasicConfig[fieldName]["fieldText"];//有可能用户提供的集中验证配置中内置了label
			if($.isValidString(tempFieldText)){
				fieldText = $.trim(tempFieldText);
				delete validateBasicConfig[fieldName]["fieldText"];
			}else{
				fieldText = getFieldText(fieldName,config,$insertOrUpdateForm);
			}
			
			if(!$.isEmptyObject(validateStandardConfig.rules[fieldName])){
				$.extend(true,validateStandardConfig.rules[newItemKey],validateStandardConfig.rules[fieldName]);
				delete validateStandardConfig.rules[fieldName];
			}else if($.isEmptyObject(validateStandardConfig.rules[newItemKey])){
				validateStandardConfig.rules[newItemKey] = itemValue;
			}
			
			for(var itemChildKey in itemValue){
				var itemChildValue = itemValue[itemChildKey];
				if(itemChildKey=="rangelength" && !$.isArray(itemChildValue)){
					itemValue[itemChildKey] = [itemChildValue,itemChildValue];
					break;
				}
			}
			
			validateStandardConfig.messages[newItemKey] = {};
			//var valueParamSpecialKeys = ["min","max","lt","le","gt","ge","minlength","maxlength"];
			var valueParamSpecialKeys = ["min","max",
			"strEQVal","strNEVal","strGTVal","strGEVal","strLTVal","strLEVal","strGMVal","strGHVal","strLMVal","strLHVal",
			"lenEQVal","strNEVal","lenGTVal","lenGEVal","lenLTVal","lenLEVal",
			"numEQVal","numNEVal","numGTVal","numGEVal","numLTVal","numLEVal",
			"dateEQVal","dateNEVal","dateGTVal","dateGEVal","dateLTVal","dateLEVal"];
			var inputParamSpecialKeys = ["equalTo",
			"strEQInput","strNEInput","strGTInput","strGEInput","strLTInput","strLEInput","strGMInput","strGHInput","strLMInput","strLHInput",
			"lenEQInput","lenNEInput","lenGTInput","lenGEInput","lenLTInput","lenLEInput",
			"numEQInput","numNEInput","numGTInput","numGEInput","numLTInput","numLEInput",
			"dateEQInput","dateNEInput","dateGTInput","dateGEInput","dateLTInput","dateLEInput"];
			function existsInArray(source,array){
				if(source==null || typeof source!="string" || $.trim(source).length==0 || !$.isArray(array) && array.length==0) return false;
				source = $.trim(source);
				for(var i=0;i<array.length;i++){
					var item = array[i];
					if(item==null || typeof item!="string" || $.trim(item).length==0)continue;
					if(source==$.trim(item)) return true;
				}
				return false;
			}
			for(var itemChildKey in itemValue){
				var itemChildValue = itemValue[itemChildKey];
				itemChildKey = $.trim(itemChildKey);
				var tempValidateMessage = jQuery.validator.messages[itemChildKey];
				if(existsInArray(itemChildKey,valueParamSpecialKeys)){
					if($.isValidString(itemChildValue))tempValidateMessage = tempValidateMessage.replace("{0}",itemChildValue);
					else if($.isValidArray(itemChildValue)){
						$.each(itemChildValue,function(i,n){
							tempValidateMessage = tempValidateMessage.replace(new RegExp("\\{" + i + "\\}", "g"),function(){
								return n;
							});
						});
						var regexpStr = "\\{\\d+?\\}";
						if(new RegExp(regexpStr,"g").test(tempValidateMessage)){
							tempValidateMessage = tempValidateMessage.replace(new RegExp(regexpStr,"g"),"").replace("加","");
						}
					}
				}else{
					if(itemChildKey=="range" || itemChildKey=="rangelength"){//最特殊情况
						var tempFirstVal = $.isArray(itemChildValue) ? $.trim(itemChildValue[0]) : itemChildValue;
						var tempSecondVal = $.isArray(itemChildValue) ? $.trim(itemChildValue[1]) : null;
						if(isNaN(tempFirstVal) || (tempSecondVal && isNaN($.trim(tempSecondVal)))){
							$.messager.alert("系统提示",itemKey + "的" + itemChildKey + "验证配置的参数必须为数字");
							return false;
						}
						if(!tempSecondVal || tempFirstVal==tempSecondVal){
							tempValidateMessage = tempValidateMessage.substring(0,tempValidateMessage.indexOf("{0}")+3).replace("在","为");
							tempValidateMessage = tempValidateMessage.replace("{0}",tempFirstVal);
						}else{
							tempValidateMessage = tempValidateMessage.replace("{0}",tempFirstVal<=tempSecondVal?tempFirstVal:tempSecondVal);
							tempValidateMessage = tempValidateMessage.replace("{1}",tempFirstVal<=tempSecondVal?tempSecondVal:tempFirstVal);
						}
					}else if(existsInArray(itemChildKey,inputParamSpecialKeys)){
						var tempValue = $.isValidString(itemChildValue)? itemChildValue : itemChildValue[0];
						tempValidateMessage = tempValidateMessage.replace("{0}","【<font color='red'>" + getFieldText(tempValue.replace(/^[^\w]*/ig,""),config,$insertOrUpdateForm).replace(/[:：\s]*$/,"") + "</font>】");
					}
				}
				tempValidateMessage = "【<font color='red'>" + fieldText + "</font>】" + tempValidateMessage;
				validateStandardConfig.messages[newItemKey][itemChildKey] = tempValidateMessage;
			}
		}
	}
	return validateStandardConfig;
}

/*
@athor:周小建
@time:2010-12-04
@description:为表单注册验证配置，这是外部调用时的最外层接口。
*/
function registerValidate($insertOrUpdateForm,config){
	if($insertOrUpdateForm!=null && !$.isEmptyObject(config)){
		if($.isValidString($insertOrUpdateForm)){
			$insertOrUpdateForm = $.trim($insertOrUpdateForm);
			var $form = $("#"+$insertOrUpdateForm);
			if($form.length==0){
				$form = $("form[name='" + $insertOrUpdateForm + "']");
				if($form.length==0) return;
			}
			$insertOrUpdateForm = $form.eq(0);
		}else if($insertOrUpdateForm instanceof jQuery){
			if($insertOrUpdateForm.length==0)return;
			$insertOrUpdateForm = $insertOrUpdateForm.eq(0);
		}else if(typeof $insertOrUpdateForm == "object"){
			$insertOrUpdateForm = $($insertOrUpdateForm);
			if($insertOrUpdateForm.length==0) return;
			$insertOrUpdateForm = $insertOrUpdateForm.eq(0);
		}
		$insertOrUpdateForm.validate($.extend(true,getRealValidateStandardConfig(config,$insertOrUpdateForm),validateExtendConfig));
	}
}
/////////////////////////////////////////////////////////////JQuery验证配置结束/////////////////////////////////////////////////////////////
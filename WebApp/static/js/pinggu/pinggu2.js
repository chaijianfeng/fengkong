	//添加
	$(document).on("click", "#sosuo", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加供货商信息",
			area : [ "70%", "65%" ],
			content : "../../pages/gonghuo/pinggu/add.html"
		});
	});
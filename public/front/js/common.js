mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


function getSearch(k){
	// 获取地址栏数据
	var str=location.search;
	// 加码转中文
	str=decodeURI(str);
	// 截取第一个？好
	str=str.slice(1);
	// 截取每一个&
	var arr=str.split('&');
	// 申明对象
	var obj={};
	// 遍历数组转对象
	arr.forEach(function(v,i){
		var key=v.split("=")[0];
		var value=v.split('=')[1];
		obj[key]=value;
		// console.log(obj);
		
	})
	// 返回值
	return obj[k];
	
}
		
		

	
	
	
	
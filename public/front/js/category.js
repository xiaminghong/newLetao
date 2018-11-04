$(function(){
// 一级分类模块
 $.ajax({
	 type:'get',
	 url:'/category/queryTopCategory',
	 dataType:'json',
	 success:function(info){
		 console.log(info);
		 var htmlStr=template('left_tpl',info);
		 
		 $('.lt_category_left ul').html(htmlStr);

		 renderId(info.rows[0].id);
	 }
 })

//  一级分类点击

$('.lt_category_left ul').on('click','a',function(){
	var id=$(this).data('id');	
	console.log(id);
	renderId(id);
	$(this).addClass('current').parent().siblings().find('a').removeClass('current');
})


//  二级分类
	function renderId(id){
		$.ajax({
			type:'get',
			url:'/category/querySecondCategory',
			data:{
				id:id
			},
			dataType:'json',
			success:function(info){
				console.log(info);
				var htmlStr=template('right_tpl',info);
				$('.lt_category_right ul').html(htmlStr)
				
			}
		})
	}

})
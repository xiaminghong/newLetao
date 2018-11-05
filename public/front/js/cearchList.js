$(function(){
  var key=getSearch("key");
  // console.log(key);
  $('.search_input').val(key);

  rander();
  // 渲染
 function rander(){

    var obj={};
    obj.proName=$('.search_input').val()
    obj.page=1;
    obj.pageSize=100;
    // 判断是否高亮
    var current=$('.lt_sort a.current');
    // console.log(current.length);
    // 大于0高亮
    if (current.length>0) {
      // 获取是价格还是库存
      var sortName=current.data('type');
      // 判断是升还是降
      var sortVlaue=current.find('i').hasClass('fa-angle-down')?2:1;
      obj[sortName]=sortVlaue;
      
    }
    
   $('.lt_product').html('<div class="loading"></div>')
  setTimeout(function(){
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:obj,
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr=template('search_tpl',info);
        $('.lt_product').html(htmlStr)
        
      }
    })
  },1000)
 } 

 
 $('.btn_search').click(function(){
  rander();
 })

 $('.lt_sort a[data-type]').click(function(){

      if ($(this).hasClass('current')) {
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        
      }else{
        $(this).addClass('current').siblings().removeClass('current');

      }
      rander();
 })



  
})
$(function(){
  
  $.ajax({
    type:'get',
    url:'/cart/queryCart',
    dataType:'json',
    success:function(info){
      console.log(info);
      
      
      var htmlStr=template('cart_tpl',{list:info});
      $('.lt_main .mui-scroll').html(htmlStr);
      
    }
  })
})
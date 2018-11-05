$(function(){
  
  $.ajax({
    type:'get',
    url:'/cart/queryCart',
    dataType:'json',
    success:function(info){
      console.log(info);
      if (info.error==400) {
        location.href='login.html?retUrl='+location.href;
      }
      
      if (info.success) {
        var htmlStr=template('cart_tpl',{list:info});
      $('.lt_main .mui-scroll').html(htmlStr);
      }
      
      
    }
  })
})
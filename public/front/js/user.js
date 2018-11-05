$(function(){
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      console.log(info);
      if (info.error==400) {
        location.href='login.html'
      }
        var htmlStr=template('user_tpl',info);
        $('.lt_main .mui-scroll').html(htmlStr);
    }
  })

  $('.mui-scroll').on('click','#logout',function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if ( info.success ) {
          // 退出成功, 跳转到登录页
          location.href = "login.html";
        }
        
      }
    })    
  })
})
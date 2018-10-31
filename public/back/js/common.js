 



$(document).ajaxStart(function(){
  NProgress.start(); 
})
$(document).ajaxStop(function(){
  NProgress.done();
})
  

$(function(){
  // 二级分类
  $('.nav .category').on('click',function(){
   $(this).next().stop().slideToggle();
  })
  // 菜单
  $('.icon_menu').on('click',function(){
    $('.lt_aside ').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topber').toggleClass('hidemenu');
    
  })
  // 退出
  $('.icon_logout').on('click',function(){
    $('#logoutModal').modal("show");
    
  })
  $('#logoutBtn').click(function(){
      $.ajax({
        type:"get",
        url: "/employee/employeeLogout",
        dataType: "json",
        success:function(info){
          console.log(info);
          if(info.success){
            location.href="login.html";
          }
        }
      })    
  })



})
$(function(){
  var productId = getSearch( "productId" );
  console.log(productId);
  

  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:productId
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var htmlStr=template('product_tpl',info);
      $('.lt_main .mui-scroll').html(htmlStr);

      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:4000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      mui('.mui-numbox ').numbox()
      
    }
  })
  // 点击码数，添加current
  $('.lt_main .mui-scroll').on('click','.lt_size span',function(){
    
      $(this).addClass('current').siblings().removeClass('current');   
  })

  $('#addCart').click(function(){
        // 尺码
        var size=$('.lt_size span.current').text();
        // 数量
        var num=$('.mui-numbox-input').val();
        if (!size) {
          mui.toast('请选择尺码');
          return; 
        }

        console.log(size);
        console.log(num);
        
        $.ajax({
          type:'post',
          url:'/cart/addCart',
          data:{
            productId:productId,
            size:size,
            num:num
          },
          dataType:'json',
          success:function(info){
            console.log(info);

            if(info.error==400){
              location.href="login.html?retUrl="+location.href;
            }
            if (info.success) {
              mui.confirm('添加成功','温馨提醒',['去购物车','接续浏览'],function(e){
                
                if (e.index==0) {

                  location.href="cart.html";
                }
              })
            }
            
          }
        })
  })

})
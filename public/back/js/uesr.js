
$(function(){

  var currentPage=1;
  var pageSize=5;
  var currentId;
  var isDelete;
  render();
 function render(){
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:'json',
    success:function(info){
      // console.log(info);
      var htmlStr=template('tmp',info);
      $('tbody').html(htmlStr);

      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:info.page,
        totalPages:Math.ceil( info.total / info.size ),
        onPageClicked:function(a,b,c,page){
          currentPage=page;
          render();
        }
      })
    }
  })
 }

 $('tbody').on('click','.btn',function(e){
   $('#userModal').modal('show');
   currentId=$(this).parent().data('id');
   isDelete=$(this).hasClass('btn-danger')?0:1;
  //  console.log(isDelete);
      
   
 })
 $('#submitBtn').click(function(){
   $.ajax({
       type:"post",
       url:"/user/updateUser",
       data:{
         id:currentId,
         isDelete:isDelete,
       },
       dataType:"json",
       success:function(info){
        $('#userModal').modal('hide'); 
        currentPage==1;
        render();
        
       }
  })

 })

 
})
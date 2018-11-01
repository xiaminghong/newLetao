$(function(){

  var currentPage=1;
  var pageSize=5;
  render();
 function render(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template('first',info);
      $("tbody").html(htmlStr);
      $('#firstPage').bootstrapPaginator({
       bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
       currentPage:info.page,//当前页
       totalPages:Math.ceil(info.total/info.size),//总页数
       onPageClicked:function(event, originalEvent, type,page){

        currentPage=page;
        render();
      }
     
      })
    }
  }) 
 }
//  点击事件

  $('.addBtn').click(function(){
    $('#firstModel').modal('show');
  })


  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
      fields: {
        categoryName: {
            validators: {
                notEmpty: {
                    message: '请输入一级分类'
                },
            }
        }
    }
  
  })
  $('#form').on('success.form.bv',function(e){
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        $('#firstModel').modal('hide');
        render();
        
      }
    })  
  })




//  入口函数 
})


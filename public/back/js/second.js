$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
 function render(){
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: 'json',
    success: function (info) {
      // console.log(info);
      // var htmlStr=template('second',info);
      var htmlStr = template('secondT',info)
      $('tbody').html(htmlStr);
      $('#second').bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage=page;
          render();
        }
      
      
      })
    }
  })
 }

 $('.addSecond').click(function(){
   $('#secondModal').modal('show');
   $.ajax({
     type:'get',
     url:'/category/queryTopCategoryPaging',
     data:{
       page:1,
       pageSize:100
     },
     
     dataType:'json',
     success:function(info){
       console.log(info);
       var htmlStr=template('dropdownTpl',info);
       $('.dropdown-menu').html(htmlStr);
       
     }
   })
 })

//  事假委托
$('.dropdown-menu').on('click','a',function(){
var txt=$(this).text();
$('#dropdownText').text(txt);
var id = $(this).data("id");
console.log(id);
$('[name="categoryId"]').val( id );

})


$('#fileupload').fileupload({
  dataType:'json',
  done:function(e,data){
    console.log(data.result.picAddr);
    var picUrl=data.result.picAddr;
    $('#imgBox img').attr('src',picUrl);
    
    $('[name="brandLogo"]').val(picUrl);



    $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
  }
})



// 停顿////////////
$('#form').bootstrapValidator({
  // 对任意配置了的 input 都进行校验
  excluded: [],

  // 配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove',   // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },

  fields: {

    // categoryId 选择一级分类
    categoryId: {
      validators: {
        notEmpty: {
          message: "请选择一级分类"
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: "请输入二级分类名称"
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: "请选择图片"
        }
      }
    }

  }
});

$('#form').on('success.form.bv',function(e){
  e.preventDefault();
  $.ajax({
    type: "post",
    url: "/category/addSecondCategory",
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      console.log(info);
      $('#secondModal').modal('hide');
      currentPage = 1;
      render();
      $('#form').data("bootstrapValidator").resetForm(true)
      $('#dropdownText').text('请选择一级分页');
      $('#imgBox img').attr('src','./images/default.png')
    }
  })
})











})
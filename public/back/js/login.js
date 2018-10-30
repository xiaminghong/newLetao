

$(function(){
    /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */


$('#form').bootstrapValidator({

   // 配置图标
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove',   // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },
    //  字段
    fields:{
      // 名字
      username:{
        // 验证
        validators: {
          // 非空校验
          notEmpty: {
            // 非空提示
            message: "用户名不能为空"
          }
          ,stringLength:{
            min:2,
            max:6,
            message:"长度为2-6位"
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度为6-12位'
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
    
   })

     /*
  * 2. 登录功能
  *    表单校验插件会在表单提交时进行校验, 如果希望通过 ajax 提交
  *    可以注册表单校验成功事件, 在事件中, 阻止默认的跳转提交, 通过 ajax 进行提交
  * */
 $('#form').on('success.form.bv',function(e){
   e.preventDefault();
  $.ajax({
    type:"post",
    data:$('#form').serialize(),
    url:"/employee/employeeLogin",
    dateType:"josn",
    success:function(info){
      console.log(info);
      if (info.success) {
        location.href="index.html";
      }
      if (info.error==1000) {
        // alert( info.message );
         // 参数1: 校验字段
          // 参数2: 校验状态  NOT_VALIDATED未校验, VALIDATING校验中, INVALID校验失败 or VALID成功
          // 参数3: 配置校验规则, 用于配置提示信息
        $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
      }
      if(info.error==1001){
        // alert( info.message );
        $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
      }
    }
  })   
 })
  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm(true);
  })
})
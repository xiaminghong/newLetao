

$(function(){
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
  },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'你输入的用户名为空'
          },
          stringLength:{
            min:2,
            max:6,
            message:'用户名为2-6位'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'你输入的密码为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码为6-12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:"josn",
      success:function(info){
        console.log(info);
        if (info.success) {
          location.href='index.html'
        }
        if(info.error===1000){
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if (info.error===1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
        
      }
    })
  })
  $('[type="reset"]').click(function(){
    
    $('#form').data('bootstrapValidator').resetForm(true);

  })


})


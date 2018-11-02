$(function () {

  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];
  render();

  // 渲染
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('productTpl', info);
        // console.log(htmlStr);
        $('tbody').html(htmlStr);

        $("#progressPg").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, page) {
            // 当前页等于点击页
            currentPage = page;
            render();
          }
        });

      }
    })
  }

  // 模态框显示  模板引擎
  $('#addPtodt').click(function () {
    $('#addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('branchTpl', info);
        $('.dropdown-menu').html(htmlStr);


      }
    })

  })
  // 事件委托a标签 下拉菜单
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    // console.log(txt);
    $('#addSeconded').text(txt);

    var id = $(this).data('id');
    console.log(id);
    $('[name="brandId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');

  })

  // 文件（图片）上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var picObj = data.result;

      var picUrl = picObj.picAddr;
      picArr.unshift(picObj)
      console.log(picArr);

      // 将图片路径设置给 img src 并添加到 imgBox的子元素最前面
      $('#imgBox').prepend('<img src="' + picUrl + '" alt="">')
      // 下面这种只能放一个，会覆盖
      // $('#imgBox img').attr('src',picAddr);
      if (picArr.length>3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if(picArr.length==3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }
  })



  // 验证是否为空等
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },

        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品名称'
          },

        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          },

        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式要求是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },

        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          },
        }
      },
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传3张图片 '
          },
        }
      },
    }

  })

  // 阻止默认跳转 ajax传后台
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

   var params= $('#form').serialize();
   console.log(params);
  //  brandId=1&num=2
  // &picAddr1=xx&picName1=xx
    // params+="&picAddr1=xx&picName1=xx";
   params+="&picAddr1="+picArr[0].picAddr+"&picName1="+picArr[0].picName;
   params+="&picAddr2="+picArr[1].picAddr+"&picName2="+picArr[1].picName;
   params+="&picAddr3="+picArr[2].picAddr+"&picName3="+picArr[2].picName;
   console.log(params);
   
   
    $.ajax({
      type:"post",
      url:'/product/addProduct',
      data:params,
      dataType:'json',
      success:function(info){
        console.log(info);
        currentPage=1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#addModal').modal('hide');
        $('#addSeconded').text('添加二级分类');
        $('#imgBox img').remove();
        
      }
    })
  })










})
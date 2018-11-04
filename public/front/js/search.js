$(function () {

  render()
  // 查看本地localStorage
  function getHistory() {
    var jsonStr = localStorage.getItem('search_list') || '[]';
    // console.log(jsonStr);
    var arr = JSON.parse(jsonStr);

    return arr;
  }

  // 渲染
  function render() {
    var arr = getHistory();
    var htmlStr = template('search_tpl', {list: arr});
    $('.lt_history').html(htmlStr);
  }


  // 点击全清除
  $('.lt_history').on('click', '.btn-del', function () {
    //clear 太暴力
    // localStorage.clear();
    // 模态框
    mui.confirm('你确定要删除历史记录吗？', '温馨提醒', ['取消', '确定'], function (e) {

      if (e.index == 1) {
        localStorage.removeItem("search_list");
        render();

      }
    })


  })

  // 单个点击清除
  $('.lt_history').on('click', '.btn_delete', function () {
    var index = $(this).data('index');
    // console.log(index);
    var arr = getHistory()
    console.log(arr);
    arr.splice(index, 1);
    // 截取后的数重新设置回本地
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();

  })
  // 添加功能

  $('.lt_search .mui-btn').click(function(){
    var key=$('.search_input').val().trim();
    // console.log(key);
    // 判断是否为空
    if (key==='') {
      mui.toast('请输入关键字');
      return;
    }
    var arr=getHistory();
    // console.log(arr);
    var index=arr.indexOf(key);
    console.log(index);
    if (index!=-1) {
      arr.splice(index,1)
    }
    if (arr.length>=10) {
      arr.pop();
    }
    


    arr.unshift(key);

    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    $('.search_input').val('');
     
    location.href="searchList.html";
    
  })


})
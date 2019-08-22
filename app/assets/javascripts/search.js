$(function() {
  
  var search_user = $("#user-search-result");
  var selected_list = $("#chat-group-users");
  function appendList(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_user.append(html);
    }

  function appendUser(id,name) {
    var html = `<div class='chat-group-user'>
    <input name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  selected_list.append(html)
  }

    function appendErrMsgToHTML(user) {
      var html = `<div>${user}</div>`
      search_user.append(html); 
    }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(data) {
      $("#user-search-result").empty();
      if (data.length !== 0) {
        data.forEach(function(user){
          appendList(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません")
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました。")
    })
  })
    $(document).on("click",".user-search-add", function() {
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    $(this).parent().remove();
      appendUser(id,name);
  });

  $(document).on("click",".user-search-remove", function() {
    $(this).parent().remove();
  })
})
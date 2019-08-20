$(function(){
  function buildPost(message){
    var img = (message.image.url !== null)? message.image.url : ""
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-info">
                    <div class="upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                      <img class="lower-message__image" src=${img} >  
                    </p>
                  </div>
                </div>`
                return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.messages').append(html);
      $(".new_message")[0].reset();
      $('.message').removeAttr('disabled');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert("エラー");
    })
  })

    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("id");
      var group_id = $('.current-group').data("group-id")
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = ''
        messages.forEach(function(message) {
          insertHTML = buildPost(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert("エラー");
      });
    };

    var group_id = $('.current-group').data("group-id")
    if (location.pathname == `/groups/${group_id}/messages`) {
    setInterval(reloadMessages, 5000);
    }

})
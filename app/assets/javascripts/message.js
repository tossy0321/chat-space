$(function(){
  function buildPost(message){
    var img = (message.image.url !== null)? message.image.url : ""
    var html = `<div class="message">
                  <div class="upper-info">
                    <div class="upper-info__user">
                      ${message.name}
                    </div>
                    <div class="upper-info__date">
                      ${message.date}
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
})
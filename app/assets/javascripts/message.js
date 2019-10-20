$(function() {

  function buildHTML(message) {
  var messageContent = message.content ? `<p class="chat-room__main__box__message__text__letter">
                                            ${message.content}
                                          </p>`
                                       : ""

  var messageImage = message.image ? `<img class="chat-room__main__box__message__text__image" src="${message.image}">`
                                   : ""

  var html = `<div class="chat-room__main__box__message" data-message-id="${message.id}">
                <div class="chat-room__main__box__message__info">
                  <div class="chat-room__main__box__message__info__name">
                    ${message.user_name}
                  </div>
                  <div class="chat-room__main__box__message__info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="chat-room__main__box__message__text">
                  ${messageContent}
                  ${messageImage}
                </div>
              </div>`

    return html;
  }
  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".chat-room__main__box").append(html);
      $('.chat-room__main').animate({scrollTop: $('.chat-room__main')[0].scrollHeight}, 'fast');
      setTimeout(function(){
        $('.wrapper').animate({scrollTop: $('.wrapper')[0].scrollHeight}, 'slow');
      },3000);
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $("#new_message")[0].reset();
      $(".chat-room__post__box__send").removeAttr("disabled");
    })
  })
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $(".chat-room__main__box__message").last().attr('data-message-id');
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {message_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $(".chat-room__main__box").append(insertHTML);
        })
        $('.chat-room__main').animate({scrollTop: $('.chat-room__main')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        console.log('error');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
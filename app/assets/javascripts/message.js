$(function() {

  function buildHTML(message) {
  var messageContent = message.content === '' ? ''
                                              : `<p class="chat-room__main__box__message__text__letter">
                                                  ${message.content}
                                                 </p>`

  var messageImage = message.image === null ? `</div>
                                               </div>` : `<img class="chat-room__main__box__message__text__image" src="${message.image}">
                                                          </div>
                                                          </div>`
                                          
                                          
  var html = `<div class="chat-room__main__box__message">
                <div class="chat-room__main__box__message__info">
                  <div class="chat-room__main__box__message__info__name">
                    ${message.user_name}
                  </div>
                  <div class="chat-room__main__box__message__info__date">
                    ${message.date}
                  </div>
                </div>
                <div class="chat-room__main__box__message__text">
                  ${messageContent}
                  ${messageImage}`

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
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $("#new_message")[0].reset();
      $(".chat-room__post__box__send").removeAttr("disabled");
      $('.chat-room__main').animate({scrollTop: $('.chat-room__main')[0].scrollHeight}, 'fast');
      setTimeout(function(){
        $('.wrapper').animate({scrollTop: $('.wrapper')[0].scrollHeight}, 'slow');
      },3000);
    })
  })
})
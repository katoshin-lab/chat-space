$(function() {

  function buildHTML(message) {
  var html = `<div class="chat-room__main__box__message">
                <div class="chat-room__main__box__message__info">
                  <div class="chat-room__main__box__message__info__name">
                    ${message.user_name}
                  </div>
                  <div class="chat-room__main__box__message__info__date">
                    ${message.date}
                  </div>
                </div>
                <div class="chat-room__main__box__message__text">`
              
    if (message.content!="") {
      html+= `<p class="chat-room__main__box__message__text__letter">
                ${message.content}
              </p>`
    }
    if (message.image!=null) {
      html+= `<img class="chat-room__main__box__message__text__image" src="${message.image}">`
    }
    html+= `</div>
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
      $(".chat-room__post__box__input").val("");
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $(".chat-room__post__box__send").removeAttr("disabled");
      $('.chat-room__main').animate({scrollTop: $('.chat-room__main')[0].scrollHeight}, 'fast');
      setTimeout(function(){
        $('.gr__localhost').animate({scrollTop: $('.gr__localhost')[0].scrollHeight}, 'slow');
      },3000);
    })
  })
})
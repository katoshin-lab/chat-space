$(function() {

  function buildHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }

  function addUser(userId, userName) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }

  function noUser(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          buildHTML(user)
        })
      }
      else {
      noUser('該当のユーザーはいません。');
      }
      if (input.length === 0) {
        $("#user-search-result").empty();
      }
    })
    .fail(function() {
      alert('検索できませんでした。');
    })
  })

  $(document).on('click', ".user-search-add", function(){
    var selectedId = $(this).attr('data-user-id');
    var selectedName =  $(this).attr('data-user-name');
    var addUserHtml = addUser(selectedId, selectedName);
    $(this).parent().remove();
    $("#add-user").append(addUserHtml);
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
})
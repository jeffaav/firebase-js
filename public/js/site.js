
(function (W, D, $) {

    $('#create-user').submit((e) => {
        
        User.create($('#username').val(), $('#password').val());

        return false;
    })


    User.suscribe(data => {
        switch(data.action) {
            case 'added':
                $('#user-list').append(`<li id="${data.key}">${data.val.username}</li>`);
                break;
            case 'changed':
                $(`#${data.key}`).html(data.val.username);
                break;
            case 'removed':
            case 'moved':
                $(`#${data.key}`).remove();
                break;
        }
    })

}(window, document, jQuery))
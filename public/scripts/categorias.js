$('.list-icon').ready(function ($) {

    var menuBtn = $('.list-icon'),
        menu = $('.categorias ul');

    menuBtn.click(function () {

        if (menu.hasClass('list')) {
            menu.removeClass('list');
        } else {
            menu.addClass('list');
        }
    })

});
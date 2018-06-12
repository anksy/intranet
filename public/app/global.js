// left sidebar menu
'use strict';
$(document).on('click', '.side-menu-label', function() {
    if ($('#theme-page-control').hasClass('collapsed-left-sidebar')) {
        if ($(this).hasClass('menu-active')) return;
        else {
            $('.side-menu-label').removeClass("menu-active");
            $(this).addClass('menu-active');
            $('.side-menu-label-body').slideUp();
            $(this).next('.side-menu-label-body').slideDown();
            return;
        }

    }
    if ($(this).hasClass('menu-active')) {
        $(this).removeClass("menu-active");
        $(this).next('.side-menu-label-body').slideUp();
    } else {
        $('.side-menu-label').removeClass("menu-active");
        $(this).addClass('menu-active');
        $('.side-menu-label-body').slideUp();
        $(this).next('.side-menu-label-body').slideDown();
    }
    $('.side-menu-label-1').removeClass("menu-active1");

});

function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

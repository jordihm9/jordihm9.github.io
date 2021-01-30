'use strict'

/**
 * Activate or deactivate burger menu
 */
function slideNav() {
    // slide nav links
    $('.nav-links').toggleClass('active');
    // switch from 3 lines to cross
    $('.burger').toggleClass('cross');
};

/**
 * Auto calculate the age
 * Update the value in the document
 */
function calcAge() {
    const birth = new Date("2001-05-09");
    const today = new Date();

    // difference between years
    let age = today.getFullYear() - birth.getFullYear();
    // difference between months
    let m = today.getMonth() - birth.getMonth();
    // substract -1 if the date of today is before the date and month of birth
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    $('#age').text(age);
}

function init() {
    calcAge();

    $('.burger').click(slideNav);

    // scroll effect when a link is clicked
    $('a').click(function (e) {
        e.preventDefault();
        var dest = 0;
        //calculate destination place
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({
            scrollTop: dest
        }, 1000);
    });
}

$(document).ready(init);
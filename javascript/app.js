'use strict'
const burger = document.querySelector('.burger');
const logoLink = document.querySelector('.logo a');
const readMore = document.querySelector('.read-more');

const slideNav = () => {
    const navLinks = document.querySelector('.nav-links');
    // slide nav links
    navLinks.classList.toggle('nav-active');
    // burger animation to cross
    burger.classList.toggle('cross');
};

const smoothScroll = (element, error) => {
    let href = element.getAttribute('href');
    let target = document.querySelector(href);
    console.log(href, target);
    target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" });
    history.pushState(null, null, href);
    error.preventDefault();
}

const linkPressed = () => {
    const navLink = document.querySelectorAll('.nav-links a');

    for (let link of navLink) {
        link.addEventListener('click', (error) => {
            slideNav(); // close side nav
            smoothScroll(link, error); // scroll to section selected
        });
    }
}

/* calculate age and update it */
const updateAge = () => {
    const ageField = document.querySelector("#age");

    const dateOfBirth = new Date("9/5/2001");
    const today = new Date();

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    let m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
        age = age - 1;
    }

    ageField.innerHTML = age.toString();
}

const app = function () {

    burger.addEventListener('click', () => {
        slideNav();
    });

    linkPressed();

    logoLink.addEventListener('click', (error) => {smoothScroll(logoLink, error)});
    readMore.addEventListener('click', (error) => {smoothScroll(readMore, error)});

    updateAge();
}

app();
/** @format */

'use strict';

let headerMenu = document.querySelector('.header__menu');
let headerDark = document.querySelector('.header__dark');
let iconBurger = document.querySelector('.icon-burger');
let menuClose = document.querySelector('.menu__close');

function toggleMenu() {
  headerMenu.classList.toggle('hidden');
  headerDark.classList.toggle('hidden');
}

iconBurger.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);

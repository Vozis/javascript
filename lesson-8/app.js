/** @format */

'use strict';

let filtersIcon = document.querySelector('.filters-catalog__icon');
let filtersMenu = document.querySelector('.filters-catalog__menu');
let filtersBtn = document.querySelector('.filters-catalog__btn');

filtersBtn.addEventListener('click', function () {
  filtersMenu.classList.toggle('hidden');
});

// filtersBtn.addEventListener('hover', function() {
//     if (filtersIcon.getAttribute('src') === 'img/icon-filter.svg') {
//         filtersIcon.setAttribute('src', 'img/icon-filter--hover.svg')
//     } else {
//         filtersIcon.setAttribute('src', 'img/icon-filter.svg')
//     }
// } );

let filtersMenuItem = document.querySelectorAll('.menu__link--filter');

filtersMenuItem.forEach(function (header) {
  header.addEventListener('click', function (event) {
    event.target.nextElementSibling.classList.toggle('hidden');
  });
});

let filtersPopupSize = document.querySelector('.filter-category__popup--size');
let filtersWrapSize = document.querySelector('.filter-category__wrap--size');

filtersWrapSize.addEventListener('click', function () {
  filtersPopupSize.classList.toggle('hidden');
});

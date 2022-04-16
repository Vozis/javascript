/** @format */
'use strict';

const productCardEls = document.querySelectorAll('.product-card');
const arr = Array.from(productCardEls);

arr.forEach((el) => {
  el.dataset.id = arr.indexOf(el);
  el.dataset.name = el.querySelector('h3').textContent;
  const price = el.querySelector('.product-card__price').textContent;
  const priceNumber = parseInt(price.replace(/[^.\d]/g, ''));
  el.dataset.price = priceNumber;
});

/*
попытался сделать так, чтобы всем объектам добавлялись такие классы, потому что у меня эти товары есть на нескольних страницах сайта и всем писать их трудно, плюс смоделировать более реальную ситуацию 

вопрос: как мне правильно сделать так, чтобы в dataset.id присваивался поряжковый номер карточки ( чтобы на выходе у первой были id = '1' и дальше по порядку)
в интернете нашел только такое: через массив, может как то еще можно 
и моэно ли к начальномк прибавть единицу, чтобы счетчик шел не с 0 ?

убрать $ из цены нашел только через регулярные выражения, а может тоже можно методами, которые мы тут изучили ?
*/

const basketCounterEl = document.querySelector('.icon-cart-wrapper__badge');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.icon-cart-wrapper').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.catalog__list').addEventListener('click', (event) => {
  if (!event.target.closest('.btn--featured')) {
    return;
  }
  const productCard = event.target.closest('.product-card');
  const id = +productCard.dataset.id;
  const name = productCard.dataset.name;
  const price = +productCard.dataset.price;

  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
}

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);

  /*
  const productsArr = Object.values(basket);
  let count = 0;
  for (const product in productsArr) {
    count += product.count;
  }
  return count;
  */
}

function getTotalBasketPrice() {
  return Object.values(basket).reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
}

function renderProductInBasket(id) {
  const basketRowEl = basketEl.querySelector(
    `.basketRow[data-productId="${id}"]`
  );
  basketCounterEl.classList.remove('hidden');
  // чтобы изначально бэйджа не было, но при начале добавления hidden убирался
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }
  basketRowEl.querySelector('.productCount').textContent = basket[id].count;
  basketRowEl.querySelector('.productTotalRow').textContent =
    basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
  const productRow = `
  <div class="basketRow" data-productId="${productId}">
              <div>${basket[productId].name}</div>
              <div>
                <span class="productCount"> ${basket[productId].count} </span>
                шт.
              </div>
              <div>${basket[productId].price}</div>
              <div class="productTotalRow">
                ${basket[productId].price * basket[productId].count}
              </div>
            </div>
            `;
  basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}

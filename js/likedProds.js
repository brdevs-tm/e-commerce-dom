var startingPage = 0;
var limit = 6
var startingValue = document.getElementById('startingValue')
var pages = Math.ceil(likedProds.length / 6)
const paginationRow = document.querySelector('.liked__pagination ul')
const endingValue = document.getElementById('endingValue')
const priceRange = document.querySelectorAll('#priceRange')
var page = 1
const getPagination = () => {
  paginationRow.innerHTML = ''
  paginationRow.innerHTML += `
  <li><button ${page == 1 ? 'disabled' : ''} onclick="getPage('--')"><<</button></li>
  `
  paginationRow.innerHTML += `
  <li><button ${page == 1 ? 'disabled' : ''} onclick="getPage('-')"><</button></li>
  `
  for(i = 1; i <= pages; i++){
    paginationRow.innerHTML += `
    <li><button class="${page == i ? 'active' : ''}" onclick="getPage(${i})">${i}</button></li>
    `
  }
  console.log(pages)
  paginationRow.innerHTML += `
  <li><button ${page == pages ? 'disabled' : ''} onclick="getPage('+')">></button></li>
  `
  paginationRow.innerHTML += `
  <li><button ${page == pages ? 'disabled' : ''} onclick="getPage('++')">>></button></li>
  `
}
const pagination = (data, dataRow) => {
    data.slice(startingPage, startingPage + limit).map(prod => {
        dataRow.innerHTML += `
        <div class="card">
        <div class="card__image">
        <div class="card__image-like">
        <div class="con-like">
      <input onchange="
        likeProductInLiked(${prod.id})
      " title="like" type="checkbox" ${likedProds.find(product => product.id == prod.id) ? 'checked' : ''} class="like">
      <div class="checkmark">
        <svg viewBox="0 0 24 24" class="outline" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
        </svg>
        <svg viewBox="0 0 24 24" class="filled" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        <svg class="celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="10,10 20,20" class="poly"></polygon>
          <polygon points="10,50 20,50" class="poly"></polygon>
          <polygon points="20,80 30,70" class="poly"></polygon>
          <polygon points="90,10 80,20" class="poly"></polygon>
          <polygon points="90,50 80,50" class="poly"></polygon>
          <polygon points="80,80 70,70" class="poly"></polygon>
        </svg>
      </div>
    </div>
        </div>
            <img src='${prod.images[0]}' alt="">
        </div>
        <div class="card__price">
        <div class="card__price-left">
            <h3>${(
              prod.price -
              (prod.price * prod.discountPercentage) / 100
            ).toFixed(2)} ₽</h3>
            <p>С картой</p>
        </div>
        <div class="card__price-right">
            <h3>${prod.price} ₽</h3>
            <p>Обычная</p>
        </div>
    </div>
    <div class="card__about"><h3>${prod.title}</h3>
        <p>${prod.thumbnail}</p>
        </div>
        <div class="card__about-stars">
        ${Array(Math.round(prod.rating))
          .fill(0)
          .map((star) => {
            return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
          }).join("")}${Array(5 - Math.round(prod.rating))
                .fill(0)
                .map((star) => {
                  return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
                })} ${Math.round(prod.rating)}.0
        </div>
    ${
      JSON.parse(localStorage.getItem("cartItems")) == null
        ? `<button onclick="addToCart(${prod.id})">В корзину</button>`
        : JSON.parse(localStorage.getItem("cartItems")).some(
            (el) => el.prod == prod.id
          )
        ? `<div class="card__about-buttons"><button onclick="plusMinusItem(${
            prod.id
          }, 'plus')">+</button><h1>${
            JSON.parse(localStorage.getItem("cartItems")).find(
              (el) => el.prod == prod.id
            ).qty
          }</h1><button onclick="plusMinusItem(${
            prod.id
          }, 'minus')">-</button></div>`
        : `<button onclick="addToCart(${prod.id})">В корзину</button>`
      }
      </div>
      `
    }) 
    getPagination()
  }

pagination(likedProds, document.querySelector('.cards'));

const likeProductInLiked = (id) => {
  likedProds.splice(likedProds.findIndex(prod => prod.id == id), 1)
  document.querySelector('.cards').innerHTML = ''
  pagination(likedProds, document.querySelector('.cards'))
  localStorage.setItem('liked', JSON.stringify(likedProds))
}

startingValue.addEventListener("keyup", function () {
  document.querySelector('.cards').innerHTML = '';
  pages = Math.ceil(likedProds.filter(prod => prod.price >= this.value && prod.price <= endingValue.value).length / 6)
  getPagination()
  pagination(likedProds.filter(prod => prod.price >= this.value && prod.price <= endingValue.value), document.querySelector('.cards'))
})
endingValue.addEventListener("keyup", function () {
  document.querySelector('.cards').innerHTML = '';
  pages = Math.ceil(likedProds.filter(prod => prod.price <= this.value && prod.price >= startingValue.value).length / 6)
  getPagination()
  pagination(likedProds.filter(prod => prod.price <= this.value && prod.price >= startingValue.value), document.querySelector('.cards'))
})
const getPage = (pg) => {
  if(pg === '--'){
    startingPage = 1;
    page = 1;
  } else if(pg === '-'){
    startingPage -= limit
    page -= 1
  } else if(pg === '++'){
    startingPage = pages
    page = pages
  } else if(pg === '+'){
    startingPage += limit
    page += 1
  } else {
    startingPage = (pg * limit) - limit
    page = pg
  }
  getPagination()
  document.querySelector('.cards').innerHTML = ''
  pagination(likedProds.filter(prod => prod.price <= endingValue.value && prod.price >= startingValue.value), document.querySelector('.cards'))
}
priceRange.forEach(rng => rng.addEventListener("change", function () {
  var distance = 10;
  if(priceRange[1].value - priceRange[0].value < distance){
    priceRange[0].value = priceRange[1].value = distance
  } else{

    pages = Math.ceil(likedProds.filter(prod => prod.price <= priceRange[1].value && prod.price >= priceRange[0].value).length / 6)
    console.log(pages)
    startingValue.value = priceRange[0].value
    endingValue.value = priceRange[1].value
  }
  document.querySelector('.cards').innerHTML = ''
  getPagination()
  pagination(likedProds.filter(prod => prod.price <= endingValue.value && prod.price >= startingValue.value), document.querySelector('.cards'))
}))

document.querySelector('.clearFilterInLiked').addEventListener("click", () => {
  startingValue.value = 0;
  endingValue.value = 100;
  priceRange[0].value = 0
  priceRange[1].value = 100
})
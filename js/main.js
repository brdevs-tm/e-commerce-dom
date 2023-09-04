const data = products;
let aksiyaOut = ``;
let yangilikOut = ``;
let mashhurOut = ``;
let cart = [];
let profileImg;
var likedProds = JSON.parse(localStorage.getItem('liked')) || []
if(localStorage.getItem('liked') === null){
  localStorage.setItem('liked', JSON.stringify([]))
}

if (!localStorage.getItem("cartItems") == null) {
  document.querySelector(".cartCount").innerHTML = JSON.parse(
    localStorage.getItem("cartItems")
  ).length;
}
const addToCart = (product) => {
  if (localStorage.getItem("cartItems") == null) {
      cart.push({ prod: product, qty: 1 });
      localStorage.setItem("cartItems", JSON.stringify(cart));
  } else {
    cart = JSON.parse(localStorage.getItem("cartItems"));
      cart.push({ prod: product, qty: 1 });
      localStorage.setItem("cartItems", JSON.stringify(cart));
  }
  document.querySelector(".cartCount").innerHTML = JSON.parse(
    localStorage.getItem("cartItems")
  ).length;
  aksiyaOut = ``;
  setAksiyaData();
  yangilikOut = ``
  setYangilikData()
  mashhurOut = ``
  setMashhurData()
};

// window.addEventListener("load", () => {
//   localStorage.setItem("likedProducts", Array());
//   localStorage.setItem("cart", []);
// });
document.getElementById("logImage").addEventListener("change", () => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    profileImg = reader.result;
  })
  reader.readAsDataURL(document.getElementById("logImage").files[0])
})

document.querySelector(".priceAksiya").addEventListener("click", () => {
  aksiyaOut = "";
  if (
    document
      .querySelector(".priceAksiya")
      .classList.contains("priceAksiyaAscending")
  ) {
    document
      .querySelector(".priceAksiya")
      .classList.remove("priceAksiyaAscending");
    document
      .querySelector(".priceAksiya")
      .classList.add("priceAksiyaDescending");
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => b.price - a.price)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
`)
      );
  } else if (
    document
      .querySelector(".priceAksiya")
      .classList.contains("priceAksiyaDescending")
  ) {
    document
      .querySelector(".priceAksiya")
      .classList.add("priceAksiyaAscending");
    document
      .querySelector(".priceAksiya")
      .classList.remove("priceAksiyaDescending");
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
`)
      );
  } else {
    document
      .querySelector(".priceAksiya")
      .classList.add("priceAksiyaAscending");
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    ? `<button onclick="addToCart(${prod.id})"> В корзину</button>`
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
`)
);
  }
  document.querySelector(".aksiyaCards").innerHTML = aksiyaOut;
});

document.querySelector(".ratingAksiya").addEventListener("click", () => {
  aksiyaOut = "";
  if (
    document
      .querySelector(".ratingAksiya")
      .classList.contains("ratingAksiyaAscending")
  ) {
    document
      .querySelector(".ratingAksiya")
      .classList.remove("ratingAksiyaAscending");
    document
      .querySelector(".ratingAksiya")
      .classList.add("ratingAksiyaDescending");
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => b.rating - a.rating)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
`)
      );
  } else if (
    document
      .querySelector(".ratingAksiya")
      .classList.contains("ratingAksiyaDescending")
  ) {
    document
      .querySelector(".ratingAksiya")
      .classList.add("ratingAksiyaAscending");
    document
      .querySelector(".ratingAksiya")
      .classList.remove("ratingAksiyaDescending");
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
`)
      );
  } else {
    document
      .querySelector(".ratingAksiya")
      .classList.add("ratingAksiyaAscending");
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
`)
      );
  }
  document.querySelector(".aksiyaCards").innerHTML = aksiyaOut;
});

document.querySelector(".priceYangilik").addEventListener("click", () => {
  yangilikOut = ``;
  if (
    document
      .querySelector(".priceYangilik")
      .classList.contains("priceYangilikAscending")
  ) {
    document
      .querySelector(".priceYangilik")
      .classList.remove("priceYangilikAscending");
    document
      .querySelector(".priceYangilik")
      .classList.add("priceYangilikDescending");
    data
      .slice(8, 16)
      .sort((a, b) => b.price - a.price)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
      }, 'minus')">-</button><h1>${
        JSON.parse(localStorage.getItem("cartItems")).find(
          (el) => el.prod == prod.id
        ).qty
      }</h1><button onclick="plusMinusItem(${
        prod.id
      }, 'plus')">-</button></div>`
    : `<button onclick="addToCart(${prod.id})">В корзину</button>`
}
</div>
`)
      );
  } else if (
    document
      .querySelector(".priceYangilik")
      .classList.contains("priceYangilikDescending")
  ) {
    document
      .querySelector(".priceYangilik")
      .classList.add("priceYangilikAscending");
    document
      .querySelector(".priceYangilik")
      .classList.remove("priceYangilikDescending");
    data
      .slice(8, 16)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
`)
      );
  } else {
    document
      .querySelector(".priceYangilik")
      .classList.add("priceYangilikAscending");
    data
      .slice(8, 16)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
`)
      );
  }
  document.querySelector(".yangilikCards").innerHTML = yangilikOut;
});
document.querySelector(".ratingYangilik").addEventListener("click", () => {
  yangilikOut = ``;
  if (
    document
      .querySelector(".ratingYangilik")
      .classList.contains("ratingYangilikAscending")
  ) {
    document
      .querySelector(".ratingYangilik")
      .classList.remove("ratingYangilikAscending");
    document
      .querySelector(".ratingYangilik")
      .classList.add("ratingYangilikDescending");
    data
      .slice(8, 16)
      .sort((a, b) => b.rating - a.rating)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
`)
      );
  } else if (
    document
      .querySelector(".ratingYangilik")
      .classList.contains("ratingYangilikDescending")
  ) {
    document
      .querySelector(".ratingYangilik")
      .classList.add("ratingYangilikAscending");
    document
      .querySelector(".ratingYangilik")
      .classList.remove("ratingYangilikDescending");
    data
      .slice(8, 16)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
`)
      );
  } else {
    document
      .querySelector(".ratingYangilik")
      .classList.add("ratingYangilikAscending");
    data
      .slice(8, 16)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  }
  document.querySelector(".yangilikCards").innerHTML = yangilikOut;
});

document.querySelector(".ratingMashhur").addEventListener("click", () => {
  mashhurOut = ``;
  if (
    document
      .querySelector(".ratingMashhur")
      .classList.contains("ratingMashhurAscending")
  ) {
    document
      .querySelector(".ratingMashhur")
      .classList.remove("ratingMashhurAscending");
    document
      .querySelector(".ratingMashhur")
      .classList.add("ratingMashhurDescending");
    data
      .slice(17, 25)
      .sort((a, b) => b.rating - a.rating)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
</div>
</div>
<div class="card__about">
<h3>${prod.title}</h3>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else if (
    document
      .querySelector(".ratingMashhur")
      .classList.contains("ratingMashhurDescending")
  ) {
    document
      .querySelector(".ratingMashhur")
      .classList.add("ratingMashhurAscending");
    document
      .querySelector(".ratingMashhur")
      .classList.remove("ratingMashhurDescending");
    data
      .slice(17, 25)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else {
    document
      .querySelector(".ratingMashhur")
      .classList.add("ratingMashhurAscending");
    data
      .slice(17, 25)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  }
  document.querySelector(".mashhurCards").innerHTML = mashhurOut;
});
document.querySelector(".priceMashhur").addEventListener("click", () => {
  mashhurOut = ``;
  if (
    document
      .querySelector(".priceMashhur")
      .classList.contains("priceMashhurAscending")
  ) {
    document
      .querySelector(".priceMashhur")
      .classList.remove("priceMashhurAscending");
    document
      .querySelector(".priceMashhur")
      .classList.add("priceMashhurDescending");
    data
      .slice(17, 25)
      .sort((a, b) => b.price - a.price)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else if (
    document
      .querySelector(".priceMashhur")
      .classList.contains("priceMashhurDescending")
  ) {
    document
      .querySelector(".priceMashhur")
      .classList.add("priceMashhurAscending");
    document
      .querySelector(".priceMashhur")
      .classList.remove("priceMashhurDescending");
    data
      .slice(17, 25)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else {
    document
      .querySelector(".priceMashhur")
      .classList.add("priceMashhurAscending");
    data
      .slice(17, 25)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (mashhurOut += `
          <div class="card">
          <div class="card__image">
          <div class="card__image-like">
          <svg onclick="likeProduct(${prod.id})" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2046 4.25644C14.3299 3.13067 15.8564 2.49817 17.4482 2.49817C19.0399 2.49817 20.5664 3.13063 21.6916 4.25636C22.8174 5.38164 23.45 6.90829 23.45 8.49999C23.45 10.0917 22.8175 11.6183 21.6917 12.7435C21.6917 12.7436 21.6917 12.7435 21.6917 12.7435L12.8517 21.5835C12.6565 21.7788 12.3399 21.7788 12.1446 21.5835L3.30461 12.7435C0.960963 10.3999 0.960963 6.60009 3.30461 4.25644C5.64826 1.91279 9.44807 1.91279 11.7917 4.25644L12.4982 4.96289L13.2046 4.25644C13.2046 4.25641 13.2046 4.25647 13.2046 4.25644ZM17.4482 3.49817C16.1217 3.49817 14.8496 4.02528 13.9118 4.96346L12.8517 6.02355C12.758 6.11732 12.6308 6.16999 12.4982 6.16999C12.3656 6.16999 12.2384 6.11732 12.1446 6.02355L11.0846 4.96355C9.13149 3.01042 5.96484 3.01042 4.01172 4.96355C2.05859 6.91667 2.05859 10.0833 4.01172 12.0364L12.4982 20.5229L20.9846 12.0364C21.9228 11.0987 22.45 9.82648 22.45 8.49999C22.45 7.17351 21.9229 5.90138 20.9847 4.96363C20.0469 4.02544 18.7747 3.49817 17.4482 3.49817Z" fill="#414141"/>
          </svg>
          </div>
              <img src='${prod.images[0]}' alt="">
          </div>
          <div class="card__price">
              <div class="card__price-left">
                  <h3>${prod.price} ₽</h3>
              </div>
          </div>
          <div class="card__about">
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
            }).join("")} ${Math.round(prod.rating)}.0
            
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
`)
      );
  }
  document.querySelector(".mashhurCards").innerHTML = mashhurOut;
});

const setAksiyaData = () => {
  if (
    document
      .querySelector(".ratingAksiya")
      .classList.contains("ratingAksiyaAscending")
  ) {
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__about-stars">
    ${Array(Math.round(prod.rating))
      .fill(0)
      .map((star) => {
        return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
      }).join("")}${Array(5 - Math.round(prod.rating))
            .fill(0)
            .map((star) => {
              return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
            }).join("")} ${Math.round(prod.rating)}.0
    </div>
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
`)
      );
  } else if (
    document
      .querySelector(".ratingAksiya")
      .classList.contains("ratingAksiyaDescending")
  ) {
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => b.rating - a.rating)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__about-stars">
    ${Array(Math.round(prod.rating))
      .fill(0)
      .map((star) => {
        return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
      }).join("")}${Array(5 - Math.round(prod.rating))
            .fill(0)
            .map((star) => {
              return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
            }).join("")} ${Math.round(prod.rating)}.0
    </div>
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
`)
      );
  } else if (
    document
      .querySelector(".priceAksiya")
      .classList.contains("priceAksiyaAscending")
  ) {
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__about-stars">
    ${Array(Math.round(prod.rating))
      .fill(0)
      .map((star) => {
        return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
      }).join("")}${Array(5 - Math.round(prod.rating))
            .fill(0)
            .map((star) => {
              return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
            }).join("")} ${Math.round(prod.rating)}.0
    </div>
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
`)
);
  } else if (
    document
      .querySelector(".priceAksiya")
      .classList.contains("priceAksiyaDescending")
  ) {
    data
      .filter((el) => el.discountPercentage > 0)
      .slice(0, 8)
      .sort((a, b) => b.price - a.price)
      .map(
        (prod) =>
          (aksiyaOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__about-stars">
    ${Array(Math.round(prod.rating))
      .fill(0)
      .map((star) => {
        return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
      }).join("")}${Array(5 - Math.round(prod.rating))
            .fill(0)
            .map((star) => {
              return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
            }).join("")} ${Math.round(prod.rating)}.0
    </div>
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
`)
);
  } else {
  data
    .filter((el) => el.discountPercentage > 0)
    .slice(0, 8)
    .map(
      (prod) =>
        (aksiyaOut += `
<div class="card">
<div class="card__image">
<div class="card__image-like">
<div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')) != null || JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__about-stars">
    ${Array(Math.round(prod.rating))
      .fill(0)
      .map((star) => {
        return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
      }).join("")}${Array(5 - Math.round(prod.rating))
          .fill(0)
          .map((star) => {
            return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
          }).join("")} ${Math.round(prod.rating)}.0
    </div>
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
`)
);
  }
  document.querySelector(".aksiyaCards").innerHTML = aksiyaOut;
};
setAksiyaData();

const setYangilikData = () => {
  if (
    document
      .querySelector(".ratingYangilik")
      .classList.contains("ratingYangilikAscending")
  ) {
    data
      .slice(8, 16)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
    </div>
</div>
<div class="card__about">
<h3>${prod.title}</h3>
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
          }).join("")} ${Math.round(prod.rating)}.0
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
`)
);
  } else if (
    document
      .querySelector(".ratingYangilik")
      .classList.contains("ratingYangilikDescending")
  ) {
    data
      .slice(8, 16)
      .sort((a, b) => b.rating - a.rating)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
);
  } else if (
    document
      .querySelector(".priceYangilik")
      .classList.contains("priceYangilikAscending")
  ) {
    data
      .slice(8, 16)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else if (
    document
      .querySelector(".priceYangilik")
      .classList.contains("priceYangilikDescending")
  ) {
    data
      .slice(8, 16)
      .sort((a, b) => b.price - a.price)
      .map(
        (prod) =>
          (yangilikOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
        <h3>${prod.price} ₽</h3>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
} else {
  data.slice(8, 16).map(
    (prod) =>
      (yangilikOut += `
  <div class="card">
  <div class="card__image">
  <div class="card__image-like">
  <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
  <h3>${prod.price} ₽</h3>
  </div>
  </div>
  <div class="card__about">
      <h3>${prod.title}</h3>
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
        }).join("")} ${Math.round(prod.rating)}.0
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
  `)
  );
}
document.querySelector(".yangilikCards").innerHTML = yangilikOut;

}
setYangilikData()

const setMashhurData = () => {
  if (
    document
      .querySelector(".ratingMashhur")
      .classList.contains("ratingMashhurAscending")
  ) {
    data
      .slice(17, 25)
      .sort((a, b) => a.rating - b.rating)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
        }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else if (
    document
      .querySelector(".ratingMashhur")
      .classList.contains("ratingMashhurDescending")
  ) {
    data
      .slice(17, 25)
      .sort((a, b) => b.rating - a.rating)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else if (
    document
      .querySelector(".priceMashhur")
      .classList.contains("priceMashhurAscending")
  ) {
    data
      .slice(17, 25)
      .sort((a, b) => a.price - b.price)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else if (
    document
      .querySelector(".priceMashhur")
      .classList.contains("priceMashhurDescending")
  ) {
    data
      .slice(17, 25)
      .sort((a, b) => b.price - a.price)
      .map(
        (prod) =>
          (mashhurOut += `
    <div class="card">
    <div class="card__image">
    <div class="card__image-like">
    <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
    <div class="card__price">
    <div class="card__price-left">
        <h3>${prod.price} ₽</h3>
    </div>
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
            }).join("")} ${Math.round(prod.rating)}.0
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
`)
      );
  } else {
  data.slice(17, 25).map(
    (prod) =>
      (mashhurOut += `
  <div class="card">
  <div class="card__image">
  <div class="card__image-like">
  <div class="con-like">
  <input onchange="likeProduct(${prod.id})" title="like" type="checkbox" ${JSON.parse(localStorage.getItem('liked')).find(product => product.id == prod.id) !== undefined ? 'checked' : ''} class="like">
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
          <h3>${prod.price} ₽</h3>
      </div>
  </div>
  <div class="card__about">
      <h3>${prod.title}</h3>
      <p>${prod.thumbnail}</p>
      <div class="card__about-stars">
      ${Array(Math.round(prod.rating))
        .fill(0)
        .map((star) => {
          return '<img src="assets/images/Star 1.png" alt="Rasm yuklashda xatolik">';
        }).join("")}${Array(5 - Math.round(prod.rating))
        .fill(0)
        .map((star) => {
          return '<img src="assets/images/Star 2.png" alt="Rasm yuklashda xatolik">';
        }).join("")} ${Math.round(prod.rating)}.0
        
      </div>
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
  `)
  );
}
document.querySelector(".mashhurCards").innerHTML = mashhurOut;
}
setMashhurData()

document.querySelector(".aksiyaCards").innerHTML = aksiyaOut;
document.querySelector(".yangilikCards").innerHTML = yangilikOut;
document.querySelector(".mashhurCards").innerHTML = mashhurOut;

if (document.querySelector(".searchInp").value === "") {
  document.querySelector(".searchResult").style.display = "none";
} else {
  document.querySelector(".searchResult").style.display = "flex";
}
document.querySelector(".searchInp").addEventListener("input", () => {
  let searchRes = ``;
  if (document.querySelector(".searchInp").value === "") {
    document.querySelector(".searchResult").style.display = "none";
  } else {
    document.querySelector(".searchResult").style.display = "flex";
  }
  data
    .filter((el) =>
      el.title
        .toLowerCase()
        .includes(document.querySelector(".searchInp").value.toLowerCase())
    )
    .map(
      (res) =>
        (searchRes += `
            <a href="">
                <div class="searchResCard">
                    <div class="searchResCard__img"><img src="${res.images[0]}" alt=""></div>
                    <div class="searchResCard__title">${res.title}</div>
                    <div class="searchResCard__price">Price: $${res.price}</div>
                </div>
            </a>
    `)
    );
  if (
    data.filter((el) =>
      el.title
        .toLowerCase()
        .includes(document.querySelector(".searchInp").value.toLowerCase())
    ).length == 0
  ) {
    document.querySelector(".searchResult").textContent = "Net takoy tovar";
  } else {
    document.querySelector(".searchResult").innerHTML = searchRes;
  }
});
document.querySelector(".navInphidden").addEventListener("input", () => {
  let searchRes = ``;
  if (document.querySelector(".navInphidden").value === "") {
    document.querySelector(".searchResult").style.display = "none";
  } else {
    document.querySelector(".searchResult").style.display = "flex";
  }
  data
    .filter((el) =>
      el.title
        .toLowerCase()
        .includes(document.querySelector(".navInphidden").value.toLowerCase())
    )
    .map(
      (res) =>
        (searchRes += `
    <a href="">
    <div class="searchResCard">
        <div class="searchResCard__img"><img src="${res.images[0]}" alt=""></div>
        <div class="searchResCard__title">${res.title}</div>
        <div class="searchResCard__price">Price: $${res.price}</div>
    </div>
    </a>
    `)
    );
  if (
    data.filter((el) =>
      el.title
        .toLowerCase()
        .includes(document.querySelector(".navInphidden").value.toLowerCase())
    ).length == 0
  ) {
    document.querySelector(".searchResult").textContent = "Net takoy tovar";
  } else {
    document.querySelector(".searchResult").innerHTML = searchRes;
  }
});
const plusMinusItem = (id, type) => {
  let localDataForChange = JSON.parse(localStorage.getItem("cartItems"));
  localDataForChange.map((item) => {
    if (item.prod == id) {
      if (type === "plus") {
        item.qty++;
      } else {
        item.qty--;
        if (item.qty == 0) {
          localDataForChange.splice(localDataForChange.indexOf(item), 1);
        }
      }
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(localDataForChange));
  aksiyaOut = ``;
  setAksiyaData();
  yangilikOut = ``;
  setYangilikData()
  mashhurOut = ``
  setMashhurData()
  document.querySelector(".cartCount").innerHTML = JSON.parse(
    localStorage.getItem("cartItems")
  ).length;
};
const likeProduct = (id) => {
  if(!likedProds.find(prod => prod.id == id)){
    likedProds.push(data.find(prod => prod.id == id))
  } else {
    likedProds.splice(likedProds.indexOf(data.find(prod => prod.id == id)), 1)
  }
  localStorage.setItem('liked', JSON.stringify(likedProds))
}
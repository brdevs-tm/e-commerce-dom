const data = products;
let cartItemsContent = [];
const localData = JSON.parse(localStorage.getItem("cartItems"));
let htmlCartContent = ``;
let cartInfoContent = ``;

if (localStorage.getItem("name")) {
  document.querySelector(
    ".nav__menu-user"
  ).innerHTML = `<img src='${localStorage.getItem(
    "image"
  )}'} alt=""> <p>${localStorage.getItem("name")}</p>`;
} else {
  document.querySelector(
    ".nav__menu-user"
  ).innerHTML = `<button onclick="document.querySelector('.joinModal').style.display = 'flex'" class="logRegButton">Log in</button>`;
}

function getDatasfromLocal() {
  localData && data.map((el) => {
      for (i = 0; i < localData.length; i++) {
        if (el.id == localData[i].prod) {
          cartItemsContent.push(el);
        }
      }
    });
  for (el of cartItemsContent) {
    for (i = 0; i < localData.length; i++) {
      if (el.id == localData[i].prod) {
        el.qty = localData[i].qty;
      }
    }
  }
}
getDatasfromLocal();
const displayDatas = () => {
  let skidka = 0;
  cartItemsContent.length != 0
    ? cartItemsContent.map((item) => {
        skidka += ((item.price * 2) / 100) * item.qty;
        htmlCartContent += `
        <div class="card">
        <div class="card__left">
          <div class="card__left-img">
            <img src="${item.images[0]}" alt="" />
          </div>
          <div class="card__left-info">
            <h3>${item.title}</h3>
            <p><span>${item.price} ₽</span> за шт.</p>
          </div>
        </div>
        <div class="card__right">
          <div class="card__right-btn">
            <div class="card__right-btn-buttons">
              <button onclick="plusMinusItem(${item.id}, 'minus')">-</button>
              <button>${item.qty}</button>
              <button onclick="plusMinusItem(${item.id}, 'plus')">+</button>
            </div>
          </div>
          <div class="card__right-price">
              <h1>${
                item.discountPercentage > 0
                  ? item.price -
                    ((item.price * item.discountPercentage) / 100).toFixed(1)
                  : item.price
              } ₽</h1>
              ${
                item.discountPercentage > 0
                  ? `<del>${item.price} ₽</del>`
                  : `<p></p>`
              }
          </div>
        </div>
      </div>
        `;
      })
    : (htmlCartContent += `<h1 style="text-align: center; background-color: transparent;">Savat bo'sh</h1>`);
  cartInfoContent += `
  <div class="cart__wrapper-infos-top">
  <p>На карте накоплено 200 ₽ </p>
</div>
<div class="cart__wrapper-infos-center">
  <div><p>${cartItemsContent.length} товара</p><p>${cartItemsContent.reduce(
    (a, b) => a + b.price * b.qty,
    0
  )} ₽</p></div>
  <div><p>Скидка</p><p>-${skidka.toFixed(2)}  ₽ </p></div>
</div>
<div class="cart__wrapper-infos-bottom">
  <div><p>Итог</p><h3>${
    cartItemsContent.reduce((a, b) => a + b.price * b.qty, 0) - skidka
  } ₽ </h3></div>
  <p>Вы получяете <b>100 бонусов</b></p>
  <span>Минимальная сумма заказа 1000р</span>
  <button>Оформить заказ</button>
</div>
  `;
  document.querySelector(".cards").innerHTML = htmlCartContent;
  document.querySelector(".cart__wrapper-infos").innerHTML = cartInfoContent;
  if (!localStorage.getItem("cartItems") == null) {
    document
      .querySelectorAll(".cartCount")
      .forEach(
        (count) =>
          (count.innerHTML = JSON.parse(
            localStorage.getItem("cartItems")
          ).length)
      );
  }
};
displayDatas();
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
  cartItemsContent.map((item) => {
    if (item.id == id) {
      if (type === "plus") {
        item.qty++;
      } else {
        item.qty--;
        if (item.qty == 0) {
          cartItemsContent.splice(cartItemsContent.indexOf(item), 1);
        }
      }
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(localDataForChange));
  htmlCartContent = ``;
  cartInfoContent = ``;
  document
    .querySelectorAll(".cartCount")
    .forEach((count) => (count.innerHTML = cartItemsContent.length));
  displayDatas();
};
window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
  document
    .querySelectorAll(".cartCount")
    .forEach((count) => (count.innerHTML = cartItemsContent.length));
});

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
document.querySelector('.cat-btn-img').addEventListener("click", () => {
  document.querySelector('.nav__menu-catalog').classList.toggle('open')
})
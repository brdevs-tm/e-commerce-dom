window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
  if (localStorage.getItem("cartItems") == null) {
    document.querySelector(".cartCount").innerHTML = "0";
  } else {
    document.querySelector(".cartCount").innerHTML = JSON.parse(
      localStorage.getItem("cartItems")
    ).length;
  }
});
document.querySelectorAll('.cat-btn-img').forEach(btn => btn.addEventListener("click", () => {
    document.querySelector('.nav__menu-catalog').classList.toggle('open')
  }))
  document.querySelectorAll(".loginBtn").forEach(logbtn => logbtn.addEventListener("click", () => {
    if (document.getElementById("logName").value === "") {
      alert("Ismni kiriting");
    } else {
      localStorage.setItem("name", document.getElementById("logName").value);
      localStorage.setItem("image", profileImg);
      document.querySelector(".joinModal").style.display = "none";
      window.location.reload();
    }
  })
  )
  if (localStorage.getItem("name")) {
    document.querySelectorAll(
      ".nav__menu-user"
    ).forEach(el => el.innerHTML = `<img src='${localStorage.getItem("image")}'} alt=""> <p>${localStorage.getItem(
        "name"
      )}</p>`)
  } else {
    document.querySelectorAll(
      ".nav__menu-user"
    ).forEach(el => el.innerHTML = `<button onclick="document.querySelector('.joinModal').style.display = 'flex'" class="logRegButton">Log in</button>`)
  }

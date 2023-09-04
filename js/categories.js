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
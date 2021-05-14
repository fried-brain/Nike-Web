document.querySelector(".card-btn").addEventListener("click", function () {
  document.querySelector(".cart-container").classList.add("visib");
  document.querySelector(".cart").classList.add("tran");
  document.querySelector("body").style.overflow = "hidden";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".cart-container").classList.remove("visib");
  document.querySelector(".cart").classList.remove("tran");
  document.querySelector("body").style.overflow = "auto";
});

let removeBtn = document.querySelectorAll(".remove-item");
let arrowUp = document.querySelectorAll(".fa-chevron-up");
let arrowDown = document.querySelectorAll(".fa-chevron-down");

removeBtn.forEach((btn) => {
  btn.addEventListener("click", remove);
});

function remove(event) {
  let btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateTotal();
  updatecart();
}

function updateTotal() {
  let cartRow = document.querySelectorAll(".cart-item");

  let total = 0;
  cartRow.forEach((cart) => {
    let priceElement = cart.querySelector("h5");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantityElement = cart.querySelector("p");
    let quantity = parseFloat(quantityElement.innerHTML);

    total += price * quantity;

    let totalcart = document.querySelector(".cart-total");

    totalcart.innerText = total;
  });
  if (cartRow.length == 0) {
    document.querySelector(".cart-total").innerText = 0;
  }
}

arrowUp.forEach((btn) => {
  btn.addEventListener("click", up);
});

function up(event) {
  let add = event.target.parentElement.querySelector("p");
  let vlu = parseFloat(add.innerText);
  vlu++;
  add.innerText = vlu;

  updateTotal();
}

arrowDown.forEach((btn) => {
  btn.addEventListener("click", down);
});

function down(event) {
  let add = event.target.parentElement.querySelector("p");
  let vlu = parseFloat(add.innerText);
  if (vlu > 1) {
    vlu--;
    add.innerText = vlu;
    updateTotal();
  }
}

let addButton = document.querySelectorAll(".add-btn");

addButton.forEach((btn) => {
  btn.addEventListener("click", addToCard);
});

function addToCard(event) {
  button = event.target;

  // button.innerText = 'Added';

  let shopItem = button.parentElement.parentElement;

  let title = shopItem.querySelector("h2").innerText;

  let price = shopItem.querySelector("span").innerText;

  let imageSrc = shopItem.querySelector("img").src;

  addCartItem(title, price, imageSrc);

  updateTotal();
}

function addCartItem(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  let cartItems = document.querySelector(".cart-content");
  let cartItemName = cartItems.querySelectorAll("h4");

  for (i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerHTML == title) {
      alert("this item is already added to the cart");
      return;
    }
  }

  let cartRowContent = ` <div class="cart-item">
    <img src="${imageSrc}" alt="">
    <div class="item-text">
        <h4>${title}</h4>
        <h5>${price}</h5>
        <span class="remove-item">remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up"></i>
        <p class="quantity">1</p>
        <i class="fas fa-chevron-down"></i>
    </div>
</div>`;

  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);

  cartRow.querySelector(".fa-chevron-up").addEventListener("click", up);
  cartRow.querySelector(".fa-chevron-down").addEventListener("click", down);
  cartRow.querySelector(".remove-item").addEventListener("click", remove);

  updatecart();
}

function updatecart() {
  let itemNumber = document.querySelector(".item-number");
  let cartRow = document.querySelectorAll(".cart-item");

  itemNumber.innerText = cartRow.length;

  itemNumber.classList.add("scale");

  itemNumber.addEventListener("animationend", function () {
    itemNumber.classList.remove("scale");
  });
}

let clearCartBtn = document
  .querySelector(".clear-cart")
  .addEventListener("click", clearCart);

function clearCart() {
  let cartItems = document.querySelector(".cart-content");

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateTotal();
  updatecart();
}

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 500) {
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  } else {
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

const cursorEl = document.querySelector("#cursorEl");
window.addEventListener("mousemove", (e) => {
  if (cursorEl.classList.contains("out")) {
    cursorEl.style.transform = "translate(-50%, -50%) scale(1)";
    cursorEl.classList.remove("out");
  }
  if (cursorEl.classList.contains("active")) return;

  if (
    e.pageX >= document.body.offsetWidth - 20 ||
    e.pageX <= 10 ||
    e.pageY <= 10
  ) {
    cursorEl.style.transform = "scale(0)";
    cursorEl.classList.add("out");
  }
  setTimeout(() => {
    cursorEl.style.left = e.pageX + "px";
    cursorEl.style.top = e.pageY + "px";
  }, 1000 / 20);

  cursorEl.setAttribute("data-fromTop", cursorEl.offsetTop - scrollY);
});

window.addEventListener("scroll", () => {
  const fromTop = cursorEl.getAttribute("data-fromTop");
  cursorEl.style.top = scrollY + parseInt(fromTop) + "px";
});

function showBland(e) {
  if (e.type === "mouseleave") {
    cursorEl.style.transform = "translate(-50%, -50%) scale(1)";
    cursorEl.classList.remove("showBland");
    return;
  }
  cursorEl.classList.add("showBland");
  cursorEl.style.transform = "translate(-50%, -50%) scale(4)";
}
const blandEls = document.querySelectorAll(".show-bland");
blandEls.forEach((el) => {
  el.addEventListener("mousemove", showBland);
  el.addEventListener("mouseleave", showBland);
});

const cursorTextEl = document.querySelectorAll("[data-cursor]");
cursorTextEl.forEach((el) => {
  el.addEventListener("mousemove", showCursorText);
  el.addEventListener("mouseleave", showCursorText);
});

function showCursorText(e) {
  if (e.type === "mouseleave") {
    cursorEl.style.transform = "translate(-50%, -50%) scale(1)";
    cursorEl.innerText = "";
    return;
  }
  const data = e.target.getAttribute("data-cursor");
  cursorEl.innerText = data;
  cursorEl.style.transform = "translate(-50%, -50%) scale(6)";
}

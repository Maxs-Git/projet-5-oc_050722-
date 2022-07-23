const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const id = urlParams.get("id");

let imgCanap = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let desc = document.getElementById("description");
let colors = document.getElementById("colors");
let quantity = document.getElementById("quantity");
let btn = document.getElementById("addToCart");

// let quantity = document.getElementById("quantity").value;

//récuperation des donné a partir de l'id
function fetchData() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      buildHtml(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();

//affiche les données
function buildHtml(data) {
  imgCanap.innerHTML =
    "<img src= " + data.imageUrl + "  alt=" + data.altTxt + "></img>";

  title.innerHTML = data.name;
  price.innerHTML = data.price;
  desc.innerHTML = data.description;

  let newOptions = data.colors;
  let newValues = data.colors;
  colors.options.length = 0;
  for (i = 0; i < newOptions.length; i++) {
    colors.options[colors.length] = new Option(newOptions[i], newValues[i]);
  }
}

let cart = [];

//verifie la quantité
function test2(testObject) {
  testObject = { quantity: quantity.value, color: colors.value, id: id };

  if (quantity.value > 0 && quantity.value <= 100) {
    return cart.push(testObject);
  } else {
    alert("quantity");
  }
}

function postLocal() {
  localStorage.setItem("testCart", JSON.stringify(cart));
}

btn.addEventListener("click", test2);
btn.addEventListener("click", postLocal);

function verify() {
  let objJson = localStorage.getItem("testCart");
  let cartObj = JSON.parse(objJson);

  cartObj.findIndex((search) => {
    if (id == search.id && search.color == search.color) {
      return true;
    } else {
      return false;
    }
  });
}

verify();

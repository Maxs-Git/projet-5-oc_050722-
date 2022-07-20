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

let cart = []; // la panier

//l'objet
let kanap = {
  id: id,
  color: colors.selectedIndex,
  quantity: quantity.value,
};
//Regarde si il y a une quantité
function checkQuantity() {
  if (quantity.value > 0 && quantity.value <= 100) {
    return cart.push(kanap);
  } else {
    return alert("select quantity");
  }
}

cart.findIndex((search) => {
  if (kanap.id == search.id && search.color == kanap.color) {
    return true;
  } else {
    return false;
  }
});

btn.addEventListener("click", checkQuantity);

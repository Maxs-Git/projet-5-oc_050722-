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
//Vérifie si la quantité et la couleur sont les mêmes 
function verify(product) {
  let objJson = localStorage.getItem("cart");
  if (objJson) {
    cart = JSON.parse(objJson);
  }
  return cart.findIndex((search) => {
    if (product.id == search.id && product.color == search.color) {
      return true;
    } else {
      return false;
    }
  });
}
//regarde si la quantité sélectionnée par l'utilisateur est entre 1 et 100
function quantityCheck(checkProduct) {
  if (checkProduct.quantity > 0 && checkProduct.quantity <= 100) {
    return true;
  } else {
    return false;
  }
}
//si la quantité est bonne il s'occupe de changer notre commande en objet 
btn.addEventListener("click", () => {
  let quantityValue = quantity.value;
  let quantityNumber = parseInt(quantityValue);
  let productAdded = {
    quantity: quantityNumber,
    color: colors.value,
    id: id,
  };
  let checkQuantity = quantityCheck(productAdded);
//si la quantité est mauvaise il renvoie une alerte
  if (checkQuantity == true) {
  } else {
    return alert("quantity");
  }
// ici on vérifie si on additionne les produits la quantité reste inférieure à 100
  let productIndex = verify(productAdded);
  if (productIndex < 0) {
    cart.push(productAdded);
  } else if (cart[productIndex].quantity + productAdded.quantity <= 100) {
    cart[productIndex].quantity += productAdded.quantity;
  } else {
    Math.max(cart[productIndex], 100);
    alert("Merci de pas dépasser 100 kanap");
  }
  localStorage.setItem("cart", JSON.stringify(cart));
});

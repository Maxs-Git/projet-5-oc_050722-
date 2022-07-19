const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const param1 = urlParams.get("id");

let imgCanap = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let desc = document.getElementById("description");
let colors = document.getElementById("colors");
let btn = document.getElementById("addToCart");

// let quantity = document.getElementById("quantity").value;

//récuperation des donné a partir de l'id
function fetchData() {
  fetch(`http://localhost:3000/api/products/${param1}`)
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      buildTest(data);
      optionBuild(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();

//affiche les données
function buildTest(data) {
  imgCanap.innerHTML =
    "<img src= " + data.imageUrl + "  alt=" + data.altTxt + "></img>";

  title.innerHTML = data.name;
  price.innerHTML = data.price;
  desc.innerHTML = data.description;
}

//affiche la partie select aves les options
function optionBuild(data) {
  let newOptions = data.colors;
  let newValues = data.colors;
  colors.options.length = 0;
  for (i = 0; i < newOptions.length; i++) {
    colors.options[colors.length] = new Option(newOptions[i], newValues[i]);
  }
}

// en test

//post in local storage
function postLocal() {
  let testObject = [quantity.value, colors.value, param1];
  localStorage.setItem("testObject", JSON.stringify(testObject));
}


btn.addEventListener("click", postLocal);

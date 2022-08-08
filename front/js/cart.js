let cart = localStorage.getItem("cart");
let panier = JSON.parse(cart);
let itemCart = document.getElementById("cart__items");
let mixedCart = [];

let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

function fetchData() {
  fetch(`http://localhost:3000/api/products`)
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      //mixed cart deviendra notre nouveau tableau grace au point qui seras une fusion du local storage et de l'api a condition que les objets ont la même id
      mixedCart = panier.map((panierObject) => {
        let dataIndex = data.findIndex((el) => {
          //dataIndex = au resultat de la recherche du find index donc [0] [1] etc
          return el._id === panierObject.id;
        });
        if (dataIndex > -1) {
          return {
            id: panierObject.id,
            color: panierObject.color,
            quantity: panierObject.quantity,
            price: data[dataIndex].price,
            desc: data[dataIndex].description,
            name: data[dataIndex].name,
            image: data[dataIndex].imageUrl,
            imgAlt: data[dataIndex].altTxt,
          };
        } else {
          return panierObject;
        }
      });
      buildHtml(mixedCart);

      let itemQuantity = document.querySelector(".itemQuantity");

      itemQuantity.addEventListener("change", () => { 
        quantityParent = itemQuantity.closest("article"); // on récupere l'elemtn le plus pres du click de l'utilisateur
        let quantityIndex = mixedCart.findIndex((quantityEl) => { // on cherche dans le mixedcart si la couleur et l'id correspond
          return (
            quantityEl.id == quantityParent.dataset.id &&
            quantityEl.color == quantityParent.dataset.color
          );
        });
        mixedCart[quantityIndex].quantity = itemQuantity.value; //et on donne a mixedcart la quantity de notre bouton
      });

      ////////////////////////////////////////////////////////////////////////////////
      let suppr = document.querySelector(".deleteItem");
      suppr.addEventListener("click", () => {
        parentArticle = suppr.closest("article");
        console.log(parentArticle.dataset);

        let deleteIndex = mixedCart.findIndex((deleteEl) => {
          return (
            deleteEl.id == parentArticle.dataset.id &&
            deleteEl.color == parentArticle.dataset.color
          );
        });
        mixedCart.splice(deleteIndex, 1);
        parentArticle.remove();
      });
      calculQtePrice();
    })
    ///////////////////////////////////////////////////////////////////////////////
    .catch((error) => {
      console.log(error);
    });
}

function buildHtml() {
  mixedCart.forEach((object) => {
    itemCart.innerHTML += `
    <article class="cart__item" data-id="${object.id}" data-color="${object.color}">
    <div class="cart__item__img">
    <img src="${object.image}" alt="${object.desc}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${object.name}</h2>
    <p>${object.color}</p>
    <p>${object.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté :</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${object.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `;
  });
}

function calculQtePrice() {
  let quantityCalcul = mixedCart.reduce(
    (accumulator, x) => accumulator + x.quantity,
    0
  );
  let priceCalcul = mixedCart.reduce(
    (accumulator, x) => accumulator + x.price,
    0
  );
  totalQuantity.innerHTML = `${quantityCalcul}`;
  totalPrice.innerHTML = `${priceCalcul}`;
}

function validate() {
  let regFirstName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let firstName = document.getElementById("firstName").value;
  let firstNameResult = regFirstName.test(firstName);
  if (firstNameResult == false) {
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    errorFirstName.innerHTML = "Incorrect FirstName";
  } else {
    console.log("ok");
  }
}

let btnSubmit = document.getElementById("order");

btnSubmit.addEventListener("click", validate);

fetchData();

//regex

//prenom: /^[a-zA-Z]+ [a-zA-Z]+$/;
//nom: /^[a-zA-Z]+ [a-zA-Z]+$/;
// adresse: /^[a-z0-9\s,'-]*$/i
// Ville: ^[a-zA-Z\\u0080-\\u024F.]+((?:[ -.|'])[a-zA-Z\\u0080-\\u024F]+)*$
//Ville2: ^[a-zA-Z\u0080-\u024F]+(?:. |-| |')*([1-9a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$
// email: 	^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$

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
      //mixed cart deviendra notre nouveau tableau grace au point qui sera une fusion du local storage et de l'api a condition que les objets ont la même id
      mixedCart = panier.map((panierObject) => {
        let dataIndex = data.findIndex((el) => {
          //dataIndex = le résultat de la recherche du find index donc [0] [1] etc.
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

      //Se met à jour quantity de l'objet quand on clique dessus
      let itemQuantities = document.querySelectorAll(".itemQuantity");
      for (let itemQuantity of itemQuantities) {
        itemQuantity.addEventListener("change", () => {
          quantityParent = itemQuantity.closest("article"); // on récupère l'element le plus près du click de l'utilisateur
          let mixedCartIndex = mixedCart.findIndex((quantityEl) => {
            // on cherche dans le mixedcart si la couleur et l'id correspond
            return (
              quantityEl.id == quantityParent.dataset.id &&
              quantityEl.color == quantityParent.dataset.color
            );
          });
          let quantityParse = parseInt(itemQuantity.value);
          mixedCart[mixedCartIndex].quantity = quantityParse; //et on donne a mixedcart la quantity de notre bouton
          panier[mixedCartIndex].quantity = quantityParse;
          updateLocal();
          calculQtePrice();
        });
      }
      //À chaque click du bouton supprimé elle regarde l'objet le plus près et le cherche dans le mixedcart puis elle le supprime
      let deleteButtons = document.querySelectorAll(".deleteItem");
      for (let suppr of deleteButtons) {
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
          panier.splice(deleteIndex, 1);
          parentArticle.remove();
          calculQtePrice();
          updateLocal();
        });
      }
      calculQtePrice();
    })

    .catch((error) => {
      console.log(error);
    });
}

//Permets d'afficher les objets du mixed cart en article HTML
function buildHtml() {
  mixedCart.forEach((object) => {
    // Création de la balise "article" et insertion dans la section
    let objectArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(objectArticle);
    objectArticle.className = "cart__item";
    objectArticle.setAttribute("data-id", object.id);
    objectArticle.setAttribute("data-color", object.color);

    // Insertion de l'élément "div" pour l'image produit
    let objectDivImg = document.createElement("div");
    objectArticle.appendChild(objectDivImg);
    objectDivImg.className = "cart__item__img";

    // Insertion de l'image
    let objectImg = document.createElement("img");
    objectDivImg.appendChild(objectImg);
    objectImg.src = object.image;
    objectImg.alt = object.imgAlt;

    // Insertion de l'élément "div" pour la description produit
    let objectItemContent = document.createElement("div");
    objectArticle.appendChild(objectItemContent);
    objectItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let objectItemContentTitlePrice = document.createElement("div");
    objectItemContent.appendChild(objectItemContentTitlePrice);
    objectItemContentTitlePrice.className = "cart__item__content__description";

    // Insertion du titre h2
    let objectTitle = document.createElement("h2");
    objectItemContentTitlePrice.appendChild(objectTitle);
    objectTitle.innerHTML = object.name;

    // Insertion de la couleur
    let objectColor = document.createElement("p");
    objectTitle.after(objectColor);
    objectColor.innerHTML = object.color;

    // Insertion du prix
    let objectPrice = document.createElement("p");
    objectItemContentTitlePrice.appendChild(objectPrice);
    objectPrice.innerHTML = object.price + " €";

    // Insertion de l'élément "div"
    let objectItemContentSettings = document.createElement("div");
    objectItemContent.appendChild(objectItemContentSettings);
    objectItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let objectItemContentSettingsQuantity = document.createElement("div");
    objectItemContentSettings.appendChild(objectItemContentSettingsQuantity);
    objectItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";
    //
    // Insertion de "Qté : "
    let itemQuantity = document.createElement("p");
    objectItemContentSettingsQuantity.appendChild(itemQuantity);
    itemQuantity.innerHTML = "Qté : ";

    // Insertion de la quantité
    let objectQuantity = document.createElement("input");
    objectItemContentSettingsQuantity.appendChild(objectQuantity);
    objectQuantity.value = object.quantity;
    objectQuantity.className = "itemQuantity";
    objectQuantity.setAttribute("type", "number");
    objectQuantity.setAttribute("min", "1");
    objectQuantity.setAttribute("max", "100");
    objectQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let objectItemContentSettingsDelete = document.createElement("div");
    objectItemContentSettings.appendChild(objectItemContentSettingsDelete);
    objectItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let objectSupprimer = document.createElement("p");
    objectItemContentSettingsDelete.appendChild(objectSupprimer);
    objectSupprimer.className = "deleteItem";
    objectSupprimer.innerHTML = "Supprimer";
  });
}

//calcul le prix total et la quantity
function calculQtePrice() {
  let quantityCalcul = mixedCart.reduce(
    (accumulator, x) => accumulator + x.quantity,
    0
  );

  let priceCalcul = mixedCart.reduce(
    (accumulator, x) => accumulator + x.quantity * x.price,
    0
  );
  totalQuantity.innerHTML = `${quantityCalcul}`;
  totalPrice.innerHTML = `${priceCalcul}`;
}

//cette fonction permet de nettoyer le local storage te le mettre à jour à chaque fois qu'un objet est supprimé ou modifier
function updateLocal() {
  localStorage.clear();
  localStorage.setItem("cart", JSON.stringify(panier));
}

let regexInfos = [
  {
    regex: /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/,
    errorMessage: "Incorrect FirstName",
    errorMessageId: "firstNameErrorMsg",
    elementId: "firstName",
  },
  {
    regex: /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/,
    errorMessage: "Nom incorrect",
    errorMessageId: "lastNameErrorMsg",
    elementId: "lastName",
  },
  {
    regex: /^[a-z0-9\s,'-]*$/i,
    errorMessage: "Adresse incorrect",
    errorMessageId: "addressErrorMsg",
    elementId: "address",
  },
  {
    regex: /^[a-zA-Z\\u0080-\\u024F.]+((?:[ -.|'])[a-zA-Z\\u0080-\\u024F]+)*$/,
    errorMessage: "Ville incorrect",
    errorMessageId: "cityErrorMsg",
    elementId: "city",
  },
  {
    regex: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    errorMessage: "email incorrect",
    errorMessageId: "emailErrorMsg",
    elementId: "email",
  },
];

//cette fonction va renvoyer si chaque regex est true ou false si une est fausse le formulaire n'est pas envoyée
let userData = [];
function validate(regexInfos) {
  let isValid = true;
  regexInfos.forEach((regexEl) => {
    let inputElement = document.getElementById(regexEl.elementId).value;
    let inputElementResult = regexEl.regex.test(inputElement);
    if (inputElementResult == false) {
      let errorInputElement = document.getElementById(regexEl.errorMessageId);
      errorInputElement.innerHTML = regexEl.errorMessage;
      isValid = false;
    } else {
      console.log("test");
      userData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
    }
  });
  return isValid;
}

let btnSubmit = document.getElementById("order");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate(regexInfos)) {
    postData();
  }
});

//si jamais tous les regex sont valides l'objet est envoyé à l'api
function postData() {
  let productsId = mixedCart.map((product) => product.id);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact: userData, products: productsId }),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      window.location.replace(
        `./confirmation.html?orderId=${value.orderId}`
      );
      console.log(value);
    });
}

fetchData();

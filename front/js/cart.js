let cart = localStorage.getItem("cart");
let panier = JSON.parse(cart);
let itemCart = document.getElementById("cart__items");

let mixedCart = [];

function fetchData() {
  fetch(`http://localhost:3000/api/products`)
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      mixedCart = panier.map((panierObject) => {
        let dataIndex = data.findIndex((el) => {
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
      mixedCart.forEach((object) => {
        itemCart.innerHTML = `
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
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();

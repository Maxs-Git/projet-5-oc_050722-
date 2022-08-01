let cart = localStorage.getItem("cart");

let panier = JSON.parse(cart);

console.log(panier);

let itemCart = document.getElementById("cart__items");

function fetchData() {
  fetch(`http://localhost:3000/api/products`)
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();

function buildProductHtml(object) {
  itemCart.innerHTML = `
    <article class="cart__item" data-id="${object.id}" data-color="${object.color}">
      <div class="cart__item__img">
        <img src="" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>Nom du produit</h2>
          <p>${object.color}</p>
          <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${object.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
    `;
}

panier.forEach(buildProductHtml);

//   <!-- <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//   <div class="cart__item__img">
//     <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//   </div>
//   <div class="cart__item__content">
//     <div class="cart__item__content__description">
//       <h2>Nom du produit</h2>
//       <p>Vert</p>
//       <p>42,00 €</p>
//     </div>
//     <div class="cart__item__content__settings">
//       <div class="cart__item__content__settings__quantity">
//         <p>Qté : </p>
//         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//       </div>
//       <div class="cart__item__content__settings__delete">
//         <p class="deleteItem">Supprimer</p>
//       </div>
//     </div>
//   </div>
// </article> -->

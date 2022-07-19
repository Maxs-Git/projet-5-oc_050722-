//construction des produits html
function buildProductHtml(product) {
  return `
  <a href="./product.html?id=${product._id}">
  <article>
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  <h3 class="productName">${product.name}</h3>
  <p class="productDescription">${product.description}</p>
  </article>
  </a>
  `;
}

//Récuperation des données de l'api
function fetchData() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      const html = data.map(buildProductHtml).join("");
      document.querySelector("#items").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();

// function postData() {
//   fetch("http://localhost:3000/api/products", {
//     method: "POST",
//     headers: {
//       Accept: "products/json",
//       "Content-Type": "products/json",
//     },
//     body: JSON.stringify({
//       name: "morpheus",
//       job: "leader",
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw Error("ERROR");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// postData();

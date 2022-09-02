//Récupération des données de l'api
function fetchData() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        //creation des éléments html
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${data[i]._id}`;

        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = data[i].imageUrl;
        productImg.alt = data[i].altTxt;

        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.textContent = data[i].name;

        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.textContent = data[i].description;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();

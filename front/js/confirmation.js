const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const orderId = urlParams.get("orderId");

let orderIdHtml = document.getElementById("orderId");

orderIdHtml.innerHTML = `${orderId}`;
localStorage.clear();

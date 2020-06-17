/* REQUETE LISTE DE PRODUITS */
let productId = [];
let elements = document.getElementsByClassName('view-teddy');
let url = path + '/teddies';

ajax({}, url, "GET")
.then(function(data) {
    let products = JSON.parse(data);
    displayProducts(products);
})
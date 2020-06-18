/* REQUETE LISTE DE PRODUITS */
let url = path + '/teddies';

ajax({}, url, "GET")
.then(function(data) {
    let products = JSON.parse(data);
    displayProducts(products);
})
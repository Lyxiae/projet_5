/* REQUETE LISTE DE PRODUITS */
let productId = [];
let elements = document.getElementsByClassName('view-teddy');

ajaxGet(path + '/teddies', (responseText) => {
        let products = JSON.parse(responseText);
        displayProducts(products);
    });
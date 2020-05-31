

/* REQUETE LISTE DE PRODUITS */
let productId = [];
let elements = document.getElementsByClassName('view-teddy');


ajaxGet(path + '/teddies', (responseText) => {
        let products = JSON.parse(responseText);
        console.log(products);
        displayProducts(products);
    });




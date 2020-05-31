var id = getParameterByName('id');


ajaxGet(path + '/teddies/' + id, (responseText) => {
    let teddy = JSON.parse(responseText);
    displayProduct(teddy);
}) 
    .then(function() {
        console.log('ajax done');
        addToCart.classList.remove('hidden');
    });


/*AJOUTE LES PRODUITS DU LOCALSTORAGE DANS LES PRODUITS DEJA AJOUTES*/
    if (window.localStorage.getItem('id-product') != null) {
        existingProducts = JSON.parse(window.localStorage.getItem('id-product'));
    } else {
        console.log('pas de produit à ajouter');
    }
    

console.log(existingProducts);


/*S'IL Y A DES PRODUITS DANS LE LOCALSTORAGE, LES AJOUTE A LA SHOPPING LIST*/
    if (existingProducts.length == 0) {
        console.log("pas d'article dans le panier");
    } else {
        console.log('il y a des articles dans le panier');
        shoppingList = shoppingList.concat(existingProducts);
        console.log(shoppingList);
    }

console.log(shoppingList);

/*RECUPERATION DE L'ID AU SUBMIT DU BOUTON ET AJOUT AU LOCAL STORAGE DE LA SHOPPING LIST*/
    addToCart.addEventListener('click', function(e){
        e.preventDefault();
        console.log(e.target.getAttribute('data-product-id'));
        shoppingList.push(e.target.getAttribute('data-product-id'));
        console.log(shoppingList);
        window.localStorage.setItem('id-product', JSON.stringify(shoppingList));
    })



ajaxGet(path + '/teddies/' + getParameterByName('id'), (responseText) => {
    let teddy = JSON.parse(responseText);
    displayProduct(teddy);
}) 
.then(function() {
    addToCart.classList.remove('hidden');
});

/*AJOUTE LES PRODUITS DU LOCALSTORAGE DANS LES PRODUITS DEJA AJOUTES*/
shoppingList = getCart();

/*DESACTIVE LE BOUTON D'AJOUT SI LE PRODUIT EST DEJA DANS LE PANIER*/
if (shoppingList.includes(getParameterByName('id'))) {
    addToCart.setAttribute("disabled", "");
};

/*RECUPERATION DE L'ID AU SUBMIT DU BOUTON ET AJOUT AU LOCAL STORAGE DE LA SHOPPING LIST*/
addToCart.addEventListener('click', function(e){
    e.preventDefault();
    if (shoppingList.includes(getParameterByName('id'))) {
        alert('Le produit est déjà dans le panier !');
        addToCart.setAttribute("disabled", "");
    }else{
        console.log(e.target.getAttribute('data-product-id'));
        shoppingList.push(e.target.getAttribute('data-product-id'));
        window.localStorage.setItem('id-product', JSON.stringify(shoppingList));
        addToCart.setAttribute("disabled", "");
    }
});



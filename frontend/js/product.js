ajaxGet(path + '/teddies/' + getParameterByName('id'), (responseText) => {
    let teddy = JSON.parse(responseText);
    displayProduct(teddy);
}) 
.then(function() {
    console.log('ajax done');
    addToCart.classList.remove('hidden');
});


/*AJOUTE LES PRODUITS DU LOCALSTORAGE DANS LES PRODUITS DEJA AJOUTES*/
shoppingList = getCart();

console.log(shoppingList);

/*DESACTIVE LE BOUTON D'AJOUT SI LE PRODUIT EST DEJA DANS LE PANIER*/
if (shoppingList.includes(getParameterByName('id'))) {
    addToCart.setAttribute("disabled", "");
};

/*RECUPERATION DE L'ID AU SUBMIT DU BOUTON ET AJOUT AU LOCAL STORAGE DE LA SHOPPING LIST*/
addToCart.addEventListener('click', function(e){
    e.preventDefault();
    if (shoppingList.includes(getParameterByName('id'))) {
        alert('Le produit est déjà dans le panier !');
    }else {
        console.log(e.target.getAttribute('data-product-id'));
    shoppingList.push(e.target.getAttribute('data-product-id'));
    console.log(shoppingList);
    window.localStorage.setItem('id-product', JSON.stringify(shoppingList));
    }
})



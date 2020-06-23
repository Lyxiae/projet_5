let url = basePath + '/teddies/' + getParameter('id');
let shoppingList = [];

ajax({}, url, "GET")
.then(function(data) {
    let teddy = JSON.parse(data);
    displayProduct(teddy);
    addToCart.classList.remove('hidden');
});

/*AJOUTE LES PRODUITS DU LOCALSTORAGE DANS LES PRODUITS DEJA AJOUTES*/
shoppingList = getCart();

/*DESACTIVE LE BOUTON D'AJOUT SI LE PRODUIT EST DEJA DANS LE PANIER*/
if (shoppingList.includes(getParameter('id'))) {
    addToCart.setAttribute("disabled", "");
    addToCart.textContent = "Produit ajouté au panier";
};

/*RECUPERATION DE L'ID AU SUBMIT DU BOUTON ET AJOUT AU LOCAL STORAGE DE LA SHOPPING LIST*/
addToCart.addEventListener('click', function(e){
    e.preventDefault();
    if (shoppingList.includes(getParameter('id'))) {
        alert('Le produit est déjà dans le panier !');
        addToCart.setAttribute("disabled", "");
    }else{
        console.log(e.target.getAttribute('data-product-id'));
        shoppingList.push(e.target.getAttribute('data-product-id'));
        window.localStorage.setItem('id-product', JSON.stringify(shoppingList));
        addToCart.setAttribute("disabled", "");
    }
    addToCart.textContent = "Produit ajouté au panier";
});

/**
 * 
 * @param Object product 
 */
function displayProduct(product) {
    let productDetails = document.getElementById('produit-details');
    let selectForm = document.getElementById('teddies-colors');
    let options = product.colors;
    productDetails.innerHTML = `
    <div class="article-item col">
        <div class="article-top page-produit">
            <img src="${product.imageUrl}"/>
            <div class="article-info">
                <h2>${product.name}</h2>
                <h3>${product.price}</h3>
                <p>${product.description}</p>
                <p> <strong>Couleurs : </strong>${product.colors}</p>
            </div>
        </div>
    </div>`;
    let formHtml='';
    for (let i of options) {
        formHtml += `<option value="${i}">${i}</option>`;
    }
    selectForm.innerHTML = formHtml;
    addToCart.setAttribute('data-product-id',product._id);
}



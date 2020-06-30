/**
 * Loads product page.
 */
ajax({}, basePath + '/teddies/' + getParameter('id'), "GET")
.then(function(data) {
    let teddy = JSON.parse(data);
    displayFullProductDetails(teddy);
    
    if (!isProductAlreadyInCart()) {
        document.getElementById('addToCart').addEventListener('click', addToCart);
    };
});

/**
 * Onclick, checks if product is in the cart. 
 * If it is, disables the button and displays an alert. 
 * If not, adds the product in the local storage, disables the button and changes the button label to indicate it has been added.
 * 
 * @param Event e 
 */
function addToCart(e) {
    e.preventDefault();

    storeProduct(e);
    disableAddButton();
}

/**
 * Disables the add to cart button.
 */
function disableAddButton() {
    document.getElementById('addToCart').setAttribute("disabled", "");
    document.getElementById('addToCart').textContent = "Produit ajouté au panier";
}

/**
 * Display product and product options, disables add button.
 * if product is already in cart and shows the button. 
 * 
 * @param Object product 
 */
function displayFullProductDetails(product) {
    
    document.getElementById('produit-details').innerHTML = displayProduct(product, 'card');
    document.getElementById('teddies-colors').innerHTML = displayProductOptions(product);
    if (isProductAlreadyInCart()) {
        disableAddButton();
    }
    document.getElementById('addToCart').classList.remove('hidden');
}


/**
 * Returns product options list as a select form element.
 * 
 * @param Array options 
 * @param String elementId 
 */
function displayProductOptions(product) {
    let options = product.colors;
    let formHtml='';
    for (let i of options) {
        formHtml += `<option value="${i}">${i}</option>`;
    }

    return formHtml;
}

/**
 * Checks if the product is already in the cart.
 */
function isProductAlreadyInCart() {
    if (! getCartProductIds().includes(getParameter('id'))) {
        return false;
    }

    return true;
}

/**
 * Push product ID to shopping list and adds/updates shopping list in the local storage. 
 */
function storeProduct(){
    let cart = getCartProductIds();

    if (! isProductAlreadyInCart()) {
        cart.push(getParameter('id'));
        window.localStorage.setItem('id-product', JSON.stringify(cart));
    }
    
}




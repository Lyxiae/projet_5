const addToCartButton = document.getElementById('addToCart');
let shoppingList = getCartProductIds();

/**
 * Loads product page.
 */
ajax({}, basePath + '/teddies/' + getParameter('id'), "GET")
.then(function(data) {
    let teddy = JSON.parse(data);
    displayFullProductDetails(teddy);
    isProductInCart();
    enablesAddToCartButton();
});

/**
 * Onclick, checks if product is in the cart. 
 * If it is, disables the button and displays an alert. 
 * If not, adds the product in the local storage, disables the button and changes the button label to indicate it has been added.
 * @param Event e 
 */
function addProductToCart(e) {
    e.preventDefault();
    if (!shoppingList.includes(getParameter('id'))) {
        storeProduct(e);
        disableAddButton();
    }
}

/**
 * Disables the add to cart button.
 */
function disableAddButton() {
    addToCartButton.setAttribute("disabled", "");
    addToCartButton.textContent = "Produit ajouté au panier";
}

/**
 * Loads product page with display functions, adds id to add to cart button and shows the button. 
 * @param Object product 
 */
function displayFullProductDetails(product) {
    let options = product.colors;
    document.getElementById('produit-details').innerHTML = displayProduct(product, 'card');
    displayProductOptions(options,'teddies-colors');
    addToCartButton.classList.remove('hidden');
}


/**
 * Displays product options list as a select form element.
 * @param Array options 
 * @param String elementId 
 */
function displayProductOptions(options, elementId) {
    let formHtml='';
    for (let i of options) {
        formHtml += `<option value="${i}">${i}</option>`;
    }
    document.getElementById(elementId).innerHTML = formHtml;
}

/**
 * Enables addToCartButton listener if the product is not in the cart.
 */
function enablesAddToCartButton() {
    if (!shoppingList.includes(getParameter('id'))) {
        addToCartButton.addEventListener('click', addProductToCart);
    };
}
/**
 * Checks if the product is already in the cart. If it is, disables the add button on the page and changes the button label.
 */
function isProductInCart() {
    if (shoppingList.includes(getParameter('id'))) {
        disableAddButton();
    };
}

/**
 * Push product ID to shopping list and adds/updates shopping list in the local storage. 
 * @param Button e 
 */
function storeProduct(e){
    shoppingList.push(getParameter('id'));
    window.localStorage.setItem('id-product', JSON.stringify(shoppingList));
}




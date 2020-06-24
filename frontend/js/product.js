const addToCart = document.getElementById('addToCart');
let shoppingList = getCartProductIds();

/**
 * Loads product page.
 */
ajax({}, basePath + '/teddies/' + getParameter('id'), "GET")
.then(function(data) {
    let teddy = JSON.parse(data);
    loadProduct(teddy);
    addToCart.classList.remove('hidden');
    checkProductInCart();
});

/**
 * Add to cart button listener, checks if product is in the cart before adding it.
 */
addToCart.addEventListener('click', addProductToCart);

/**
 * Onclick, checks if product is in the cart. 
 * If it is, disables the button and displays an alert. 
 * If not, adds the product in the local storage, disables the button and changes the button label to indicate it has been added.
 * @param Event e 
 */
function addProductToCart(e) {
    e.preventDefault();
    if (shoppingList.includes(getParameter('id'))) {
        alert('Le produit est déjà dans le panier !');
        addToCart.setAttribute("disabled", "");
    }else{
        shoppingList.push(e.target.getAttribute('data-product-id'));
        window.localStorage.setItem('id-product', JSON.stringify(shoppingList));
        addToCart.setAttribute("disabled", "");
    }
    addToCart.textContent = "Produit ajouté au panier";
}

/**
 * Checks if the product is already in the cart. If it is, disables the add button on the page and changes the button label.
 */
function checkProductInCart() {
    if (shoppingList.includes(getParameter('id'))) {
        disablesAddButton();
    };
}
/**
 * Disables the add to cart button.
 */
function disablesAddButton() {
    addToCart.setAttribute("disabled", "");
    addToCart.textContent = "Produit ajouté au panier";
}

/**
 * 
 * @param Object product 
 */
function loadProduct(product) {
    let productDetails = document.getElementById('produit-details');
    let selectForm = document.getElementById('teddies-colors');
    let options = product.colors;
    productDetails.innerHTML = displayProduct(product, 'card');
    let formHtml='';
    for (let i of options) {
        formHtml += `<option value="${i}">${i}</option>`;
    }
    selectForm.innerHTML = formHtml;
    addToCart.setAttribute('data-product-id',product._id);
}



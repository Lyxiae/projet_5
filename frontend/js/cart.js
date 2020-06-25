let form = document.getElementById('order-info');


/**
 * Loads cart page with products and total price
 */
loadCart();

//Form listener to check validity and update submit button accordingly
form.addEventListener("change", updateSubmitButtonStatus);

//Submit button listener to send order
form.addEventListener('submit', sendOrder);

/**
 * Loads cart page, displays order recap and total price.
 */
async function loadCart() {
    let products = await getAllProducts();
    let productsInCart = getProductsInCart(products);
    displayCartProducts(productsInCart);
    displayTotal(getTotal(productsInCart));
}

/**
 * Creates contact object, product list, sends everything with ajax post and redirects to order recap page.
 */
function sendOrder() {
    event.preventDefault();
    let cartProductsIds = getCartProductIds();
    let url = basePath + '/teddies/order';
    let payload = JSON.stringify({
        contact: {
            firstName: document.getElementById("surname").value,
            lastName: document.getElementById("name").value,
            address: document.getElementById("adress").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        },
        products: cartProductsIds
    });
    ajax(payload, url, "POST")
    .then(function(data){
        let dataObject = JSON.parse(data);
        window.location = `order.html?id=${dataObject.orderId}`;
    })
}

/**
 * Updates submit button depending on form validity.
 */
function updateSubmitButtonStatus() {
    if (form.checkValidity()) {
        document.getElementById('submit-cart').classList.remove('disabled');
    } else {
        document.getElementById('submit-cart').classList.add('disabled');
    }
}
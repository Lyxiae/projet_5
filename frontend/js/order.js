loadOrder();

/**
 * Loads order page, displays order recap, total price and order id.
 */
async function loadOrder() {
    let products = await getAllProducts();
    let productsInCart = getProductsInCart(products);
    displayRecap(productsInCart);
    displayTotal(getTotal(productsInCart));
    document.getElementById('order-id-number').innerHTML = getParameter('id');
}
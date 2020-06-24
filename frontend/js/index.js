loadIndex();

/**
 * Loads and displays entire product list from server.
 */
async function loadIndex() {
    let products = await getAllProducts();
    for (let product of products) {
        document.getElementById('article-list').innerHTML += displayProduct(product, 'list');
    }
}


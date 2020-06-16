let totalPrice = 0;
const form = document.getElementById('order-info');
let products = getCart();

//GET EACH ITEM IN CART TO DISPLAY
for (let product of products) {
    ajaxGet(path + '/teddies/' + product, (responseText) => {
        let product = JSON.parse(responseText);
        displayCart(product);
        totalPrice += product.price;
        console.log(totalPrice);
    })
}

//DISABLE BUTTON IF FORM IS NOT FILLED CORRECTLY
/*form.addEventListener("change",() => {
    if (form.checkValidity()) {
        document.getElementById('submit-cart').classList.remove('disabled');
    }
});*/

//AJAX POST, TOTAL PRICE AND PRODUCT LIST VALIDATION
//document.getElementById('submit-cart').addEventListener('click', async function (event) {
document.getElementById('order-info').addEventListener('submit', async function (event) {
    event.preventDefault();
    await ajaxPost({
        contact: {
            firstName: document.getElementById("surname").value,
            lastName: document.getElementById("name").value,
            address: document.getElementById("adress").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        },
        products: products
    })
    .then(function(e) {
        console.log(e);
        window.location = `order.html?id=${requestResult.orderId}`;
        window.localStorage.setItem('total-price', JSON.stringify(totalPrice));
        window.localStorage.setItem('order-content', JSON.stringify(products));
    });
});

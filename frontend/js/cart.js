let totalPrice = 0;
const form = document.getElementById('order-info');
let products = getCart();

//GET EACH ITEM IN CART TO DISPLAY
for (let product of products) {
    let url = path + '/teddies/' + product;
    ajax({}, url, "GET")
    .then(function(data) {
        let product = JSON.parse(data);
        displayProductBase(product, 'cart-list');
        totalPrice += product.price;
    })
}

//DISABLE BUTTON IF FORM IS NOT FILLED CORRECTLY
form.addEventListener("change",() => {
    if (form.checkValidity()) {
        document.getElementById('submit-cart').classList.remove('disabled');
    }
});

//AJAX POST, TOTAL PRICE AND PRODUCT LIST VALIDATION
document.getElementById('order-info').addEventListener('submit', function (event) {
    event.preventDefault();
    let url = path + '/teddies/order';
    let payload = JSON.stringify({
        contact: {
            firstName: document.getElementById("surname").value,
            lastName: document.getElementById("name").value,
            address: document.getElementById("adress").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        },
        products: products
    });
    ajax(payload, url, "POST")
    .then(function(data){
        window.localStorage.setItem('total-price', JSON.stringify(totalPrice));
        window.localStorage.setItem('order-content', JSON.stringify(products));
        let dataObject = JSON.parse(data);
        window.location = `order.html?id=${dataObject.orderId}`;
    })
});

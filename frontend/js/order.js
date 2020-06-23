let orderList = JSON.parse(window.localStorage.getItem('order-content'));

//DISPLAY ORDER
//displayOrderRecap();
fetchCart();

/**
 * Display product list, total price and order id
 */
function displayOrderRecap () {
    for (let product of orderList) {
        let url = basePath + "/teddies/" + product;
        ajax({}, url, "GET")
        .then(function(data) {
            displayProductRow(JSON.parse(data), 'order-recap');
            document.getElementById('total-price').innerHTML = window.localStorage.getItem('total-price');
            document.getElementById('order-id-number').innerHTML = getParameter('id');
        })
    }
}

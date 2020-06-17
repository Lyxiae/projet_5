let orderList = JSON.parse(window.localStorage.getItem('order-content'));

//DISPLAY ORDER
for (let product of orderList) {
    let url = path + "/teddies/" + product;
    ajax({}, url, "GET")
    .then(function(data) {
        displayProductBase(JSON.parse(data), 'order-recap');
        document.getElementById('total-price').innerHTML = window.localStorage.getItem('total-price');
        document.getElementById('order-id-number').innerHTML = getParameterByName('id');
    })
}
const path = 'http://localhost:3000/api';


const requestTeddy = (id) => {
    ajaxGet(path + '/teddies/' + id, (responseText) => {
        let teddy = JSON.parse(responseText);
        console.log(teddy);
        displayProduct(teddy);
    }) 
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam') ;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var itemId = getParameterByName('id');
var itemName = getParameterByName('name');


console.log(itemId);
console.log(itemName);

requestTeddy(itemId);
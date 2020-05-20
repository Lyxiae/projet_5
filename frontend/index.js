const commandResult = document.getElementById('command-recap');
const formId = document.getElementById('command-form');
const choice = document.getElementById('teddies-choice');
const colors = document.getElementById('teddies-colors');
const quantity = document.getElementById('quantity');
const path = 'http://localhost:3000/api';

/* REQUETE LISTE DE PRODUITS */
let productId = [];
let idUrl = [];


console.log(productId);

requestTeddies();


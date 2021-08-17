
// on déclare un tableau vide
let arrCartItems = [];

// on récupère l'objet stocké dans le localstorage
function getFromCart() {
// on vérifie que ça fonctionne
  if (window.localStorage) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    return cartItems;
  } else {
    alert('Version navigateur obsolète');
  }
};

// on utilise une fonction qui va parcourir les objets et les afficher
function createCartItems(cartItems) {
  for (const cartItem of cartItems) {
    createCartItem(cartItem);
  };
};

// on créé une fonction qui va afficher les données du localstorage dans le DOM
function createCartItem(cartItem) {
  const container = document.getElementById('container')
  
  const divRow = document.createElement('div');
  divRow.classList = "row align-items-center"
  container.appendChild(divRow);
  
  const divImg = document.createElement('div');
  divImg.classList = "col";
  const imgTeddy = document.createElement('img');
  imgTeddy.src = cartItem.img;
  imgTeddy.alt = cartItem.name;
  imgTeddy.classList = "img";
  divRow.appendChild(divImg);
  divImg.appendChild(imgTeddy);
  
  const teddyName = document.createElement('div');
  teddyName.classList = "col";
  teddyName.textContent = cartItem.name;
  divRow.appendChild(teddyName);
  
  const teddyColor = document.createElement('div');
  teddyColor.classList = "col";
  teddyColor.textContent = cartItem.color;
  divRow.appendChild(teddyColor);
  
  const teddyPrice = document.createElement('div');
  teddyPrice.classList = "col";
  teddyPrice.textContent = cartItem.price + " gils";
  divRow.appendChild(teddyPrice);
};

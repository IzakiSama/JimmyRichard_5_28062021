getFromCart();

// on récupère l'objet stocké dans le localstorage
function getFromCart() {

// on vérifie qu'il existe
  if (window.localStorage) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    createCartItems(cartItems);
  } else {
    alert('CPT');
  }
};

// on utilise une fonction qui va parcourir les objets et les affichés
function createCartItems(cartItems) {
  for (const cartItem of cartItems) {
    createCartItem(cartItem);
  };
};

// on créé une fonction qui va affiché les données du localstorage dans le DOM
function createCartItem(cartItem) {

  const container = document.getElementById('container')

  const divRow = document.createElement('div');
  divRow.classList = "row row-cols-5"
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
  teddyPrice.textContent = cartItem.price;
  divRow.appendChild(teddyPrice);

  const delItem = document.createElement('button');
  delItem.classList = "col delItem";
  delItem.type = "button";
  divRow.appendChild(delItem);
  delItem.addEventListener('click', deleteItemInCart)

  const delIcon = document.createElement('i');
  delIcon.classList = "fas fa-trash-alt";
  delItem.appendChild(delIcon);
};

// supprime objet du localStorage
function deleteItemInCart() {
  localStorage.removeItem('cart');
};
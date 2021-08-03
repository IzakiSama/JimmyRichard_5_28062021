
// windows.location.search = ?id=5be9c8541c9d440000665243;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
// console.log(id);

// On appelle l'API avec fetch et on ajoute l'id 
fetch("http://localhost:3000/api/teddies/" + id)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(teddy) {
  // console.log(teddies);
  createTeddy(teddy);
  if ( getFromCart() != null ) {
      arrCartItems = getFromCart()
  }
})
.catch(function(_err) {
  // Une erreur est survenue
});

// On crée une fonction qui crée des éléments dans le DOM
function createTeddy(teddy) {
  const divProduct = document.getElementById('product');

  // ajoute l'image du produit
  const imgTeddy = document.createElement('img');
  imgTeddy.src = teddy.imageUrl;
  imgTeddy.alt = teddy.name;
  divProduct.appendChild(imgTeddy);

  // ajoute le nom du produit
  const paraName = document.createElement('p');
  paraName.id = "name";
  paraName.textContent = teddy.name;
  divProduct.appendChild(paraName);

  // ajoute la description du produit
  const paraDescription = document.createElement('p');
  paraDescription.textContent = teddy.description;
  paraDescription.classList = "description";
  divProduct.appendChild(paraDescription);
  
  // ajoute le prix du produit
  const paraPrice = document.createElement('p');
  const spanPrice = document.createElement('span');
  spanPrice.id = "price";
  paraPrice.textContent = "Gils ";
  spanPrice.textContent = teddy.price;
  divProduct.appendChild(paraPrice);
  paraPrice.appendChild(spanPrice);

  
  // ajoute une liste pour les couleurs du produit
  const labelColor = document.createElement('label');
  labelColor.for = "color-select";
  labelColor.textContent = "Choississez une couleur :"
  const selectColors = document.createElement('select');
  selectColors.name = "colors";
  selectColors.id = "colors";
  for (const i in teddy.colors) {
    const listColor = document.createElement('option');
    listColor.textContent = teddy.colors[i];
    listColor.value = teddy.colors[i];
    selectColors.appendChild(listColor);
  }
  divProduct.appendChild(labelColor);
  divProduct.appendChild(selectColors);

  // ajoute lien vers panier
  const btnAddToCart = document.createElement('button');
  btnAddToCart.id = "cart";
  btnAddToCart.type = "submit";
  btnAddToCart.classList = "btn btn-primary";
  btnAddToCart.textContent = "Ajouter au panier";
  divProduct.appendChild(btnAddToCart);
  btnAddToCart.addEventListener('click', addToCart);
};

// Fonction permettant d'ajouter un produit au panier(localstorage)
function addToCart() {
  const price = document.getElementById('price').textContent;
  const name = document.getElementById('name').textContent;
  const img = document.querySelector('img').src;
  const color = document.getElementById('colors').value;
  
  const cartItem = {
    price : price,
    name : name,
    img : img,
    color : color,
    id : id
  };

  arrCartItems.push(cartItem);
  
  localStorage.setItem("cart", JSON.stringify(arrCartItems));
  
  alert(name + " " + color + " a été ajouté au panier !");
};
  
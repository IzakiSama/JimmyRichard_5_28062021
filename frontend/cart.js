
if ( getFromCart() != null ) {
  arrCartItems = getFromCart()
  createCartItems(arrCartItems);

  const totalSum = totalSumOfCart(arrCartItems);
  createDivSum(totalSum);  
};

function createDivSum(totalSum) {
  const sumContainer = document.getElementById('container');
  
  const divSum = document.createElement('div');
  divSum.id = "sum";
  divSum.textContent = "Sous-total " + totalSum + " gils";
  sumContainer.appendChild(divSum);
};

// fonction qui calcule la somme totale des produits
function totalSumOfCart(arrCartItems) {
  let somme = 0;
  for (const cartItem of arrCartItems) {
    somme += parseInt(cartItem.price)
  }
  return somme;
};

// supprime objet du localStorage
const deleteCart = document.getElementById('cancelBtn');
deleteCart.addEventListener('click', deleteItemInCart);
function deleteItemInCart() {
  localStorage.removeItem('cart');
};

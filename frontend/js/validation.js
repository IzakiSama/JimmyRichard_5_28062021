
const order = getOrder()
showValidation(order)

function getOrder() {
// on vérifie que tout fonctionne
  if (window.localStorage) {
    const order = JSON.parse(localStorage.getItem('order'));
    return order;
    // console.log(order)
  } else {
    alert('Version navigateur obsolète');
  }
};

function showValidation() {
  const validateForm = document.getElementById('validateForm');

  const divRow = document.createElement('div');
  validateForm.appendChild(divRow);

  const price = document.createElement('p');
  price.textContent = 
    "Merci pour votre commande d'un total de " + order.totalPrice + " gils";
  divRow.appendChild(price);

  const id = document.createElement('p');
  id.textContent = "Avec l'identifiant : "
  id.textContent += order.id;
  divRow.appendChild(id);

  const linkAccueil = document.createElement('a')
  linkAccueil.href = "index.html"
  validateForm.appendChild(linkAccueil);

  const returnToIndex = document.createElement('btn');
  returnToIndex.id = "returnToIndex";
  returnToIndex.classList = "btn btn-primary";
  returnToIndex.textContent = "Retourner à l'accueil";
  linkAccueil.appendChild(returnToIndex);
};

const deleteOrderLocalStorage = document.getElementById('returnToIndex');
deleteOrderLocalStorage.addEventListener('click', cleanLocalStorage);

function cleanLocalStorage() {
  localStorage.removeItem('order');
  localStorage.removeItem('cart');
};


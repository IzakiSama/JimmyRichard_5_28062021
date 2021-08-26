
if ( getFromCart() != null ) {
  arrCartItems = getFromCart()
  createCartItems(arrCartItems);

  const totalSum = totalSumOfCart(arrCartItems);
  createDivSum(totalSum);
};

// console.log(arrCartItems)

function createDivSum(totalSum) {
  const sumContainer = document.getElementById('container');
  
  const divSum = document.createElement('div');
  divSum.id = "sum";
  divSum.textContent = "Sous-total " + totalSum + " gils";
  sumContainer.appendChild(divSum);

};
// console.log(createDivSum())

// fonction qui calcule la somme totale des produits
function totalSumOfCart(arrCartItems) {
  let somme = 0;
  for (const cartItem of arrCartItems) {
    somme += parseInt(cartItem.price)
  }
  return somme;
};

// supprime objet du localStorage
const deleteCart = document.getElementById('cancelCartBtn');
deleteCart.href = "index.html";
deleteCart.addEventListener('click', deleteItemInCart);
function deleteItemInCart() {
  localStorage.removeItem('cart');
  localStorage.removeItem('order');
  alert("Commande supprimée !");
};

function getOrderInfos(event) {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('emailAdress').value;

  const contact = {
    firstName : firstName,
    lastName : lastName,
    address : address,
    city : city,
    email : email
  }
  // console.log(contact)
  
  const products = [];
  for (const cartItem of arrCartItems) {
    products.push(cartItem.id)
  } if (arrCartItems == 0) {
    alert('Votre panier est vide')
  } else {
    // console.log(products)
    const orderInfos = {
      contact,
      products
    }
    sendOrderInfos(orderInfos)
    // console.log(orderInfos)
  }
  event.preventDefault();
};
// console.log(getOrderInfos())

function sendOrderInfos(orderInfos) {
  if (window.fetch) {
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(orderInfos)
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data.orderId);
      const order = {
          totalPrice : totalSumOfCart(arrCartItems),
          id : data.orderId
        }
      saveOrderInfos(order)
      redirectToValidation()
    })
    .catch(function(error) {
      alert("Une erreur est survenue " + error)
    });
  } else {
    alert('Version navigateur obsolète');
  };
}

function redirectToValidation() {
  window.location.replace("validation.html");
}

const validateBtn = document.getElementById('form');
validateBtn.addEventListener('submit', getOrderInfos);
  
function saveOrderInfos(order) {
  localStorage.setItem("order", JSON.stringify(order));
  // console.log(order)
};

  // validateBtn.href = "validation.html";
  // window.location.replace("validation.html");
  // window.location.assign("validation.html");
  // window.location.href = "validation.html";
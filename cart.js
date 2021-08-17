
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
deleteCart.addEventListener('click', deleteItemInCart);
function deleteItemInCart() {
  localStorage.removeItem('cart');
  alert("Commande supprimée !");
};

function getOrderInfos() {
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
  }
  // console.log(products)

  const orderInfos = {
    contact,
    products
  }
  sendOrderInfos(orderInfos)
  // console.log(orderInfos)
};

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
    })
    .catch(function(error) {
      alert("Une erreur est survenue " + error)
    });
  } else {
    alert('Version navigateur obsolète');
  };
}

const validateBtn = document.getElementById('validateCartBtn');
validateBtn.href = "validation.html"
validateBtn.addEventListener('click', getOrderInfos);

function saveOrderInfos(order) {
  localStorage.setItem("order", JSON.stringify(order));
  // console.log(order)
}

// On appelle l'API avec fetch
if (window.fetch) {
  fetch("http://localhost:3000/api/teddies")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(teddies) {
      // console.log(teddies);
      createTeddies(teddies);
    })
    .catch(function(err) {
      console.log("Une erreur est survenue" + err )
    });
  
  // On crée une fonction qui parcourt les valeurs de l'API
  function createTeddies (teddies) {
    for (const teddy of teddies) {
      createTeddy(teddy);
    }
  };
} else {
  alert('Version navigateur obsolète');
}

// On crée une fonction qui crée des éléments dans le DOM
function createTeddy(teddy) {
  const divProducts = document.getElementById('products');
  
  const divElement = document.createElement('div');
  divElement.classList = "divElement";
  divProducts.appendChild(divElement);

  const imgTeddy = document.createElement('img');
  imgTeddy.src = teddy.imageUrl;
  imgTeddy.alt = teddy.name;
  divElement.appendChild(imgTeddy);

  const paraName = document.createElement('p');
  paraName.textContent = teddy.name;
  divElement.appendChild(paraName);

  const paraPrice = document.createElement('p');
  paraPrice.textContent = teddy.price + " gils";
  divElement.appendChild(paraPrice);

  const linkDetail = document.createElement('a');
  linkDetail.classList = "btnDetail"
  linkDetail.href = "product.html?id=" + teddy._id;
  linkDetail.textContent = "+ de détails";
  divElement.appendChild(linkDetail);
};


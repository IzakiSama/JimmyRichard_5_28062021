
// On appelle l'API avec fetch
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
    // Une erreur est survenue
  });

// On crée une fonction qui parcourt les valeurs de l'API
function createTeddies (teddies) {
  for (const teddy of teddies) {
    createTeddy(teddy);
  }
};

// On crée une fonction qui crée des éléments dans le DOM
function createTeddy(teddy) {
  const divProducts = document.getElementById('products');
  
  const imgTeddy = document.createElement('img');
  imgTeddy.src = teddy.imageUrl;
  imgTeddy.alt = teddy.name;
  divProducts.appendChild(imgTeddy);

  const paraName = document.createElement('p');
  paraName.textContent = teddy.name;
  divProducts.appendChild(paraName);

  const paraPrice = document.createElement('p');
  paraPrice.textContent = teddy.price;
  divProducts.appendChild(paraPrice);

  const linkDetail = document.createElement('a');
  linkDetail.href = "produit.html?id=" + teddy._id;
  linkDetail.textContent = "+ de détails";
  divProducts.appendChild(linkDetail);
};


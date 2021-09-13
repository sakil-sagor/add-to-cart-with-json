// api call fucntion 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    // my cart area balance dynamic update code 
    div.innerHTML = `<div class="single-product">
      <div>
         <img class="product-image" src="${image}" >
      </div>
      <h3 >${product.title}</h3>
      <p class="category">Category: ${product.category}</p>
      <h4>Rating: ${product.rating.rate} ( ${product.rating.count} Reviews) </h4>
      <h2>Price: $${product.price}</h2>
      <div class="button-group" >
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now search-button">Add to cart</button>
        <button id="details-btn" class="search-button">Details</button></div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// input value code 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted <= 200) {
    setInnerText("delivery-charge", 20); // under $200 delivery charge 20 and no tax
  }
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);//  delivery charge 30 and tax 20%
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);//  delivery charge 50 and tax 30%
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);//  delivery charge 60 and tax 40%
  }
  updateTotal(); // total price function call
};
//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



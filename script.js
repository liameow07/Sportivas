// Dados dos produtos
const products = [
    { id: 1, name: "Tênis de Corrida", image: "images/tenis.jpg", price: 299.90, description: "Tênis confortável para corrida." },
    { id: 2, name: "Camiseta Esportiva", image: "images/camiseta.jpg", price: 79.90, description: "Camiseta leve e respirável." },
    { id: 3, name: "Bola de Futebol", image: "images/bola.jpg", price: 49.90, description: "Bola de futebol oficial." },
];

// Carregar produtos na página inicial
function displayProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="viewProduct(${product.id})">Ver Detalhes</button>
        `;
        productList.appendChild(productCard);
    });
}

// Função para exibir detalhes de um produto
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = "product.html";
}

// Exibir detalhes do produto na página product.html
function displayProductDetail() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    const productDetail = document.getElementById("product-detail");
    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    `;
}

// Adicionar produto ao carrinho
function addToCart(id) {
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Produto adicionado ao carrinho!");
}

// Exibir itens do carrinho em cart.html
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById("cart-items");
    if (cartItems.length === 0) {
        cartDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2)}</p>
            `;
            cartDiv.appendChild(itemDiv);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("product-list")) displayProducts();
    if (document.getElementById("product-detail")) displayProductDetail();
    if (document.getElementById("cart-items")) displayCart();
});

// Vérification connexion
if (localStorage.getItem("logged") !== "true") {
  location.href = "index.html";
}

// Sélection des éléments HTML
const tbody = document.querySelector("#productTable tbody");
const form = document.getElementById("addForm");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logout");

// Chargement des produits enregistrés (ou liste par défaut)
let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Souris sans fil", category: "Périphériques", stock: 45, price: 18.9 },
  { name: "Clavier mécanique", category: "Périphériques", stock: 5, price: 72 },
  { name: "Webcam HD", category: "Accessoires", stock: 0, price: 45.5 }
];

// Détermine le statut visuel selon stock
function getStatus(stock) {
  if (stock == 0) return <span class="badge out">Rupture</span>;
  if (stock < 10) return <span class="badge low">Stock faible</span>;
  return <span class="badge ok">En stock</span>;
}

// Affichage du tableau
function renderTable(data) {
  tbody.innerHTML = "";
  data.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td>${p.price.toFixed(2)} €</td>
        <td>${getStatus(p.stock)}</td>
      </tr>
    `;
  });
}

// Chargement initial
renderTable(products);

// Ajout de produit
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const stock = parseInt(document.getElementById("stock").value);
  const price = parseFloat(document.getElementById("price").value);
  products.push({ name, category, stock, price });
  localStorage.setItem("products", JSON.stringify(products));
  renderTable(products);
  form.reset();
});

// Recherche et filtrage
searchInput.addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

// Déconnexion
logoutBtn.onclick = () => {
  localStorage.removeItem("logged");
  location.href = "index.html";
};
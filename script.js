const username = "Marquezbertin";

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const reposContainer = document.getElementById("repos-container");
    const displayedRepos = new Set(); // Usar um Set para evitar duplicatas

    repos.forEach(repo => {
      if (!displayedRepos.has(repo.name)) { // Verifica se o repositório já foi exibido
        const repoElement = document.createElement("div");
        repoElement.className = "repo";
        repoElement.innerHTML = `
          <h3>
            <a href="${repo.html_url}" target="_blank" aria-label="Abrir repositório ${repo.name}">
              ${repo.name}
            </a>
          </h3>
          <p>${repo.description || "Sem descrição"}</p>
          <p><strong>Linguagem:</strong> ${repo.language || "Não especificada"}</p>
        `;
        reposContainer.appendChild(repoElement);
        displayedRepos.add(repo.name); // Adiciona o repositório ao Set
      }
    });
  })
  .catch(error => console.error("Erro ao buscar repositórios:", error));

// Filtro de repositórios
const searchInput = document.getElementById("search-repos");
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const repos = document.querySelectorAll(".repo"); // Certifique-se de que os repositórios têm a classe "repo"
  
  repos.forEach(repo => {
    const repoName = repo.querySelector("h3").textContent.toLowerCase();
    repo.style.display = repoName.includes(query) ? "block" : "none";
  });
});

// Tema escuro/claro
const toggleTheme = document.createElement("button");
toggleTheme.textContent = "Alternar Tema";
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
document.body.prepend(toggleTheme);
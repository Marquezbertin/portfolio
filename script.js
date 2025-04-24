const username = "Marquezbertin";

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const reposContainer = document.getElementById("repos-container");
    const displayedRepos = new Set(); // Usar um Set para evitar duplicatas

    repos
      .filter(repo => !repo.private) // Filtra apenas repositórios públicos
      .forEach(repo => {
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

const themeSelector = document.getElementById("theme");

themeSelector.addEventListener("change", (e) => {
  const selectedTheme = e.target.value;
  document.body.className = selectedTheme; // Define a classe do body como o tema selecionado
});

// Função para preencher os projetos no resumo
function populatePrintableProjects(repos) {
  const printableProjects = document.getElementById("printable-projects");
  printableProjects.innerHTML = ""; // Limpa o conteúdo anterior

  repos.forEach(repo => {
    const projectElement = document.createElement("div");
    projectElement.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "Sem descrição"}</p>
      <p><strong>Linguagem:</strong> ${repo.language || "Não especificada"}</p>
    `;
    printableProjects.appendChild(projectElement);
  });
}

// Botão de impressão
document.getElementById("print-button").addEventListener("click", () => {
  const printableContent = document.getElementById("printable-content");
  printableContent.style.display = "block"; // Torna o conteúdo visível para impressão
  window.print();
  printableContent.style.display = "none"; // Oculta novamente após a impressão
});

// Fetch de repositórios e preenchimento do resumo
fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const publicRepos = repos.filter(repo => !repo.private); // Filtra apenas repositórios públicos
    populatePrintableProjects(publicRepos); // Preenche os projetos no resumo
  })
  .catch(error => console.error("Erro ao buscar repositórios:", error));

// Abrir e fechar o popup de Experiências Profissionais
const experienceButton = document.getElementById("experience-button");
const experiencePopup = document.getElementById("experience-popup");
const closePopup = document.getElementById("close-popup");

experienceButton.addEventListener("click", () => {
  experiencePopup.style.display = "flex"; // Exibe o popup
});

closePopup.addEventListener("click", () => {
  experiencePopup.style.display = "none"; // Oculta o popup
});

// Fechar o popup ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === experiencePopup) {
    experiencePopup.style.display = "none";
  }
});
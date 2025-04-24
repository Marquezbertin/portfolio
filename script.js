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

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-articles");

  // Simulação de dados do blog (substitua pela URL da API ou feed RSS do blog)
  const blogArticles = [
    {
      title: "O Impacto da Inteligência Artificial no QA",
      description: "Descubra como a IA está transformando o mundo do Quality Assurance.",
      link: "https://www.despertarqa.net/post/despertar-para-qualidade-de-software-o-impacto-da-intelig%C3%AAncia-artificial-ia-em-qa"
    },
    {
      title: "Star Wars e QA: Lições de Qualidade de Software",
      description: "Uma abordagem criativa para entender os princípios do QA através do universo Star Wars.",
      link: "https://www.despertarqa.net/post/principais-desafios-na-carreira-de-um-qa-um-olhar-atrav%C3%A9s-da-lente-de-the-acolyte-star-wars"
    },
    {
      title: "Ferramentas Essenciais para Automação de Testes",
      description: "Conheça as ferramentas indispensáveis para profissionais de QA.",
      link: "https://www.despertarqa.net/post/analisar-e-corrigir-gargalos-a-jornada-dos-jedis-da-qualidade-de-software"
    }
  ];

  // Renderizar os artigos no HTML
  blogArticles.forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("blog-article");
    articleElement.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <a href="${article.link}" target="_blank" class="button">Leia mais</a>
    `;
    blogContainer.appendChild(articleElement);
  });
});
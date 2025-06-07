document.addEventListener("DOMContentLoaded", () => {
  const username = "Marquezbertin";

  const reposContainer = document.getElementById("repos-container");
  const searchInput = document.getElementById("search-repos");
  const toggleTheme = document.createElement("button");
  const themeSelector = document.getElementById("theme");
  const experiencePopup = document.getElementById("experience-popup");
  const experienceButton = document.getElementById("experience-button");
  const closePopup = document.getElementById("close-popup");
  const printableProjects = document.getElementById("printable-projects");
  const printButton = document.getElementById("print-button");
  const printableContent = document.getElementById("printable-content");
  const blogContainer = document.getElementById("blog-articles");

  // Verifica se o elemento existe antes de executar a lógica
  if (reposContainer) {
    fetchGitHubRepos();
  } else {
    console.error("Elemento #repos-container não encontrado.");
  }

  // Filtro de repositórios
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const repos = document.querySelectorAll(".repo");

      repos.forEach((repo) => {
        const repoName = repo.querySelector("h3").textContent.toLowerCase();
        repo.style.display = repoName.includes(query) ? "block" : "none";
      });
    });
  }

  // Botão de alternar tema
  toggleTheme.textContent = "Alternar Tema";
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  document.body.prepend(toggleTheme);

  // Seletor de tema com mudança de cores do popup
  if (themeSelector) {
    themeSelector.addEventListener("change", (e) => {
      const selectedTheme = e.target.value;
      setTheme(selectedTheme);

      if (experiencePopup) {
        if (selectedTheme === "dark") {
          experiencePopup.style.color = "#FFFFFF";
          experiencePopup.style.backgroundColor = "#000000";
        } else if (selectedTheme === "light") {
          experiencePopup.style.color = "#000000";
          experiencePopup.style.backgroundColor = "#FFFFFF";
        } else if (selectedTheme === "blue") {
          experiencePopup.style.color = "#FFFFFF";
          experiencePopup.style.backgroundColor = "#003366";
        } else if (selectedTheme === "green") {
          experiencePopup.style.color = "#FFFFFF";
          experiencePopup.style.backgroundColor = "#004d00";
        } else {
          experiencePopup.style.color = "";
          experiencePopup.style.backgroundColor = "";
        }
      }
    });
  }

  // Preencher os projetos na seção de impressão
  function populatePrintableProjects(repos) {
    if (!printableProjects) return;
    printableProjects.innerHTML = "";

    repos.forEach((repo) => {
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
  if (printButton && printableContent) {
    printButton.addEventListener("click", () => {
      printableContent.style.display = "block";
      window.print();
      printableContent.style.display = "none";
    });
  }

  // Abrir e fechar popup de experiência
  if (experienceButton && experiencePopup && closePopup) {
    experienceButton.addEventListener("click", () => {
      experiencePopup.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
      experiencePopup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === experiencePopup) {
        experiencePopup.style.display = "none";
      }
    });
  }

  // Dados do blog simulados
  const blogArticles = [
    {
      title: "O Impacto da Inteligência Artificial no QA",
      description: "Descubra como a IA está transformando o mundo do Quality Assurance.",
      link: "https://www.despertarqa.net/post/despertar-para-qualidade-de-software-o-impacto-da-intelig%C3%AAncia-artificial-ia-em-qa",
    },
    {
      title: "Star Wars e QA: Lições de Qualidade de Software",
      description: "Uma abordagem criativa para entender os princípios do QA através do universo Star Wars.",
      link: "https://www.despertarqa.net/post/principais-desafios-na-carreira-de-um-qa-um-olhar-atrav%C3%A9s-da-lente-de-the-acolyte-star-wars",
    },
    {
      title: "Ferramentas Essenciais para Automação de Testes",
      description: "Conheça as ferramentas indispensáveis para profissionais de QA.",
      link: "https://www.despertarqa.net/post/analisar-e-corrigir-gargalos-a-jornada-dos-jedis-da-qualidade-de-software",
    },
  ];

  if (blogContainer) {
    blogArticles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("blog-article");
      articleElement.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.link}" target="_blank" class="button">Leia mais</a>
      `;
      blogContainer.appendChild(articleElement);
    });
  }
});

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.body.className = theme;
}

// Recuperar tema salvo
const savedTheme = localStorage.getItem("theme") || "default";
document.body.className = savedTheme;

function fetchGitHubRepos() {
  const selectedRepos = [
    "QualityHub",
    "art-of-software-testing",
    "listadetarefas_qualityAssurance",
    "formacaoScrumMaster",
  ];

  fetch("https://api.github.com/users/Marquezbertin/repos", {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // Certifique-se de que o token está correto
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar repositórios: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const reposContainer = document.getElementById("repos-container");
      if (reposContainer) {
        const filteredRepos = data.filter((repo) =>
          selectedRepos.includes(repo.name)
        );

        reposContainer.innerHTML = filteredRepos
          .map(
            (repo) => `
          <div>
            <h3>${repo.name}</h3>
            <p>${repo.description || "Sem descrição disponível."}</p>
            <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
          </div>
        `
          )
          .join("");
      }
    })
    .catch((error) => {
      console.error(error);
      const reposContainer = document.getElementById("repos-container");
      if (reposContainer) {
        reposContainer.innerHTML =
          "<p>Erro ao carregar os repositórios. Por favor, tente novamente mais tarde.</p>";
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const reposContainer = document.getElementById("repos-container");
  if (reposContainer) {
    fetchGitHubRepos();
  } else {
    console.error("Elemento #repos-container não encontrado.");
  }
});

const username = "Marquezbertin";

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const reposContainer = document.getElementById("repos-container");
    repos.forEach(repo => {
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
    });
  })
  .catch(error => console.error("Erro ao buscar repositórios:", error));
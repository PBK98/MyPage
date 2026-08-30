const GITHUB_USERNAME = "pbk98";
const projectList = document.querySelector("[data-project-list]");
const projectStatus = document.querySelector("[data-project-status]");
const filterList = document.querySelector("[data-filter-list]");

const projectState = {
  repos: [],
  status: "loading",
  filter: "All",
  error: "",
};

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });

const getLanguages = (repos) => {
  const languages = repos.map(({ language }) => language).filter(Boolean);
  return ["All", ...new Set(languages)];
};

const getFilteredRepos = () => {
  if (projectState.filter === "All") {
    return projectState.repos;
  }

  return projectState.repos.filter(({ language }) => language === projectState.filter);
};

const renderFilters = () => {
  const languages = getLanguages(projectState.repos);
  filterList.innerHTML = languages
    .map(
      (language) => `
        <button class="filter-button ${projectState.filter === language ? "active" : ""
        }" type="button" data-filter="${escapeHTML(language)}">
          ${escapeHTML(language)}
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      projectState.filter = button.dataset.filter;
      renderProjects();
    });
  });
};

const renderProjects = () => {
  projectList.innerHTML = "";

  if (projectState.status === "loading") {
    projectStatus.textContent = "로딩 중...";
    filterList.innerHTML = "";
    return;
  }

  if (projectState.status === "error") {
    projectStatus.innerHTML = `
      프로젝트를 불러올 수 없습니다.
      <button class="filter-button" type="button" data-retry>다시 시도</button>
    `;
    document.querySelector("[data-retry]").addEventListener("click", fetchRepos);
    filterList.innerHTML = "";
    return;
  }

  const filteredRepos = getFilteredRepos();
  renderFilters();

  if (filteredRepos.length === 0) {
    projectStatus.textContent = "표시할 프로젝트가 없습니다.";
    return;
  }

  projectStatus.textContent = `${filteredRepos.length}개의 프로젝트를 표시합니다.`;
  projectList.innerHTML = filteredRepos
    .map(
      ({ name, description, html_url, stargazers_count, language }) => `
        <article class="project-card">
          <h3>${escapeHTML(name)}</h3>
          <p>${escapeHTML(description || "설명이 아직 등록되지 않은 저장소입니다.")}</p>
          <div class="project-meta">
            <span>★ ${stargazers_count}</span>
            <span>${escapeHTML(language || "No language")}</span>
          </div>
          <a class="button secondary" href="${html_url}" target="_blank" rel="noreferrer">
            GitHub에서 보기
          </a>
        </article>
      `
    )
    .join("");
};

const fetchRepos = async () => {
  projectState.status = "loading";
  projectState.error = "";
  renderProjects();

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    projectState.repos = repos;
    projectState.status = "success";
  } catch (error) {
    projectState.error = error.message;
    projectState.status = "error";
  }

  renderProjects();
};

fetchRepos();

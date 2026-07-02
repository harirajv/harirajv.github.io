export function parseProjectTags(tags = "") {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function loadPortfolioSections() {
  const response = await fetch("/assets/projects.json");

  if (!response.ok) {
    throw new Error("Unable to load projects");
  }

  const data = await response.json();

  if (Array.isArray(data.projects)) {
    return {
      platformProjects: data.projects,
      earlierProjects: []
    };
  }

  return {
    platformProjects: data.platformProjects || [],
    earlierProjects: data.earlierProjects || []
  };
}

export async function loadProjects() {
  const { platformProjects, earlierProjects } = await loadPortfolioSections();
  return [...platformProjects, ...earlierProjects];
}

export function projectImagePath(imageSrc) {
  return `/assets/img/portfolio/${imageSrc}`;
}

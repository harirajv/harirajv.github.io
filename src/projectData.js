export function parseProjectTags(tags = "") {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function loadProjects() {
  const response = await fetch("/assets/projects.json");

  if (!response.ok) {
    throw new Error("Unable to load projects");
  }

  const data = await response.json();
  return data.projects || [];
}

export function projectImagePath(imageSrc) {
  return `/assets/img/portfolio/${imageSrc}`;
}

const DATA_URL = './data/profile.json';

const state = {
  data: null,
  locale: null,
  profileId: null,
  sections: [],
  observer: null,
};

async function main() {
  const data = await loadData();
  state.data = data;
  state.locale = data.defaultLocale || Object.keys(data.locales)[0];
  state.profileId = data.profiles?.[0]?.id;

  initSelectors();
  renderAll();
}

async function loadData() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error('No se pudo cargar la información del perfil');
  }
  return response.json();
}

function initSelectors() {
  const profileSelect = document.getElementById('profile-select');
  const languageSelect = document.getElementById('language-select');

  state.data.profiles.forEach((profile) => {
    const option = document.createElement('option');
    option.value = profile.id;
    option.textContent = getProfileLabel(profile, state.locale);
    profileSelect.appendChild(option);
  });

  Object.keys(state.data.locales).forEach((localeKey) => {
    const option = document.createElement('option');
    option.value = localeKey;
    option.textContent = localeKey.toUpperCase();
    languageSelect.appendChild(option);
  });

  profileSelect.value = state.profileId;
  languageSelect.value = state.locale;

  profileSelect.addEventListener('change', (event) => {
    state.profileId = event.target.value;
    renderAll();
  });

  languageSelect.addEventListener('change', (event) => {
    state.locale = event.target.value;
    updateProfileLabels();
    renderAll();
  });
}

function updateProfileLabels() {
  const profileSelect = document.getElementById('profile-select');
  Array.from(profileSelect.options).forEach((option) => {
    const profile = state.data.profiles.find((p) => p.id === option.value);
    if (profile) {
      option.textContent = getProfileLabel(profile, state.locale);
    }
  });
}

function renderAll() {
  const localeStrings = getLocaleStrings();
  const profile = getProfileData();

  document.documentElement.lang = state.locale;

  renderBrand(localeStrings);
  renderControls(localeStrings);
  renderCTA(localeStrings);

  const sections = buildSections(localeStrings);
  state.sections = sections;

  buildMenu(sections);
  renderSections(sections, profile, localeStrings);

  if (state.observer) {
    state.observer.disconnect();
  }
  observeSections();
}

function getProfileLabel(profile, locale) {
  if (profile.labels) {
    return profile.labels[locale] || profile.labels[state.data.defaultLocale] || profile.id;
  }
  return profile.id;
}

function getLocaleStrings() {
  return state.data.locales[state.locale] || state.data.locales[state.data.defaultLocale];
}

function getProfileData() {
  const fallbackProfile = state.data.profiles[0];
  const profile = state.data.profiles.find((p) => p.id === state.profileId) || fallbackProfile;
  const profileLocale = profile.locales[state.locale] || profile.locales[state.data.defaultLocale];
  return profileLocale;
}

function renderBrand(localeStrings) {
  const brandName = document.getElementById('brand-name');
  const brandTag = document.getElementById('brand-tag');
  brandName.textContent = localeStrings.brand.name;
  brandTag.textContent = localeStrings.brand.tag;
}

function renderControls(localeStrings) {
  document.getElementById('profile-label').textContent = localeStrings.controls.profile;
  document.getElementById('language-label').textContent = localeStrings.controls.language;
}

function renderCTA(localeStrings) {
  document.getElementById('cta-prompt').textContent = localeStrings.cta.prompt;
  document.getElementById('cta-button').textContent = localeStrings.cta.button;
}

function buildSections(localeStrings) {
  const sectionsMap = localeStrings.sections;
  return [
    { id: 'inicio', label: sectionsMap.inicio.label, eyebrow: sectionsMap.inicio.eyebrow, title: sectionsMap.inicio.title, renderer: renderHero },
    { id: 'skills', label: sectionsMap.skills.label, eyebrow: sectionsMap.skills.eyebrow, title: sectionsMap.skills.title, renderer: renderSkills },
    { id: 'trayectoria', label: sectionsMap.trayectoria.label, eyebrow: sectionsMap.trayectoria.eyebrow, title: sectionsMap.trayectoria.title, renderer: renderTimeline },
    { id: 'proyectos', label: sectionsMap.proyectos.label, eyebrow: sectionsMap.proyectos.eyebrow, title: sectionsMap.proyectos.title, renderer: renderProjects },
    { id: 'servicios', label: sectionsMap.servicios.label, eyebrow: sectionsMap.servicios.eyebrow, title: sectionsMap.servicios.title, renderer: renderServices },
    { id: 'contacto', label: sectionsMap.contacto.label, eyebrow: sectionsMap.contacto.eyebrow, title: sectionsMap.contacto.title, renderer: renderContact },
  ];
}

function buildMenu(sections) {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  sections.forEach((section) => {
    const li = document.createElement('li');
    li.className = 'menu__item';
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = section.label;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(section.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(link);
    menu.appendChild(li);
  });
}

function createSection(eyebrow, title, id) {
  const template = document.getElementById('section-template');
  const node = template.content.firstElementChild.cloneNode(true);
  node.id = id;
  node.querySelector('.section__eyebrow').textContent = eyebrow;
  node.querySelector('.section__title').textContent = title;
  return node;
}

function renderSections(sections, profile, localeStrings) {
  const app = document.getElementById('app');
  app.innerHTML = '';

  sections.forEach((section) => {
    const node = createSection(section.eyebrow, section.title, section.id);
    section.renderer(node.querySelector('.section__body'), profile, localeStrings);
    app.appendChild(node);
  });
}

function renderHero(container, data, localeStrings) {
  const card = document.createElement('article');
  card.className = 'hero';
  const headline = document.createElement('h1');
  headline.className = 'hero__headline';
  headline.textContent = `${data.name} · ${data.role}`;
  const lead = document.createElement('p');
  lead.className = 'hero__lead';
  lead.textContent = `${data.headline} ${data.summary}`;

  const meta = document.createElement('p');
  meta.className = 'card__meta';
  meta.textContent = data.location;

  card.append(headline, lead, meta);
  container.appendChild(card);
}

function renderSkills(container, data, localeStrings) {
  const wrapper = document.createElement('div');
  wrapper.className = 'grid-2';

  const stackCard = document.createElement('div');
  stackCard.className = 'card';
  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = localeStrings.content.stackTitle;
  const badges = document.createElement('div');
  badges.className = 'badges';
  data.skills.forEach((skill) => {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = skill;
    badges.appendChild(badge);
  });
  stackCard.append(title, badges);

  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  data.skills.forEach((skill, index) => {
    const node = document.createElement('span');
    node.className = 'cloud__item';
    node.textContent = skill;
    const pos = getPosition(index, data.skills.length);
    node.style.left = pos.x;
    node.style.top = pos.y;
    node.style.animationDelay = `${(index % ANIMATION_DELAY_GROUPS) * ANIMATION_DELAY_MULTIPLIER}s`;
    cloud.appendChild(node);
  });

  wrapper.append(stackCard, cloud);
  container.appendChild(wrapper);
}

// Constants for position calculation
const BASE_RADIUS = 35;
const RADIUS_VARIANCE_GROUPS = 3;
const RADIUS_VARIANCE_STEP = 10;
const CENTER_OFFSET = 50;

// Constants for animation delay calculation
const ANIMATION_DELAY_GROUPS = 5;
const ANIMATION_DELAY_MULTIPLIER = 1.2;

function getPosition(index, total) {
  const angle = (index / total) * Math.PI * 2;
  const radius = BASE_RADIUS + (index % RADIUS_VARIANCE_GROUPS) * RADIUS_VARIANCE_STEP;
  const x = CENTER_OFFSET + Math.cos(angle) * radius;
  const y = CENTER_OFFSET + Math.sin(angle) * radius;
  return { x: `${x}%`, y: `${y}%` };
}

function renderTimeline(container, data) {
  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  [...data.timeline, ...data.education].forEach((item) => {
    const entry = document.createElement('article');
    entry.className = 'timeline__item';

    const heading = document.createElement('div');
    heading.className = 'timeline__heading';

    const title = document.createElement('h3');
    title.className = 'timeline__title';
    title.textContent = item.title;

    const meta = document.createElement('span');
    meta.className = 'timeline__meta';
    meta.textContent = item.period;

    heading.append(title, meta);

    const subtitle = document.createElement('p');
    subtitle.className = 'timeline__meta';
    subtitle.textContent = item.company || item.school;

    const desc = document.createElement('p');
    desc.className = 'timeline__desc';
    desc.textContent = item.description;

    entry.append(heading, subtitle, desc);
    timeline.appendChild(entry);
  });

  container.appendChild(timeline);
}

function renderProjects(container, data) {
  const projects = document.createElement('div');
  projects.className = 'projects';

  data.projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project';

    const title = document.createElement('h3');
    title.className = 'project__title';
    title.textContent = project.name;

    const desc = document.createElement('p');
    desc.className = 'timeline__desc';
    desc.textContent = project.description;

    const stack = document.createElement('div');
    stack.className = 'badges';
    project.stack.forEach((tech) => {
      const tag = document.createElement('span');
      tag.className = 'badge';
      tag.textContent = tech;
      stack.appendChild(tag);
    });

    const links = document.createElement('div');
    links.className = 'project__links';
    project.links.forEach((link) => {
      const anchor = document.createElement('a');
      anchor.className = 'link';
      anchor.href = link.url;
      anchor.textContent = link.label;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      links.appendChild(anchor);
    });

    card.append(title, desc, stack, links);
    projects.appendChild(card);
  });

  container.appendChild(projects);
}

function renderServices(container, data) {
  const list = document.createElement('div');
  list.className = 'services';
  data.services.forEach((service) => {
    const item = document.createElement('div');
    item.className = 'service';
    item.textContent = service;
    list.appendChild(item);
  });
  container.appendChild(list);
}

function renderContact(container, data) {
  const box = document.createElement('div');
  box.className = 'contact';

  const cta = document.createElement('p');
  cta.className = 'hero__lead';
  cta.textContent = data.contact.cta;

  const email = document.createElement('a');
  email.href = `mailto:${data.contact.email}`;
  email.textContent = data.contact.email;

  const phone = document.createElement('a');
  phone.href = `tel:${data.contact.phone.replace(/\s+/g, '')}`;
  phone.textContent = data.contact.phone;

  const site = document.createElement('a');
  site.href = data.contact.website;
  site.textContent = data.contact.website;
  site.target = '_blank';
  site.rel = 'noopener noreferrer';

  box.append(cta, email, phone, site);
  container.appendChild(box);
}

function observeSections() {
  const links = Array.from(document.querySelectorAll('.menu__item a'));
  state.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = links.find((l) => l.getAttribute('href') === `#${entry.target.id}`);
        if (link) {
          link.classList.toggle('is-active', entry.isIntersecting);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('section').forEach((section) => state.observer.observe(section));
}

main().catch((error) => {
  const app = document.getElementById('app');
  const message = document.createElement('p');
  message.textContent = error.message;
  app.appendChild(message);
});

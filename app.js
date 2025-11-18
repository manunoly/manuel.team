const DATA_URL = './data/profile.json';

const sections = [
  { id: 'inicio', label: 'Inicio', eyebrow: 'Presentación', title: 'Hola, soy Manuel Team', renderer: renderHero },
  { id: 'skills', label: 'Skills', eyebrow: 'Fortalezas', title: 'Stack y nube de conocimientos', renderer: renderSkills },
  { id: 'trayectoria', label: 'Trayectoria', eyebrow: 'Experiencia', title: 'Carrera y formación', renderer: renderTimeline },
  { id: 'proyectos', label: 'Proyectos', eyebrow: 'Portafolio', title: 'Selección de proyectos', renderer: renderProjects },
  { id: 'servicios', label: 'Servicios', eyebrow: 'Oferta', title: 'Cómo puedo ayudarte', renderer: renderServices },
  { id: 'contacto', label: 'Contacto', eyebrow: 'Conversemos', title: 'Hablemos de tu siguiente reto', renderer: renderContact }
];

async function main() {
  const data = await loadData();
  buildMenu();
  const app = document.getElementById('app');

  sections.forEach((section) => {
    const node = createSection(section.eyebrow, section.title, section.id);
    section.renderer(node.querySelector('.section__body'), data);
    app.appendChild(node);
  });

  observeSections();
}

async function loadData() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error('No se pudo cargar la información del perfil');
  }
  return response.json();
}

function buildMenu() {
  const menu = document.getElementById('menu');
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

function renderHero(container, data) {
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

function renderSkills(container, data) {
  const wrapper = document.createElement('div');
  wrapper.className = 'grid-2';

  const stackCard = document.createElement('div');
  stackCard.className = 'card';
  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = 'Stack principal';
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
    node.style.animationDelay = `${(index % 5) * 1.2}s`;
    cloud.appendChild(node);
  });

  wrapper.append(stackCard, cloud);
  container.appendChild(wrapper);
}

function getPosition(index, total) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 35 + (index % 3) * 10;
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;
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
      anchor.rel = 'noreferrer noopener';
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
  site.rel = 'noreferrer noopener';

  box.append(cta, email, phone, site);
  container.appendChild(box);
}

function observeSections() {
  const links = Array.from(document.querySelectorAll('.menu__item a'));
  const observer = new IntersectionObserver(
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

  document.querySelectorAll('section').forEach((section) => observer.observe(section));
}

main().catch((error) => {
  const app = document.getElementById('app');
  const message = document.createElement('p');
  message.textContent = error.message;
  app.appendChild(message);
});

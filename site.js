const services = [
  ['carro', 'Automotivo', 'Abertura de carros', 'A chave ficou dentro do carro? Informe o modelo do veículo e onde você está para solicitar atendimento.', 'Chaveiro abrindo a porta do motorista', 'abertura de carro'],
  ['porta', 'Residencial e comercial', 'Abertura de portas', 'Porta trancada ou chave perdida? Informe o tipo de porta e o local para pedir atendimento.', 'Chaveiro abrindo uma porta residencial de madeira', 'abertura de porta'],
  ['digital', 'Instalação', 'Fechaduras digitais', 'Vai instalar uma fechadura com senha, biometria ou cartão? Envie o modelo da fechadura e uma foto da porta para consultar a instalação.', 'Chaveiro instalando uma fechadura digital', 'instalação de fechadura digital'],
  ['cofre', 'Cofres', 'Abertura de cofres mecânicos', 'Se você perdeu acesso ao seu cofre, informe a marca, o modelo e o que aconteceu para solicitar uma avaliação.', 'Chaveiro abrindo um cofre mecânico com disco de combinação', 'abertura de cofre mecânico'],
  ['conserto', 'Manutenção', 'Conserto de fechaduras', 'Chave emperrando ou fechadura com folga? Conte o que está acontecendo para que a equipe avalie o reparo.', 'Chaveiro consertando uma fechadura na bancada', 'conserto de fechadura']
];

const buttons = [...document.querySelectorAll('[data-index]')];
const feature = document.querySelector('#servico-atual');
const image = document.querySelector('#service-image');
const whatsApp = 'https://wa.me/5541989017944';
const messageUrl = message => whatsApp + '?text=' + encodeURIComponent(message);
let current = 0;

function showService(index) {
  current = (index + services.length) % services.length;
  const [file, category, title, description, alt, request] = services[current];
  buttons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === current)));
  image.src = file + '.webp';
  image.alt = alt;
  document.querySelector('#service-category').textContent = category;
  document.querySelector('#service-title').textContent = title;
  document.querySelector('#service-description').textContent = description;
  document.querySelector('#service-contact').href = messageUrl('Olá! Preciso de ' + request + '.');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    feature.animate([{ opacity: .65, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260 });
  }
}

buttons.forEach((button, index) => button.addEventListener('click', () => showService(index)));
document.querySelector('#previous').addEventListener('click', () => showService(current - 1));
document.querySelector('#next').addEventListener('click', () => showService(current + 1));

document.querySelector('#request').addEventListener('submit', event => {
  event.preventDefault();
  const job = document.querySelector('#job').value;
  const district = document.querySelector('#district').value.trim();
  const location = district ? ' Estou em ' + district + '.' : '';
  window.location.href = messageUrl('Olá! Gostaria de um orçamento para: ' + job + '.' + location);
});

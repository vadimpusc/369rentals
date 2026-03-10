import '../styles/global.css';

export function mount(Component, props = {}) {
  const target = document.getElementById('app');
  if (!target) throw new Error('Missing #app');
  return new Component({ target, props });
}

export function selectPlan(id: string) {
  window.dispatchEvent(new CustomEvent('select-plan', { detail: id }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

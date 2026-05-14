export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', '#/' + sectionId);
  }
}

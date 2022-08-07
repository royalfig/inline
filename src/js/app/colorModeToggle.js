export function determineColorModeSupport() {
  const colorPrefButtons = document.querySelectorAll('.i-mode-button');

  const hasSupport = window.CSS && CSS.supports('color', 'var(--primary)');

  // If the browser doesn't support custom settings, hide buttons
  if (!hasSupport) {
    colorPrefButtons.forEach((e) => {
      e.style.display = 'none';
    });
  }
}

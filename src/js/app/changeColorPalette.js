import determineColorModeSupport from './colorModeToggle';

export default function changeColor() {
  determineColorModeSupport();
  const hex = document.documentElement.dataset.accentColor;
  const colorInput = document.querySelector('.i-color');
  colorInput.value = hex;
  // eslint-disable-next-line no-undef
  colorInput.addEventListener('change', generateColorPalette);
}

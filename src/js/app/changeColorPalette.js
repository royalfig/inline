import { determineColorModeSupport } from './colorModeToggle';
export default function changeColor() {
  determineColorModeSupport();
  const hex = document.documentElement.dataset.accentColor;
  const colorInput = document.querySelector('.i-color');
  colorInput.value = hex;
  colorInput.addEventListener('change', generateColorPalette);
}

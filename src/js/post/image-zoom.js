import mediumZoom from 'medium-zoom';

export default function imageZoom() {
  mediumZoom(
    document.querySelectorAll('.kg-image-card img, .kg-gallery-card img'),
    {
      background: 'var(--surface)',
    },
  );
}

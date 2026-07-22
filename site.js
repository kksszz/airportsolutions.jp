(() => {
  const targets = document.querySelectorAll('.product-image img, .detail-media img, .gallery img');
  if (!targets.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', '製品画像の拡大表示');
  lightbox.innerHTML = `
    <button class="image-lightbox-close" type="button" aria-label="拡大表示を閉じる">×</button>
    <div class="image-lightbox-content">
      <img class="image-lightbox-image" alt="">
      <p class="image-lightbox-caption"></p>
    </div>`;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector('.image-lightbox-image');
  const caption = lightbox.querySelector('.image-lightbox-caption');
  const closeButton = lightbox.querySelector('.image-lightbox-close');
  let previousFocus = null;

  function close() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    image.removeAttribute('src');
    if (previousFocus) previousFocus.focus();
  }

  function open(target) {
    previousFocus = target;
    image.src = target.currentSrc || target.src;
    image.alt = target.alt || '製品画面';
    const figureCaption = target.closest('figure')?.querySelector('figcaption')?.textContent;
    const mediaCaption = target.closest('.detail-media')?.querySelector('.caption')?.textContent;
    caption.textContent = figureCaption || mediaCaption || target.alt || '';
    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  targets.forEach((target) => {
    target.tabIndex = 0;
    target.setAttribute('role', 'button');
    target.setAttribute('aria-label', `${target.alt || '製品画像'}を拡大表示`);
    target.addEventListener('click', () => open(target));
    target.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(target);
      }
    });
  });

  closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
})();

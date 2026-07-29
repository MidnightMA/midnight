/* ==========================================================================
   MIDNIGHT — gallery.js
   Category filtering for the photography page. Swap the placeholder
   <img src> values in photography.html with real photos any time —
   the data-category attributes are all this script needs.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const matches = filter === 'all' || item.getAttribute('data-category') === filter;
        if (matches) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Simple lightbox ---------- */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close photo">&times;</button><img alt="">';
  lightbox.style.cssText = `
    position: fixed; inset: 0; z-index: 1000; display: none;
    align-items: center; justify-content: center;
    background: rgba(27, 58, 71, 0.82); padding: 24px;
  `;
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');
  lightboxImg.style.cssText = 'max-width: min(90vw, 720px); max-height: 82vh; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);';
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.style.cssText = 'position:absolute; top:24px; right:32px; font-size:2.5rem; line-height:1; color:#FFEDD5; background:none; border:none; cursor:pointer;';

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.style.display = 'flex';
    });
  });

  function closeLightbox() { lightbox.style.display = 'none'; }
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});

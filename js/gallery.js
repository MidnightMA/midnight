/* ==========================================================================
   MIDNIGHT — gallery.js
   The gallery is data-driven: every photo lives in the PHOTOS array below.
   To add, remove, or swap photos, just edit this array — nothing in
   photography.html needs to change.

   Fields:
     src      path to the image (swap placeholders for real photos any time)
     category one of: nature | street | architecture | random
     ratio    the photo's aspect ratio as "width/height", e.g. "3/4", "16/9",
              "1/1", "9/16". This isn't just cosmetic — setting it up front
              lets the browser reserve the right amount of space before the
              image finishes loading, so the masonry grid doesn't jump
              around as photos come in.
   ========================================================================== */

const PHOTOS = [
  { src: 'images/nature-01.svg',       category: 'nature',       ratio: '3/4'  },
  { src: 'images/nature-02.svg',       category: 'nature',       ratio: '4/3'  },
  { src: 'images/nature-03.svg',       category: 'nature',       ratio: '16/9' },
  { src: 'images/nature-04.svg',       category: 'nature',       ratio: '9/16' },
  { src: 'images/nature-05.svg',       category: 'nature',       ratio: '1/1'  },
  { src: 'images/nature-06.svg',       category: 'nature',       ratio: '4/3'  },

  { src: 'images/street-01.svg',       category: 'street',       ratio: '3/4'  },
  { src: 'images/street-02.svg',       category: 'street',       ratio: '4/3'  },
  { src: 'images/street-03.svg',       category: 'street',       ratio: '16/9' },
  { src: 'images/street-04.svg',       category: 'street',       ratio: '9/16' },
  { src: 'images/street-05.svg',       category: 'street',       ratio: '1/1'  },
  { src: 'images/street-06.svg',       category: 'street',       ratio: '4/3'  },

  { src: 'images/architecture-01.svg', category: 'architecture', ratio: '3/4'  },
  { src: 'images/architecture-02.svg', category: 'architecture', ratio: '4/3'  },
  { src: 'images/architecture-03.svg', category: 'architecture', ratio: '16/9' },
  { src: 'images/architecture-04.svg', category: 'architecture', ratio: '9/16' },
  { src: 'images/architecture-05.svg', category: 'architecture', ratio: '1/1'  },
  { src: 'images/architecture-06.svg', category: 'architecture', ratio: '4/3'  },

  { src: 'images/random-01.svg',       category: 'random',       ratio: '3/4'  },
  { src: 'images/random-02.svg',       category: 'random',       ratio: '4/3'  },
  { src: 'images/random-03.svg',       category: 'random',       ratio: '16/9' },
  { src: 'images/random-04.svg',       category: 'random',       ratio: '9/16' },
  { src: 'images/random-05.svg',       category: 'random',       ratio: '1/1'  },
  { src: 'images/random-06.svg',       category: 'random',       ratio: '4/3'  },
];

const CATEGORY_LABELS = {
  nature: 'Nature',
  street: 'Street',
  architecture: 'Architecture',
  random: 'Random moment',
};

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  /* ---------- Render the masonry grid from PHOTOS ---------- */
  PHOTOS.forEach((photo, i) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item reveal';
    figure.classList.add(`d${(i % 6) + 1}`);
    figure.setAttribute('data-category', photo.category);

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = `${CATEGORY_LABELS[photo.category] || photo.category} photograph`;
    img.loading = 'lazy';
    img.style.aspectRatio = photo.ratio;

    const caption = document.createElement('figcaption');
    caption.className = 'gallery-caption';
    caption.textContent = CATEGORY_LABELS[photo.category] || photo.category;

    figure.appendChild(img);
    figure.appendChild(caption);
    grid.appendChild(figure);
  });

  const galleryItems = grid.querySelectorAll('.gallery-item');

  /* ---------- Scroll reveal for the freshly-rendered items ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    galleryItems.forEach(item => io.observe(item));
  } else {
    galleryItems.forEach(item => item.classList.add('is-visible'));
  }

  /* ---------- Category filtering ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const matches = filter === 'all' || item.getAttribute('data-category') === filter;
        item.style.display = matches ? '' : 'none';
      });
    });
  });

  /* ---------- Simple lightbox ---------- */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close photo">&times;</button><img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.aspectRatio = img.style.aspectRatio;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() { lightbox.classList.remove('open'); }
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});
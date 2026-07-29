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
  { src: 'images/PA100008.JPG',                 category: 'creative', ratio: '3/4'  }, // گلدون صورتی با سبزه
  { src: 'images/IMG_20251106_003505_842.jpg',  category: 'nature',   ratio: '1/1'  }, // ماه
  { src: 'images/DSCF9783.JPG',                 category: 'animals',  ratio: '4/3'  }, // گربه
  { src: 'images/DSCF8636.JPG',                 category: 'urban',    ratio: '3/4'  }, // برج آزادی
  { src: 'images/DSCF8506.JPG',                 category: 'urban',    ratio: '4/3'  }, // برف شهری
  { src: 'images/DSCF6810.JPG',                 category: 'urban',    ratio: '1/1'  }, // کوچه
  { src: 'images/DSCF4857.JPG',                 category: 'interior', ratio: '5/4'  }, // پنجره
  { src: 'images/DSCF4805.JPG',                 category: 'objects',  ratio: '4/3'  }, // گردو
  { src: 'images/DSCF3020.JPG',                 category: 'nature',   ratio: '3/2'  }, // غروب
  { src: 'images/DSCF2995.JPG',                 category: 'nature',   ratio: '3/4'  }, // حلزون
  { src: 'images/DSCF2805.JPG',                 category: 'objects',  ratio: '3/4'  }, // بطری کنار دریا
  { src: 'images/DSCF2786.JPG',                 category: 'objects',  ratio: '3/4'  }, // چای
  { src: 'images/DSCF2775.JPG',                 category: 'urban',    ratio: '3/4'  }, // دیوار و گل
  { src: 'images/DSCF1953.JPG',                 category: 'nature',   ratio: '16/9' }, // ابر
  { src: 'images/DSCF1910.JPG',                 category: 'nature',   ratio: '4/3'  }, // حفره و آسمان
  { src: 'images/DSCF1896.JPG',                 category: 'nature',   ratio: '3/4'  }, // گل
  { src: 'images/DSCF1860.JPG',                 category: 'nature',   ratio: '3/4'  }, // مسیر
  { src: 'images/DSCF1800.JPG',                 category: 'urban',    ratio: '3/4'  }, // برج خشتی
  { src: 'images/DSCF0870.JPG',                 category: 'nature',   ratio: '3/4'  }, // دشت
  { src: 'images/DSCF0827.JPG',                 category: 'nature',   ratio: '3/4'  }, // گل
  { src: 'images/DSCF0197.JPG',                 category: 'nature',   ratio: '4/3'  }, // گل و آسمان
];


const CATEGORY_LABELS = {
  nature: 'Nature',
  creative: 'Creative',
  animals: 'Animals',
  urban: 'Urban',
  interior: 'Interior',
  objects: 'Objects'
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
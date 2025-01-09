// main.js
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = [
    { icon: 'github', url: 'https://github.com/yourusername' },
    { icon: 'twitter', url: 'https://twitter.com/noataklol' },
    { icon: 'instagram', url: 'https://instagram.com/yourusername' },
    { icon: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
    { icon: 'mail', url: 'mailto:noataklol@gmail.com' }
  ];

  const favorites = {
    games: [
      { title: 'The Legend of Zelda: BOTW', year: '2017', rating: '10/10', image: '/api/placeholder/300/169' },
      { title: 'Red Dead Redemption 2', year: '2018', rating: '9.5/10', image: '/api/placeholder/300/169' },
      { title: 'Elden Ring', year: '2022', rating: '9.8/10', image: '/api/placeholder/300/169' },
      { title: 'God of War', year: '2018', rating: '9.7/10', image: '/api/placeholder/300/169' },
      { title: 'Cyberpunk 2077', year: '2020', rating: '9.0/10', image: '/api/placeholder/300/169' },
      { title: 'Ghost of Tsushima', year: '2020', rating: '9.3/10', image: '/api/placeholder/300/169' }
    ],
    movies: [
      { title: 'Inception', year: '2010', rating: '9.5/10', image: '/api/placeholder/300/169' },
      { title: 'The Dark Knight', year: '2008', rating: '10/10', image: '/api/placeholder/300/169' },
      { title: 'Pulp Fiction', year: '1994', rating: '9.8/10', image: '/api/placeholder/300/169' },
      { title: 'Interstellar', year: '2014', rating: '9.4/10', image: '/api/placeholder/300/169' },
      { title: 'The Matrix', year: '1999', rating: '9.6/10', image: '/api/placeholder/300/169' },
      { title: 'Goodfellas', year: '1990', rating: '9.7/10', image: '/api/placeholder/300/169' }
    ],
    shows: [
      { title: 'Breaking Bad', years: '2008-2013', rating: '10/10', image: '/api/placeholder/300/169' },
      { title: 'The Wire', years: '2002-2008', rating: '9.8/10', image: '/api/placeholder/300/169' },
      { title: 'Stranger Things', years: '2016-present', rating: '9.5/10', image: '/api/placeholder/300/169' },
      { title: 'The Sopranos', years: '1999-2007', rating: '9.9/10', image: '/api/placeholder/300/169' },
      { title: 'Game of Thrones', years: '2011-2019', rating: '9.4/10', image: '/api/placeholder/300/169' },
      { title: 'Better Call Saul', years: '2015-2022', rating: '9.7/10', image: '/api/placeholder/300/169' }
    ]
  };

  // Create social links
  const createSocialLinks = () => {
    const socialContainer = document.querySelector('.social-links');
    socialLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'text-white hover:text-white/70 transition-duration-300';
      a.innerHTML = `<i class="icon-${link.icon}"></i>`;
      socialContainer.appendChild(a);
    });
  };

  // Create scrollable row
  const createScrollableRow = (title, items, icon) => {
    const container = document.createElement('div');
    container.className = 'relative group mb-12';

    // Add title
    container.innerHTML = `
      <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2 px-4">
        <i class="icon-${icon}"></i>${title}
      </h2>
    `;

    // Add scroll buttons
    const leftButton = document.createElement('button');
    leftButton.className = 'scroll-button left hidden';
    leftButton.innerHTML = '&lt;';

    const rightButton = document.createElement('button');
    rightButton.className = 'scroll-button right hidden';
    rightButton.innerHTML = '&gt;';

    // Add scrollable content
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scroll-container';

    // Add items
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'scroll-item';
      itemDiv.innerHTML = `
        <div class="item-card">
          <img src="${item.image}" alt="${item.title}" />
          <div class="item-overlay">
            <h3>${item.title}</h3>
            <p>${item.year || item.years} • ${item.rating}</p>
          </div>
        </div>
      `;
      scrollContainer.appendChild(itemDiv);
    });

    // Add event listeners for scrolling
    leftButton.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Show/hide scroll buttons on hover
    container.addEventListener('mouseenter', () => {
      leftButton.classList.remove('hidden');
      rightButton.classList.remove('hidden');
    });

    container.addEventListener('mouseleave', () => {
      leftButton.classList.add('hidden');
      rightButton.classList.add('hidden');
    });

    container.appendChild(leftButton);
    container.appendChild(rightButton);
    container.appendChild(scrollContainer);

    return container;
  };

  // Initialize the page
  const init = () => {
    createSocialLinks();

    // Create favorite sections
    const favoritesContainer = document.querySelector('.favorites-container');
    favoritesContainer.appendChild(createScrollableRow('Favorite Games', favorites.games, 'gamepad'));
    favoritesContainer.appendChild(createScrollableRow('Favorite Movies', favorites.movies, 'film'));
    favoritesContainer.appendChild(createScrollableRow('Favorite Shows', favorites.shows, 'tv'));

    // Update copyright year
    document.querySelector('.copyright-year').textContent = new Date().getFullYear();
  };

  init();
});

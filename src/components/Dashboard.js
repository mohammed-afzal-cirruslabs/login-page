/**
 * Dashboard Component
 * Vanilla JavaScript component for displaying the dashboard view
 */

const Dashboard = {
  /**
   * Creates and returns the dashboard DOM element
   * @param {Object} options - Configuration options
   * @param {Function} options.onLogout - Callback function to handle logout
   * @returns {HTMLElement} The dashboard container element
   */
  create: function(options) {
    if (!options || typeof options.onLogout !== 'function') {
      throw new Error('Dashboard requires an onLogout callback function');
    }

    // Create main container
    const container = document.createElement('div');
    container.className = 'dashboard-container';

    // Create header
    const header = document.createElement('header');
    header.className = 'dashboard-header';

    const title = document.createElement('h1');
    title.className = 'dashboard-title';
    title.textContent = 'Dashboard';

    const logoutButton = document.createElement('button');
    logoutButton.className = 'logout-button';
    logoutButton.textContent = 'Log out';
    logoutButton.setAttribute('aria-label', 'Log out');
    logoutButton.addEventListener('click', options.onLogout);

    header.appendChild(title);
    header.appendChild(logoutButton);

    // Create main content
    const main = document.createElement('main');
    main.className = 'dashboard-content';

    // Create welcome card
    const welcomeCard = document.createElement('div');
    welcomeCard.className = 'welcome-card';

    const welcomeHeading = document.createElement('h2');
    welcomeHeading.textContent = 'Welcome!';

    const welcomeText = document.createElement('p');
    welcomeText.textContent = 'You have successfully logged in.';

    welcomeCard.appendChild(welcomeHeading);
    welcomeCard.appendChild(welcomeText);

    // Create dashboard grid
    const grid = document.createElement('div');
    grid.className = 'dashboard-grid';

    // Dashboard cards data
    const cards = [
      {
        title: 'Overview',
        description: 'View your account overview and recent activity.'
      },
      {
        title: 'Settings',
        description: 'Manage your account settings and preferences.'
      },
      {
        title: 'Profile',
        description: 'Update your profile information and details.'
      },
      {
        title: 'Help',
        description: 'Get help and support for your account.'
      }
    ];

    // Create dashboard cards
    cards.forEach(cardData => {
      const card = document.createElement('div');
      card.className = 'dashboard-card';

      const cardTitle = document.createElement('h3');
      cardTitle.textContent = cardData.title;

      const cardDescription = document.createElement('p');
      cardDescription.textContent = cardData.description;

      card.appendChild(cardTitle);
      card.appendChild(cardDescription);
      grid.appendChild(card);
    });

    // Assemble the component
    main.appendChild(welcomeCard);
    main.appendChild(grid);
    container.appendChild(header);
    container.appendChild(main);

    return container;
  },

  /**
   * Renders the dashboard into a target element
   * @param {string|HTMLElement} target - Target element or selector
   * @param {Object} options - Configuration options
   * @param {Function} options.onLogout - Callback function to handle logout
   */
  render: function(target, options) {
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;

    if (!targetElement) {
      throw new Error('Target element not found');
    }

    const dashboardElement = this.create(options);
    targetElement.innerHTML = '';
    targetElement.appendChild(dashboardElement);
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Dashboard;
}

// Make available globally
window.Dashboard = Dashboard;

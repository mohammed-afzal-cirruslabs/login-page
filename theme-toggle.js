/**
 * Theme Toggle Component
 * Handles light/dark theme switching with localStorage persistence
 * and accessibility support
 */

(function() {
  'use strict';
  
  // DOM elements
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const announcement = document.getElementById('themeAnnouncement');
  
  // Constants
  const STORAGE_KEY = 'theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const ANIMATION_DURATION = 200;
  
  /**
   * Safely get theme from localStorage
   * @returns {string|null} Saved theme or null if not found/error
   */
  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return null;
    }
  }
  
  /**
   * Safely save theme to localStorage
   * @param {string} theme - Theme to save
   */
  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }
  
  /**
   * Get system color scheme preference
   * @returns {string} 'dark' or 'light'
   */
  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEME_DARK 
      : THEME_LIGHT;
  }
  
  /**
   * Update icon visibility using CSS classes
   * @param {boolean} isDark - Whether dark theme is active
   * @param {boolean} animate - Whether to animate the transition
   */
  function updateIcons(isDark, animate) {
    const exitIcon = isDark ? sunIcon : moonIcon;
    const enterIcon = isDark ? moonIcon : sunIcon;
    
    if (animate) {
      // Animate icon transition
      exitIcon.classList.add('exit');
      
      setTimeout(() => {
        exitIcon.classList.remove('visible', 'exit');
        exitIcon.classList.add('hidden');
        
        enterIcon.classList.remove('hidden');
        enterIcon.classList.add('visible', 'enter');
        
        setTimeout(() => {
          enterIcon.classList.remove('enter');
        }, ANIMATION_DURATION);
      }, ANIMATION_DURATION);
    } else {
      // Instant switch (on page load)
      if (isDark) {
        sunIcon.classList.remove('visible');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        moonIcon.classList.add('visible');
      } else {
        moonIcon.classList.remove('visible');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        sunIcon.classList.add('visible');
      }
    }
  }
  
  /**
   * Set theme and update UI
   * @param {string} theme - 'light' or 'dark'
   * @param {boolean} animate - Whether to animate the transition
   */
  function setTheme(theme, animate = true) {
    html.setAttribute('data-theme', theme);
    
    const isDark = theme === THEME_DARK;
    
    // Update button ARIA attributes
    toggle.setAttribute(
      'aria-label', 
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    
    // Update icon visibility
    updateIcons(isDark, animate);
    
    // Announce to screen readers
    if (animate && announcement) {
      announcement.textContent = `Theme switched to ${theme} mode`;
    }
  }
  
  /**
   * Initialize theme from localStorage or system preference
   */
  function initTheme() {
    const savedTheme = getSavedTheme();
    const systemPreference = getSystemPreference();
    const initialTheme = savedTheme || systemPreference;
    
    setTheme(initialTheme, false);
  }
  
  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    
    setTheme(newTheme, true);
    saveTheme(newTheme);
  }
  
  /**
   * Handle keyboard events for accessibility
   * @param {KeyboardEvent} e - Keyboard event
   */
  function handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  }
  
  /**
   * Handle system theme preference changes
   * @param {MediaQueryListEvent} e - Media query change event
   */
  function handleSystemThemeChange(e) {
    // Only respond to system changes if user hasn't set a preference
    if (!getSavedTheme()) {
      setTheme(e.matches ? THEME_DARK : THEME_LIGHT, true);
    }
  }
  
  /**
   * Initialize event listeners
   */
  function initEventListeners() {
    if (!toggle) {
      console.error('Theme toggle button not found');
      return;
    }
    
    // Click handler
    toggle.addEventListener('click', toggleTheme);
    
    // Keyboard support
    toggle.addEventListener('keydown', handleKeydown);
    
    // System preference changes
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Modern browsers
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      darkModeQuery.addListener(handleSystemThemeChange);
    }
  }
  
  /**
   * Initialize the theme toggle component
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initEventListeners();
      });
    } else {
      initTheme();
      initEventListeners();
    }
  }
  
  // Start initialization
  init();
})();

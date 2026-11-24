/**
 * Login Form Handler
 * Handles form submission and validation
 */

(function() {
  'use strict';
  
  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  function handleSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
      console.error('Email and password are required');
      return;
    }
    
    // Demo: Show success message
    alert(`Login submitted!\nEmail: ${email}\n(This is a demo - no actual authentication)`);
  }
  
  /**
   * Initialize form event listeners
   */
  function init() {
    const form = document.getElementById('loginForm');
    
    if (!form) {
      console.error('Login form not found');
      return;
    }
    
    form.addEventListener('submit', handleSubmit);
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

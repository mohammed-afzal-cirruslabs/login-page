// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Initialize SSO module
    if (typeof SSO !== 'undefined') {
        SSO.init();
    } else {
        console.error('SSO module not loaded');
    }
    
    // Handle traditional login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                console.log('Login attempt:', { email, password: '***' });
                alert('Login functionality would be implemented here.\\n\\nEmail: ' + email);
                
                // In a real app, you would send this to a server
                // For demo purposes, just reset the form
                loginForm.reset();
            }
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                console.log('Contact form submission:', { name, email, subject, message });
                
                // Show success message
                const successMsg = document.getElementById('contactSuccessMessage');
                if (successMsg) {
                    successMsg.textContent = 'Thank you for your message! We\\'ll get back to you soon.';
                    successMsg.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.classList.remove('show');
                    }, 5000);
                }
            }
        });
    }
});

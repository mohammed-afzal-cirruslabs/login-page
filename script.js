// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (email && password) {
            console.log('Login attempt:', { email, password: '***' });
            alert('Login functionality would be implemented here.\n\nEmail: ' + email);
            
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
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            console.log('Contact form submission:', { name, email, message });
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message show';
            successDiv.textContent = 'Thank you for your message! We\'ll get back to you soon.';
            
            const form = document.querySelector('.form');
            form.parentNode.insertBefore(successDiv, form);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }
    });
}

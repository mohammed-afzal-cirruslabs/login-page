// SSO Authentication Module
const SSO = {
    initialized: false,
    
    init: function() {
        if (this.initialized) {
            return;
        }
        
        console.log('SSO module initialized');
        this.initialized = true;
        
        // Set up SSO button handler
        const ssoBtn = document.getElementById('ssoLoginBtn');
        if (ssoBtn) {
            ssoBtn.addEventListener('click', () => this.login());
        }
    },
    
    login: function() {
        console.log('SSO login initiated');
        
        // Simulate SSO authentication
        // In a real app, this would redirect to an SSO provider
        setTimeout(() => {
            const successMsg = document.getElementById('ssoSuccessMessage');
            if (successMsg) {
                successMsg.textContent = 'Successfully logged in via SSO!';
                successMsg.classList.add('show');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
            
            console.log('SSO login successful');
        }, 500);
    }
};

// Make SSO available globally
window.SSO = SSO;

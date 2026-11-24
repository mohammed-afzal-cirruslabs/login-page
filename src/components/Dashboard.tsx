import './Dashboard.css'

interface DashboardProps {
  onLogout: () => void
}

function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button 
          onClick={onLogout}
          className="logout-button"
          aria-label="Log out"
        >
          Log out
        </button>
      </header>

      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome!</h2>
          <p>You have successfully logged in.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Overview</h3>
            <p>View your account overview and recent activity.</p>
          </div>

          <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Manage your account settings and preferences.</p>
          </div>

          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Update your profile information and details.</p>
          </div>

          <div className="dashboard-card">
            <h3>Help</h3>
            <p>Get help and support for your account.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

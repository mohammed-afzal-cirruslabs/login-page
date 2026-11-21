# Login Page

A production-ready login form component built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting

## 📋 Features

- ✅ Email/username and password inputs
- ✅ Real-time validation with error messages
- ✅ Loading states during submission
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Responsive design (mobile-first)
- ✅ Keyboard navigation support
- ✅ Comprehensive test coverage (26 tests)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18.x or 20.x
- npm 9.x or later

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohammed-afzal-cirruslabs/login-page.git
   cd login-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   cp .env.example .env
   # Edit .env to set your API URL
   ```

### Development

**Start the development server:**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Run type-check:**
```bash
npm run type-check
```

**Run linter:**
```bash
npm run lint
```

**Run tests:**
```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
```

### Production Build

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

The build output will be in the `dist/` directory.

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit tests:** Component behavior, validation logic
- **Integration tests:** Form submission, API interaction
- **Accessibility tests:** ARIA attributes, keyboard navigation

Run all tests with:
```bash
npm test
```

## 📁 Project Structure

```
login-page/
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── src/
│   ├── LoginForm.tsx        # Main login component
│   ├── LoginForm.css        # Component styles
│   ├── LoginForm.test.tsx   # Unit tests
│   ├── LoginForm.integration.test.tsx  # Integration tests
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   ├── tokens.css           # Design tokens
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── vitest.config.ts         # Vitest configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```env
VITE_API_URL=http://localhost:3000
```

### API Integration

The login form submits to `POST /api/auth/login` with:

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (success):**
```json
{
  "success": true,
  "token": "jwt-token-here"
}
```

**Response (error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## 🎨 Design System

The component follows a consistent design system:

- **Typography:** System font stack with clear hierarchy
- **Colors:** Neutral palette with blue accent
- **Spacing:** 4px base scale (8/12/16/24/32/48)
- **Radius:** 8px for cards, 6px for inputs
- **Focus:** 2px blue ring with offset

All design tokens are defined in `src/tokens.css`.

## ♿ Accessibility

- Semantic HTML elements
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader announcements
- WCAG 2.1 AA contrast ratios
- Focus indicators on all interactive elements

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

Found a bug? Please open an issue on [GitHub Issues](https://github.com/mohammed-afzal-cirruslabs/login-page/issues).

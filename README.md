# NSM Component Library

A comprehensive collection of reusable React components built with Vite, Storybook, and Mantine.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://nsm-component-library.netlify.app/)

## 🚀 Live Demo
Check out the live Storybook documentation: [https://nsm-component-library.netlify.app/](https://nsm-component-library.netlify.app/)

## 🛠️ Tech Stack
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Documentation:** [Storybook 9](https://storybook.js.org/)
- **UI Components:** [Mantine Core](https://mantine.dev/)
- **Styling:** SASS/SCSS & CSS Modules
- **Charts:** [FusionCharts](https://www.fusioncharts.com/) & [AmCharts 5](https://www.amcharts.com/)
- **Icons:** [Flaticon UI Icons](https://www.flaticon.com/uicons)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/pranavwaykar/component-library.git

# Navigate to the project directory
cd nsm-component-library

# Install dependencies
npm install
```

## 📖 Usage

### Development Server
Run the Vite development server:
```bash
npm run dev
```

### Storybook
Run Storybook locally to view and interact with components:
```bash
npm run storybook
```

### Build
Build the library for production:
```bash
npm run build
```

Build Storybook for static hosting:
```bash
npm run build-storybook
```

## 🌐 Deployment
This project is configured for seamless deployment on **Netlify**.
- **Build Command:** `npm run build-storybook`
- **Publish Directory:** `storybook-static`
- **Environment Variables:** `NPM_FLAGS = --legacy-peer-deps` (required for React 19 compatibility with certain chart libraries).

## 📄 License
This project is private and intended for use by the NSM team.

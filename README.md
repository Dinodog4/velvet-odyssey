# Velvet Odyssey

A luxury adult cruise website built with Next.js, featuring a content management system, chatbot integration, social media sharing, and affiliate link tracking.

## Features

- Responsive design for all devices
- Content management system for easy updates
- Interactive chatbot for customer support
- Social media integration for sharing cruises
- Affiliate link tracking system
- Admin dashboard for content management

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Hooks
- **Data Storage**: Client-side localStorage (for demo purposes)
- **Deployment**: Static site generation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd velvet-odyssey
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This website is configured for static site generation, making it easy to deploy to various hosting platforms.

### Build for Production

```bash
npm run build
```

This will create a `out` directory with static HTML files that can be deployed to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Connect your GitHub repository or upload the `out` directory
- **GitHub Pages**: Upload the `out` directory to a GitHub repository
- **Any static hosting**: Upload the `out` directory to your hosting provider

## Content Management

### Admin Access

1. Navigate to `/admin` in your browser
2. Login with the following credentials:
   - Username: `admin`
   - Password: `password`

### Managing Cruises

1. From the admin dashboard, click on "Manage Cruises"
2. To add a new cruise, click "Add New Cruise" and fill out the form
3. To edit an existing cruise, click "Edit" next to the cruise you want to modify
4. To delete a cruise, click "Delete" next to the cruise you want to remove

## Customization

### Changing the Theme

The website uses Tailwind CSS for styling. You can customize the theme by editing the `tailwind.config.js` file.

### Adding New Pages

1. Create a new file in the `src/app` directory
2. Export a React component as the default export
3. The file name will determine the URL path

## License

This project is licensed under the MIT License - see the LICENSE file for details.

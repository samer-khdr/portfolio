# Portfolio

A modern, dark-mode portfolio built with React, Tailwind CSS, and Framer Motion.

## Features

- **Dark Mode Design**: Sophisticated minimalism with intentional typography and warmth
- **Smooth Animations**: Subtle scroll animations and hover effects using Framer Motion
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Ready for GitHub Pages**: Configure and deploy with a single command
- **Customizable**: Easy to adapt with your own content, images, and links

## Design

- **Color Scheme**: Dark slate background with warm amber accents
- **Typography**: Lora serif for headings, Work Sans sans-serif for body text
- **Layout**: Gallery-like simplicity with breathing room and intentional white space
- **Animations**: High-impact entrance animations and subtle interaction effects

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Customization

1. **Update your information**: Edit component placeholders in `src/components/`
2. **Add project images**: Replace `[Project Image]` placeholders with actual images
3. **Update links**: Modify contact links (email, LinkedIn, GitHub, Twitter)
4. **Adjust colors**: Edit Tailwind colors in `tailwind.config.js` or `src/styles/global.css`

### Build

```bash
npm run build
```

Creates an optimized production build.

## Deployment to GitHub Pages

### Setup

1. Create a GitHub repository named `portfolio` (or your preferred name)
2. Update `vite.config.js` base path if needed:
   ```js
   base: '/portfolio/'  // Change 'portfolio' to your repo name
   ```

3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

### Deploy

```bash
npm run deploy
```

Your portfolio will be live at `https://your-username.github.io/portfolio/`

## File Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Next Steps

1. Update placeholder text with your own bio and projects
2. Add high-quality images for your work
3. Update contact links and social media URLs
4. Customize colors if desired
5. Deploy to GitHub Pages

Enjoy your new portfolio!

# Dheeraj — Portfolio Website

A portfolio website crafted for **Dheeraj** (Cybersecurity Specialist & Software Developer at VIT Vellore), inspired by the dark luxury aesthetics, kinetic typography, and motion of [jishnumondal.vercel.app](https://jishnumondal.vercel.app/).

---

## 🚀 Live Preview Locally

Your website is currently running locally. You can view it in your browser:

- **Local Server**: [http://localhost:3000](http://localhost:3000)
- **Direct File**: Open [`index.html`](index.html) directly in any browser (Chrome, Edge, Brave, Firefox).

---

## 🛠 Tech Stack

- **HTML5**: Semantic, accessible structure with OpenGraph meta tags.
- **Vanilla CSS**: Custom design system with glassmorphism, responsive bento grids, and dark mode tokens.
- **Vanilla JavaScript**: Lightweight engine for preloader counter, ambient dust particles canvas, custom cursor, 3D card tilt, and smooth navigation.
- **Google Fonts**: *Syne*, *Space Grotesk*, *Poppins*, and *JetBrains Mono*.

---

## 📝 Customization Guide

### 1. Adding Your GitHub & LinkedIn Links
Open [`script.js`](script.js) and update the `PORTFOLIO_CONFIG.socials` object:
```javascript
socials: {
  github: "https://github.com/DheerajRajput24",
  linkedin: "https://www.linkedin.com/in/dhiraj-rajput-90011a423/",
  twitter: "#"
}
```
Or directly in [`index.html`](index.html) under the `#contact` section on lines ~490-505.

### 2. Updating Your 2 Featured Projects
In [`index.html`](index.html), search for `<!-- Project 01 -->` and `<!-- Project 02 -->` in the `projects-section` to update:
- Project title
- Summary description
- Tech stack tags
- Live site link and GitHub repository URL

---

## 🌐 Deploying to Vercel or GitHub Pages

### Deploy to Vercel (Recommended):
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Click **Deploy** (no build settings required; it deploys instantly).

### Deploy to GitHub Pages:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Select the `main` branch as the build source and save.

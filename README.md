# Portfolio - Aditya Roy Bardhan

This is the source code for my professional portfolio, featuring projects in Machine Learning, AI Systems, and Cybersecurity.

## Deployment to GitHub Pages
This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### 1. GitHub Actions Setup
1. Go to your repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

### 2. Custom Domain & DNS Setup (adityaroybardhan.me)
To fix the `InvalidDNSError`, you must configure your domain's DNS records at your domain registrar (e.g., Namecheap, GoDaddy):

**A Records (for adityaroybardhan.me):**
Add four `A` records pointing to these IP addresses:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**CNAME Record (for www.adityaroybardhan.me):**
- **Host:** `www`
- **Value:** `aditya2909rb.github.io`

**Verification:**
After updating DNS, it may take up to 24 hours to propagate. Once updated, GitHub will be able to verify the domain and enable HTTPS.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Motion (Framer Motion), Three.js
- **Backend:** Express (Node.js)
- **Animations:** Lenis (Smooth Scroll), Custom GSAP/Motion sequences
- **Deployment:** Optimized for Cloud Run / AI Studio Build

## How to Deploy to GitHub
To sync this project with your GitHub repository (`https://github.com/aditya2909rb/portfolio.git`):

1. Click on the **Settings** (gear icon) in the AI Studio Build interface.
2. Select **Export to GitHub**.
3. Follow the prompts to authorize and select your `portfolio` repository.

Alternatively, you can download the project as a ZIP and push it manually using the commands below:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/aditya2909rb/portfolio.git
git push -u origin main
```

## SEO & Metadata
The project is fully optimized with:
- JSON-LD Structured Data (Person schema)
- Open Graph (OG) tags for LinkedIn/Facebook
- Twitter Card metadata
- Sitemap and Robots.txt

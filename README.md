# Krystal Care Cleaners (Pty) Ltd — Business Website

Website for **Krystal Care Cleaners (Pty) Ltd**, providing mobile deep cleaning (carpets, couches, mattresses, curtains, tile & grout, offices) and specialist garment care (laundry, dry cleaning, Indian outfits, wedding dresses, clothing dyeing, and sneaker cleaning) across Lenasia, Johannesburg, and Gauteng.

## Branch & Contact Details Featured
- **Address:** 14 Dharwar St, Lenasia Extension 11, Johannesburg, 1827
- **Phone / WhatsApp:** +27 77 247 3275
- **Trading Hours:** Mon–Fri 8:00 AM – 6:00 PM · Sat–Sun 8:00 AM – 2:00 PM

## Running Locally
```bash
npm install
npm run dev:local
```
Then open `http://localhost:5173/` (or `http://127.0.0.1:5173/`).

> **Note for Arena.ai Live Preview:** Inside Arena, `localhost:5173` points to your own computer, not the sandbox. Use the **Website** Live Preview tab in Arena, which proxies the running `npm run dev` server (`0.0.0.0:5173`).

## Launching / Hosting

### Option 1: GitHub Pages (Included Workflow)
1. Merge this branch into `main`.
2. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included `.github/workflows/deploy.yml` builds and publishes the site automatically.

### Option 2: Vercel / Netlify / Cloudflare Pages (Custom Domain `www.krystalcare.co.za`)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- Connect your custom domain (`krystalcare.co.za`) in the host dashboard.

# Step-by-Step Deployment Guide – ZAIDH USMAN Portfolio

This guide walks you through deploying your portfolio to **Vercel** (recommended) and setting up your CV link.

---

## Part 1: Prepare your project

### 1.1 CV link is already set

Your `.env.local` now includes a direct download link for your CV (Google Drive). When you add env vars on Vercel, use this value for `NEXT_PUBLIC_CV_URL`:

```
https://drive.google.com/uc?export=download&id=1PqKTGNsMpGq4013zmpEDlWFff87RCnty
```

This makes the “Download CV” button download the PDF instead of opening the Drive viewer.

### 1.2 Put the project on GitHub (if not already)

1. Open [github.com](https://github.com) and sign in.
2. Click **“New repository”** (or **“+” → “New repository”**).
3. Name it (e.g. `zaidhusman-portfolio`), leave it **Public**, do **not** add a README (you already have code).
4. Click **“Create repository”**.
5. On your computer, open a terminal in your project folder:
   ```bash
   cd c:\Users\MUHAMMAD\OneDrive\Desktop\zaidhusman
   ```
6. If this folder is **not** yet a Git repo, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - portfolio"
   ```
7. Add the GitHub repo and push (using your repo: **zaidhusman/zaidhusman**):
   ```bash
   git remote add origin https://github.com/zaidhusman/zaidhusman.git
   git branch -M main
   git push -u origin main
   ```
   If you use SSH:
   ```bash
   git remote add origin git@github.com:zaidhusman/zaidhusman.git
   git branch -M main
   git push -u origin main
   ```

---

## Part 2: Deploy on Vercel

### Step 1: Sign up / log in

1. Go to [vercel.com](https://vercel.com).
2. Click **“Sign Up”** or **“Log In”**.
3. Choose **“Continue with GitHub”** and authorize Vercel to access your GitHub account.

### Step 2: Import your repository

1. On the Vercel dashboard, click **“Add New…”** → **“Project”**.
2. You’ll see a list of your GitHub repositories. Find **`zaidhusman`** and click **“Import”**.
3. **Do not** click Deploy yet – add environment variables first.

### Step 3: Add environment variables

1. On the import screen, expand **“Environment Variables”**.
2. Add these two variables (one by one):

   **Variable 1**

   - **Name:** `NEXT_PUBLIC_FORMSPREE_ID`  
   - **Value:** `xkovpgkd`  
   - **Environment:** leave all three checked (Production, Preview, Development), or at least Production.

   **Variable 2**

   - **Name:** `NEXT_PUBLIC_CV_URL`  
   - **Value:** `https://drive.google.com/uc?export=download&id=1PqKTGNsMpGq4013zmpEDlWFff87RCnty`  
   - **Environment:** same as above.

3. Click **“Add”** after each variable so both are saved.

### Step 4: Deploy

1. Click **“Deploy”**.
2. Vercel will run `npm run build` and deploy. This usually takes 1–2 minutes.
3. When it finishes, you’ll see **“Congratulations!”** and a live URL like `https://zaidhusman.vercel.app` or `https://zaidhusman-xxxx.vercel.app`.

### Step 5: Open your live site

1. Click **“Visit”** (or the project URL) to open your portfolio.
2. Check:
   - Hero, About, Skills, Projects, Contact, etc. load correctly.
   - **“Get in Touch”** form submits (you should get the submission in Formspree and/or email).
   - **“Download CV”** button downloads your PDF (or opens the correct Drive link).

---

## Part 3: Optional – Custom domain

1. In the Vercel project, go to **“Settings”** → **“Domains”**.
2. Enter your domain (e.g. `zaidhusman.com` or `www.zaidhusman.com`) and follow the instructions.
3. Add the DNS records Vercel shows (at your domain registrar: GoDaddy, Namecheap, Google Domains, etc.).
4. After DNS propagates, Vercel will issue an SSL certificate and your site will be available on your domain.

---

## Part 4: After deployment – updates

Whenever you change the code:

1. Commit and push to the same branch you connected (usually `main`):
   ```bash
   git add .
   git commit -m "Describe your change"
   git push
   ```
2. Vercel will automatically build and deploy. The new version will be live in 1–2 minutes.

---

## Quick reference – env vars on Vercel

| Name                         | Value                                                                 |
|-----------------------------|-----------------------------------------------------------------------|
| `NEXT_PUBLIC_FORMSPREE_ID`  | `xkovpgkd`                                                           |
| `NEXT_PUBLIC_CV_URL`        | `https://drive.google.com/uc?export=download&id=1PqKTGNsMpGq4013zmpEDlWFff87RCnty` |

---

## If something goes wrong

- **Build fails:** In the Vercel project, open the latest deployment → **“Building”** tab and read the error. Fix the error locally, commit, and push again.
- **Form not working:** Confirm `NEXT_PUBLIC_FORMSPREE_ID` is set on Vercel and that you redeployed after adding it.
- **CV not downloading:** Confirm `NEXT_PUBLIC_CV_URL` is exactly the link above. If the file is not “Anyone with the link,” update sharing in Google Drive and try again.

You’re ready to deploy. Start with **Part 1** if the repo isn’t on GitHub yet, then follow **Part 2** for Vercel.

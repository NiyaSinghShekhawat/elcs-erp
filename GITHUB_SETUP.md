# How to Upload Project to GitHub

## Step-by-Step Guide

### Prerequisites
- GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (check with `git --version`)

### Step 1: Initialize Git Repository

Open terminal in your project folder and run:

```bash
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: ELCS College ERP System"
```

### Step 4: Create Repository on GitHub

1. Go to https://github.com
2. Click the **+** icon in the top right
3. Select **New repository**
4. Repository name: `elcs-college-erp` (or any name you prefer)
5. Description: "Student-first College ERP System - Modern web application"
6. Choose **Public** or **Private**
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **Create repository**

### Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

### Step 6: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub username and password (use a Personal Access Token if 2FA is enabled).

### Step 7: Verify

Go to your GitHub repository page and you should see all your files!

---

## Quick Commands (Copy-Paste)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ELCS College ERP System"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## If You Get Authentication Errors

### Option 1: Use Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Copy the token
4. Use token as password when pushing

### Option 2: Use GitHub CLI
```bash
# Install GitHub CLI, then:
gh auth login
```

---

## Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Description of changes"
git push
```

---

## Optional: Add README Badge

You can add this to your README.md to show the tech stack:

```markdown
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-cyan)
```

---

## Repository Settings (Recommended)

After uploading, go to repository Settings and:
1. Add topics: `react`, `vite`, `tailwindcss`, `college-erp`, `student-portal`
2. Add description
3. Enable GitHub Pages if you want to deploy (optional)

---

That's it! Your project is now on GitHub! 🎉


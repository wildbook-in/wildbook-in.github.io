# Anurag Jha — Digital business card

Static GitHub Pages site for Anurag Jha (Founder, Wildbook).

**Live URL:** https://wildbook-in.github.io/

## Edit contact details

Update the links in `index.html` and the `CONTACT` object in `card.js`.

## Deploy

Repo must be named **`wildbook-in.github.io`** and owned by the **`wildbook-in`** GitHub account.

```bash
gh auth login   # sign in as wildbook-in
cd ~/Documents/personal/wildbook-in.github.io
git init
git add .
git commit -m "Add Anurag Jha digital business card"
gh repo create wildbook-in.github.io --public --source=. --remote=origin --push
```

Then: **Settings → Pages → Deploy from branch → `main` / root**.
Pushes to `main` publish automatically.

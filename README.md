# Vegu Padmapriyanka Portfolio

Premium recruiter-focused portfolio for Vegu Padmapriyanka — Full Stack Developer and Data Analyst.

## Demo

After the first push, GitHub Actions publishes the site at:

https://priya-02.github.io/priyanka-portfolio/

The first deployment can take a few minutes. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** if it is not already selected.

## Run locally

Requires Python 3.

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open http://localhost:3000.

## Git setup

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/priya-02/priyanka-portfolio.git
git push -u origin main
```

The site is a static HTML/CSS/JavaScript project. No backend, database, authentication, or build dependency is required.

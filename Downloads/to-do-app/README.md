# To-Do List App

This is a static HTML/CSS/JavaScript to-do app with splash screen, Google sign-in mock flow, and live news feed.

## Deploy to GitHub Pages

1. Make sure all files are committed:
   ```bash
   git add .
   git commit -m "Deploy to-do app"
   git push origin main
   ```
2. Open your repository on GitHub: `https://github.com/abhisheksharma16-cloud/demo-repo`
3. Go to `Settings` → `Pages`.
4. Under `Source`, choose `main` branch and `root` folder.
5. Save and wait a minute for GitHub Pages to publish.
6. The production URL will be shown in the Pages section.

> If you want the app to publish from a different branch, choose that branch instead and push your build there.

## Deploy to Netlify

1. Create a free account at [Netlify](https://www.netlify.com/).
2. Choose `New site from Git`.
3. Connect GitHub and select `demo-repo`.
4. Set the build command to none and the publish directory to `/`.
5. Deploy; Netlify will give you a live production URL.

## Deploy to Vercel

1. Create a free account at [Vercel](https://vercel.com/).
2. Import the GitHub repository.
3. Choose `Framework Preset` as `Other`.
4. Set the output directory to `/`.
5. Deploy.

## Local preview

Run a simple local server:

```bash
cd /Users/abhishek1659/Downloads/to-do-app
python3 -m http.server 5500
```

Then open `http://127.0.0.1:5500/index.html`.

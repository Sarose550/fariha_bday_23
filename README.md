# Happy Birthday, Fariha

A little birthday surprise styled like a Google reCAPTCHA: "Select all images with Fariha." The first attempt always fails (with a "Please try again." nudge), the second attempt always succeeds, and you land on a happy-birthday card.

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying with GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. Wait a minute, then visit the URL GitHub gives you.

## Files

- `index.html` — markup for the captcha card and success screen.
- `style.css` — styling.
- `script.js` — captcha logic (shuffles 18 photos into two non-overlapping sets of 9; first verify fails, second succeeds).
- `images/` — the 18 source photos.

# React Starter Template

Simple React + Vite starter with GitHub Actions for development, staging, and production.

---

## Project Structure

```
react-starter/
├── src/
│   ├── App.jsx            ← main component
│   ├── App.test.jsx       ← tests
│   ├── main.jsx           ← entry point
│   ├── index.css          ← styles
│   └── setupTests.js      ← test setup
├── .github/
│   └── workflows/
│       ├── development.yml  ← runs on every push to development
│       ├── staging.yml      ← runs when PR from development is merged
│       └── production.yml   ← runs when PR from staging is merged
├── index.html
├── vite.config.js
└── package.json
```

---

## Branches

| Branch | Purpose | Who can push |
|---|---|---|
| `development` | Daily work, features, fixes | Everyone directly |
| `staging` | Testing before release | Only via approved PR from development |
| `production` | Live app | Only via approved PR from staging |

---

## How it works step by step

### Step 1 — Developer pushes to development
```bash
git checkout development
# make changes
git add .
git commit -m "add feature"
git push origin development
```
GitHub Actions runs automatically:
- installs packages
- runs tests
- builds the app with `VITE_ENV=development` (yellow banner)
- deploys to dev server

### Step 2 — Open PR: development → staging
When the feature is ready:
1. Go to GitHub → Pull Requests → New Pull Request
2. base: `staging` ← compare: `development`
3. Teammate reviews the code
4. If approved → merge
5. GitHub Actions runs automatically on staging:
   - runs tests again
   - builds with `VITE_ENV=staging` (blue banner)
   - deploys to staging server

### Step 3 — Open PR: staging → production
After testing on staging:
1. Go to GitHub → Pull Requests → New Pull Request
2. base: `production` ← compare: `staging`
3. Senior/lead reviews
4. If approved → merge
5. GitHub Actions runs on production:
   - runs tests
   - builds with `VITE_ENV=production` (green banner)
   - deploys to production

---

## Setup on GitHub (branch protection rules)

Go to: **Settings → Branches → Add rule**

### For `staging`:
- Branch name: `staging`
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale reviews when new commits pushed
- ❌ Allow direct pushes → OFF

### For `production`:
- Branch name: `production`
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale reviews when new commits pushed
- ❌ Allow direct pushes → OFF

---

## Local setup

```bash
npm install      # install packages
npm run dev      # start local dev server
npm run test     # run tests
npm run build    # build for production
```

---

## Replace the deploy step

In each workflow file, find this line:
```yaml
- name: Deploy to development
  run: echo "Deploy to https://dev.yourapp.com"
```

Replace it with your actual deploy command, for example:

**Netlify:**
```yaml
run: npx netlify-cli deploy --dir=dist --prod --site=${{ secrets.NETLIFY_SITE_ID }} --auth=${{ secrets.NETLIFY_TOKEN }}
```

**Vercel:**
```yaml
run: npx vercel --token=${{ secrets.VERCEL_TOKEN }} --prod
```

**Custom server (scp):**
```yaml
run: scp -r dist/ user@yourserver.com:/var/www/html
```

# Deploying Quantum Shadows to Render

## Option 1: Quick Deploy (Web UI)

1.  **Push to GitHub**: Ensure your project is pushed to a public or private GitHub repository.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    # git remote add origin <your-repo-url>
    # git push -u origin main
    ```

2.  **Create Service on Render**:
    *   Log in to [dashboard.render.com](https://dashboard.render.com/).
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub account and select this repository.

3.  **Configure Settings**:
    *   **Name**: `quantum-shadows`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
    *   **Plan**: Free

4.  **Deploy**: Click **Create Web Service**. Render will build and deploy your app.

---

## Option 2: Infrastructure as Code (Blueprint)

This project includes a `render.yaml` file.

1.  Push your code to GitHub.
2.  In Render Dashboard, go to **Blueprints**.
3.  Click **New Blueprint Instance**.
4.  Connect your repo.
5.  Render will automatically read the `render.yaml` and configure the service for you.

## Troubleshooting

*   **Build Failures**: Ensure you are using Node 18+ (Render defaults to a recent version, but you can specify `NODE_VERSION` environment variable if needed).
*   **Port**: Render automatically sets the `PORT` env var. Next.js respects this automatically.

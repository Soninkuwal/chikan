# Chicken Multiplier Game

This is a Next.js project for a "Chicken Multiplier" game, built and customized in Firebase Studio.

The application features a simple gambling game for users and a comprehensive admin panel for management. It uses Next.js for the frontend, Tailwind CSS and ShadCN for styling, and Firebase Realtime Database for the live chat functionality.

## Getting Started

To get started with development, take a look at the main game page: `src/app/page.tsx`.

The core components are located in `src/components/`, divided into `game/` and `admin/` subdirectories.

### Running the Development Server

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment to Cloudflare Pages via GitHub

Follow these steps to deploy your application to the web.

### 1. Set up a GitHub Repository

1.  **Create a new repository on GitHub:** Go to [github.com/new](https://github.com/new) to create a new repository for your project. You can make it public or private.
2.  **Initialize Git in your project:** If you haven't already, open a terminal in your project's root directory and run:
    ```bash
    git init -b main
    ```
3.  **Commit your files:** Stage and commit all your project files.
    ```bash
    git add .
    git commit -m "Initial commit"
    ```
4.  **Connect to your GitHub repo:** Link your local repository to the one you created on GitHub. Replace `<YOUR_USERNAME>` and `<YOUR_REPOSITORY_NAME>` with your details.
    ```bash
    git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
    ```
5.  **Push your code:** Push your local repository to GitHub.
    ```bash
    git push -u origin main
    ```

### 2. Deploy on Cloudflare Pages

1.  **Sign up for Cloudflare:** If you don't have an account, sign up at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2.  **Navigate to Pages:** In the Cloudflare dashboard, go to **Workers & Pages** from the sidebar and select the **Pages** tab.
3.  **Connect to Git:** Click **Create application** and then **Connect to Git**.
4.  **Select your repository:** Choose the GitHub repository you just created and click **Begin setup**.
5.  **Configure your build settings:**
    *   **Project name:** Give your project a name.
    *   **Production branch:** Select `main`.
    *   **Framework preset:** Choose **Next.js**. Cloudflare will automatically configure most of the build settings for you.
    *   **Build command:** `npm run build`
    *   **Build output directory:** `.next`
6.  **Add Environment Variables:**
    *   You will need to add the Firebase configuration from `src/lib/firebase.ts` as environment variables in the Cloudflare Pages settings. This is crucial for the chat feature to work.
    *   Go to **Settings** > **Environment variables** and add the following as production variables:
        *   `NEXT_PUBLIC_FIREBASE_API_KEY`
        *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
        *   `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
        *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
        *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
        *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
        *   `NEXT_PUBLIC_FIREBASE_APP_ID`
        *   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
7.  **Deploy:** Click **Save and Deploy**. Cloudflare will now build and deploy your application. You'll be given a unique `.pages.dev` URL where you can access your live site.

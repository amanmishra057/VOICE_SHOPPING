# VoiceList Shopper

VoiceList Shopper is a smart shopping list application built with Next.js and powered by AI. It allows you to manage your shopping list using your voice, get intelligent item suggestions, and compare prices across popular online stores.

## Features

-   **Voice Commands**: Add items to your shopping list just by speaking. The app's AI understands natural language, including quantities (e.g., "Add 2 liters of milk and a loaf of bread").
-   **Smart Suggestions**: Get AI-powered recommendations for items you might need based on your current shopping list.
-   **Price Comparison**: Find the best deals for your shopping list items. The app can fetch and display prices and direct product links from:
    -   Zepto
    -   Blinkit
    -   Amazon
    -   Flipkart
-   **Manual & Voice Search**: A dedicated search area allows you to look up prices for any item using either text or your voice.
-   **Automatic Categorization**: Items are automatically sorted into logical categories (e.g., Produce, Dairy, Household) to keep your list organized.
-   **Category Filtering**: Easily filter your shopping list to view items from a specific category.

## Tech Stack

-   **Framework**: Next.js (React)
-   **AI/Generative**: Firebase Genkit
-   **UI**: ShadCN UI Components & Tailwind CSS
-   **Speech Recognition**: Web Speech API

## Getting Started

To get started with the application, take a look at `src/app/page.tsx`. The main component is `src/components/shopping-assistant.tsx`, which orchestrates the different parts of the app.

## Uploading to GitHub

Here are the steps to get your project code onto GitHub:

1.  **Create a new repository on GitHub.**
    Go to [GitHub.com](https://github.com) and create a new, empty repository. Do not initialize it with a README or other files. Copy the repository URL it gives you (it will look something like `https://github.com/your-username/your-repo-name.git`).

2.  **Initialize Git in your project folder.**
    Open a terminal or command prompt, navigate to your project's root directory, and run:
    ```bash
    git init -b main
    ```

3.  **Add and commit your files.**
    Stage all your files for the first commit:
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

4.  **Link your local repository to GitHub.**
    Use the URL you copied from GitHub in this command:
    ```bash
    git remote add origin <your-repository-url>
    ```

5.  **Push your code to GitHub.**
    Finally, upload your committed files:
    ```bash
    git push -u origin main
    ```

Now, your project is live on your GitHub repository!

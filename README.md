# VoiceList Shopper

VoiceList Shopper is a smart shopping list application designed to streamline your grocery planning. Built with Next.js and powered by Firebase Genkit, it allows you to manage your shopping list using your voice, get intelligent item suggestions, and compare prices across popular online stores.

The interface is clean, modern, and intuitive, built with ShadCN UI components and Tailwind CSS for a responsive experience on any device.

## Key Features

-   **Voice Commands**: The core feature of the app. Simply tap the microphone and speak naturally to add items. The AI understands complex commands, including quantities (e.g., "Add 2 liters of milk and a loaf of bread").
-   **Manual & Voice Search**: A dedicated search area allows you to look up prices for any item using either text or your voice before adding it to your list.
-   **Multi-Store Price Comparison**: Find the best deals for your shopping list items. The app can fetch and display prices and direct product links from major online retailers:
    -   Zepto
    -   Blinkit
    -   Amazon
    -   Flipkart
-   **Smart Suggestions**: Get AI-powered recommendations for items you might need based on the items already in your shopping list, helping you remember everything you need.
-   **Automatic Categorization**: To keep your list organized, items are automatically sorted into logical categories like "Produce," "Dairy & Eggs," and "Household."
-   **Category Filtering**: Easily filter your shopping list with a dropdown menu to view items from a specific category, making your shopping trip more efficient.

## Tech Stack

-   **Framework**: Next.js (App Router)
-   **AI/Generative**: Firebase Genkit
-   **UI**: ShadCN UI Components & Tailwind CSS
-   **Speech Recognition**: Web Speech API (browser-native)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a new file named `.env` in the root of your project directory.
    -   Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
    -   Add the following line to your `.env` file, replacing `YOUR_API_KEY` with your actual key:
        ```
        GEMINI_API_KEY=YOUR_API_KEY
        ```

### Running the Application

You need to run two processes in separate terminal windows for the application to work correctly.

1.  **Start the Genkit AI flows:**
    Open a terminal and run:
    ```bash
    npm run genkit:dev
    ```
    This command starts the Genkit development server, which handles all the AI-powered features.

2.  **Start the Next.js frontend:**
    Open a second terminal and run:
    ```bash
    npm run dev
    ```
    This will start the main web application.

3.  **Open the app:**
    Open your browser and navigate to `http://localhost:9002` to see the application in action.

## Project Structure

-   `src/app/page.tsx`: The main entry point for the application's UI.
-   `src/components/shopping-assistant.tsx`: The primary component that orchestrates the different parts of the app.
-   `src/ai/flows/`: This directory contains the core AI logic handled by Genkit flows.
    -   `process-voice-commands.ts`: Interprets voice input to add items to the list.
    -   `suggest-common-items.ts`: Generates product suggestions.
    -   `find-product-info.ts`: Fetches prices and links from retailers.

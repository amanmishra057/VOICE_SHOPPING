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

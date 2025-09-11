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

To get started with the application, take a look at `src/app/page.tsx`. The main component is `src/components/shopping-assistant.tsx`, which orchestrates the different parts of the app.

The core AI logic is handled by Genkit flows, which you can find in the `src/ai/flows/` directory:
- `process-voice-commands.ts`: Interprets voice input to add items to the list.
- `suggest-common-items.ts`: Generates product suggestions.
- `find-product-info.ts`: Fetches prices and links from retailers.

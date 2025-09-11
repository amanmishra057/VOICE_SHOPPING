'use server';

/**
 * @fileOverview Finds product information including price and URL from online stores.
 *
 * - findProductInfo - A function that fetches product details from Zepto, Blinkit, Amazon, and Flipkart.
 * - FindProductInfoInput - The input type for the findProductInfo function.
 * - FindProductInfoOutput - The return type for the findProductInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindProductInfoInputSchema = z.object({
  itemName: z.string().describe('The name of the item to search for.'),
});
export type FindProductInfoInput = z.infer<typeof FindProductInfoInputSchema>;

const StoreSchema = z.object({
  name: z.string().describe('The name of the store (e.g., "Zepto", "Blinkit", "Amazon", "Flipkart").'),
  url: z.string().url().describe('The direct URL to the product page.'),
  price: z.string().nullable().describe('The price of the item, formatted as a string (e.g., "₹120", "$10.50"). Null if not found.'),
});

const FindProductInfoOutputSchema = z.object({
  stores: z.array(StoreSchema).describe('A list of stores with pricing information for the item.'),
});
export type FindProductInfoOutput = z.infer<typeof FindProductInfoOutputSchema>;

export async function findProductInfo(input: FindProductInfoInput): Promise<FindProductInfoOutput> {
  return findProductInfoFlow(input);
}

const findProductInfoPrompt = ai.definePrompt({
  name: 'findProductInfoPrompt',
  input: {schema: FindProductInfoInputSchema},
  output: {schema: FindProductInfoOutputSchema},
  prompt: `You are a shopping assistant. For the following item, find the product URL and price on Zepto, Blinkit, Amazon, and Flipkart.

Item: {{{itemName}}}

Return the information in the specified JSON format. If you cannot find the item on a store, do not include it in the array. The URL must be a valid URL to the product page.`,
});

const findProductInfoFlow = ai.defineFlow(
  {
    name: 'findProductInfoFlow',
    inputSchema: FindProductInfoInputSchema,
    outputSchema: FindProductInfoOutputSchema,
  },
  async input => {
    // In a real application, you would use a tool to search a real-time API.
    // For this prototype, we'll simulate the AI's ability to find this information.
    const {output} = await findProductInfoPrompt(input);
    return output!;
  }
);

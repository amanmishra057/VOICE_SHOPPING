'use server';

/**
 * @fileOverview Provides product recommendations based on previous shopping history or preferences.
 *
 * - suggestCommonItems - A function that suggests items the user is likely to need.
 * - SuggestCommonItemsInput - The input type for the suggestCommonItems function.
 * - SuggestCommonItemsOutput - The return type for the suggestCommonItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCommonItemsInputSchema = z.object({
  shoppingHistory: z
    .string()
    .describe('The user shopping history, comma separated list of items.'),
});
export type SuggestCommonItemsInput = z.infer<typeof SuggestCommonItemsInputSchema>;

const SuggestCommonItemsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested items based on the shopping history.'),
});
export type SuggestCommonItemsOutput = z.infer<typeof SuggestCommonItemsOutputSchema>;

export async function suggestCommonItems(input: SuggestCommonItemsInput): Promise<SuggestCommonItemsOutput> {
  return suggestCommonItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCommonItemsPrompt',
  input: {schema: SuggestCommonItemsInputSchema},
  output: {schema: SuggestCommonItemsOutputSchema},
  prompt: `Based on my previous shopping history:

  {{shoppingHistory}}

  Suggest items I might need to add to my shopping list.  Return a simple array of product names.`,
});

const suggestCommonItemsFlow = ai.defineFlow(
  {
    name: 'suggestCommonItemsFlow',
    inputSchema: SuggestCommonItemsInputSchema,
    outputSchema: SuggestCommonItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

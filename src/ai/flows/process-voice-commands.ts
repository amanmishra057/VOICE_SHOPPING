'use server';

/**
 * @fileOverview Processes voice commands to understand and extract items for the shopping list.
 *
 * - processVoiceCommand - Processes the voice command and returns a list of items to add.
 * - ProcessVoiceCommandInput - The input type for the processVoiceCommand function.
 * - ProcessVoiceCommandOutput - The return type for the processVoiceCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessVoiceCommandInputSchema = z.object({
  voiceCommand: z.string().describe('The voice command to process.'),
});
export type ProcessVoiceCommandInput = z.infer<typeof ProcessVoiceCommandInputSchema>;

const ItemSchema = z.object({
    name: z.string().describe('The name of the item.'),
    quantity: z.string().describe('The quantity of the item (e.g., "1 kg", "2 liters", "1 unit"). Default to "1 unit" if not specified.'),
});

const ProcessVoiceCommandOutputSchema = z.object({
  items: z.array(ItemSchema).describe('The list of items extracted from the voice command.'),
});
export type ProcessVoiceCommandOutput = z.infer<typeof ProcessVoiceCommandOutputSchema>;

export async function processVoiceCommand(input: ProcessVoiceCommandInput): Promise<ProcessVoiceCommandOutput> {
  return processVoiceCommandFlow(input);
}

const processVoiceCommandPrompt = ai.definePrompt({
  name: 'processVoiceCommandPrompt',
  input: {schema: ProcessVoiceCommandInputSchema},
  output: {schema: ProcessVoiceCommandOutputSchema},
  prompt: `You are a shopping list assistant. Extract the items that the user wants to add to the shopping list from the following voice command. For each item, extract the name and the quantity. If no quantity is mentioned, default it to "1 unit".

Voice command: {{{voiceCommand}}}

Items:`,
});

const processVoiceCommandFlow = ai.defineFlow(
  {
    name: 'processVoiceCommandFlow',
    inputSchema: ProcessVoiceCommandInputSchema,
    outputSchema: ProcessVoiceCommandOutputSchema,
  },
  async input => {
    const {output} = await processVoiceCommandPrompt(input);
    return output!;
  }
);

// 'use server';
/**
 * @fileOverview Crop diagnosis AI agent.
 *
 * - cropDiagnosis - A function that handles the crop diagnosis process.
 * - CropDiagnosisInput - The input type for the cropDiagnosis function.
 * - CropDiagnosisOutput - The return type for the cropDiagnosis function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CropDiagnosisInputSchema = z.object({
  photoUrl: z.string().describe('The URL of the crop photo.'),
  cropType: z.string().describe('The type of crop in the photo.'),
});
export type CropDiagnosisInput = z.infer<typeof CropDiagnosisInputSchema>;

const CropDiagnosisOutputSchema = z.object({
  diagnosisReport: z.object({
    issues: z.array(z.string()).describe('Potential issues identified in the crop.'),
    solutions: z.array(z.string()).describe('Suggested solutions for the identified issues.'),
    tips: z.array(z.string()).describe('Helpful tips for improving crop health.'),
  }).describe('A report containing issues, solutions, and tips for the crop.'),
});
export type CropDiagnosisOutput = z.infer<typeof CropDiagnosisOutputSchema>;

export async function cropDiagnosis(input: CropDiagnosisInput): Promise<CropDiagnosisOutput> {
  return cropDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropDiagnosisPrompt',
  input: {
    schema: z.object({
      photoUrl: z.string().describe('The URL of the crop photo.'),
      cropType: z.string().describe('The type of crop in the photo.'),
    }),
  },
  output: {
    schema: z.object({
      diagnosisReport: z.object({
        issues: z.array(z.string()).describe('Potential issues identified in the crop.'),
        solutions: z.array(z.string()).describe('Suggested solutions for the identified issues.'),
        tips: z.array(z.string()).describe('Helpful tips for improving crop health.'),
      }).describe('A report containing issues, solutions, and tips for the crop.'),
    }),
  },
  prompt: `You are an expert agricultural advisor.

You will analyze the provided information about the crop and provide a diagnosis report.

Crop Type: {{{cropType}}}
Photo: {{media url=photoUrl}}

Diagnosis Report:
`,
});

const cropDiagnosisFlow = ai.defineFlow<
  typeof CropDiagnosisInputSchema,
  typeof CropDiagnosisOutputSchema
>({
  name: 'cropDiagnosisFlow',
  inputSchema: CropDiagnosisInputSchema,
  outputSchema: CropDiagnosisOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
}
);

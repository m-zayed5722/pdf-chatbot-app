import fs from 'fs';
import pdfParse from 'pdf-parse';

export async function parsePDF(filePath: string): Promise<string> {
    console.log('Parsing PDF file:', filePath);
    const dataBuffer = await fs.promises.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    console.log('Extracted text length:', data.text.length);
    console.log('First 200 characters:', data.text.substring(0, 200));
    return data.text;
}
export interface ChatbotResponse {
    answer: string;
    source: string;
    confidence: number;
}

export interface PDFDocument {
    title: string;
    author: string;
    content: string;
    pages: number;
}
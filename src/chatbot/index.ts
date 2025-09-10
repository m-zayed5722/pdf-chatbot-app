import { VectorDatabase } from '../vector/db';
import { LLM } from '../llm/index';
import { ChatbotResponse } from '../types/index';

export class Chatbot {
    private vectorDb: VectorDatabase;
    private llm: LLM;

    constructor() {
        this.vectorDb = new VectorDatabase();
    // Use Ollama model name (e.g., 'llama2', 'mistral', 'phi3')
    this.llm = new LLM('llama2:latest');
    }

    public async askQuestion(question: string): Promise<string> {
        try {
            // For now, just use all documents as context
            const allDocs = (this.vectorDb as any).documents || [];
            console.log('Number of documents in vector DB:', allDocs.length);
            
            if (allDocs.length === 0) {
                console.warn('No documents found in vector DB!');
                return 'No documents have been loaded yet. Please upload a document first.';
            }

            const context = allDocs.map((doc: any) => doc.content).join('\n')
                .slice(0, 2000); // Reduced context size to avoid timeouts

            console.log('Context preparation:');
            console.log('- Total documents:', allDocs.length);
            console.log('- Combined context length:', context.length);
            console.log('- First 200 chars of context:', context.substring(0, 200));
            console.log('Question:', question);
            
            const prompt = `Answer the question using only information from this context. If unsure, say "I'm not sure". Be brief and specific.

Context:
${context}

Question: ${question}

Answer:`;
            const response = await this.llm.generateResponse(prompt);
            
            console.log('Got response from LLM:', response.slice(0, 100) + '...');
            return response;
        } catch (error) {
            console.error('Error in askQuestion:', error);
            throw error;
        }
    }

    public async addDocument(text: string): Promise<void> {
        this.vectorDb.addDocument({ content: text }, []);
    }
}
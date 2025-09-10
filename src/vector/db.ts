export interface Document {
    content: string;
}

export type Embedding = number[];

export class VectorDatabase {
    private documents: Document[] = [];
    private embeddings: Embedding[] = [];

    constructor() {}

    addDocument(document: Document, embedding: Embedding): void {
        console.log('Adding document to vector DB:');
        console.log('Document content length:', document.content.length);
        console.log('First 200 characters:', document.content.substring(0, 200));
        this.documents.push(document);
        this.embeddings.push(embedding);
        console.log('Total documents in DB:', this.documents.length);
    }

    query(embedding: Embedding, topK: number = 5): Document[] {
        // Simple nearest neighbor search based on cosine similarity
        const similarities = this.embeddings.map((emb: Embedding, index: number) => ({
            index,
            similarity: this.cosineSimilarity(embedding, emb),
        }));

        similarities.sort((a, b) => b.similarity - a.similarity);
        return similarities.slice(0, topK).map(({ index }) => this.documents[index]);
    }

    private cosineSimilarity(vecA: Embedding, vecB: Embedding): number {
        const dotProduct = vecA.reduce((sum, val, index) => sum + val * vecB[index], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }
}
// ...existing code...
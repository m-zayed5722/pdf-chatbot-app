import fetch from 'node-fetch';

export class LLM {
    private modelName: string;
    private fetch: any;

    constructor(modelName: string = 'llama2:latest') {
        this.modelName = modelName;
        // Initialize fetch immediately with a longer timeout
        import('node-fetch').then(module => {
            this.fetch = module.default;
        });
    }

    async generateResponse(prompt: string): Promise<string> {
        try {
            console.log(`Calling Ollama with model: ${this.modelName}`);
            console.log(`Prompt length: ${prompt.length} characters`);
            console.log(`First 200 chars of prompt: ${prompt.substring(0, 200)}`);

            // Initialize fetch if not already done
            if (!this.fetch) {
                const nodeFetch = await import('node-fetch');
                this.fetch = nodeFetch.default;
            }

            const response = await this.fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.modelName,
                    prompt: prompt,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Ollama API error (${response.status}):`, errorText);
                throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Ollama response:', data);

            if (!data.response) {
                console.error('No response in Ollama data:', data);
                throw new Error('No response from Ollama');
            }

            return data.response;
        } catch (err: any) {
            const errorMessage = err.message || 'Unknown error';
            console.error('Error calling Ollama:', errorMessage);
            console.error('Full error:', err);
            return `Error: ${errorMessage}`;
        }
    }
}
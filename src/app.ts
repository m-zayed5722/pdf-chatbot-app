import express from 'express';
import path from 'path';
import multer from 'multer';
import { Chatbot } from './chatbot';
import { parsePDF } from './pdf/parser';

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
const port = process.env.PORT || 3000;

// Increase timeout to 5 minutes
app.use((req, res, next) => {
    res.setTimeout(300000, () => {
        console.log('Request has timed out.');
        res.send({ error: 'Request timeout' });
    });
    next();
});
const upload = multer({ dest: 'uploads/' });

const chatbot = new Chatbot();

app.use(express.json());

import { Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
    res.send('PDF Chatbot server is running!');
});

app.get('/health', async (req: Request, res: Response) => {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) {
            throw new Error(`Ollama returned status: ${response.status}`);
        }
        const data = await response.json();
        res.json({ status: 'ok', ollama: 'running', models: data.models });
    } catch (error) {
        res.status(503).json({ 
            status: 'error', 
            message: 'Ollama is not running or not responding',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const pdfFile = req.file;
        if (!pdfFile) {
            return res.status(400).send('No file uploaded.');
        }

        const text = await parsePDF(pdfFile.path);
        if (typeof chatbot.addDocument === 'function') {
            await chatbot.addDocument(text);
        } else {
            // Stub for missing method
            console.warn('addDocument method not implemented in Chatbot.');
        }
        res.status(200).send('File processed and added to chatbot.');
    } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).send('Error processing file: ' + errorMsg);
    }
});

app.post('/ask', async (req: Request, res: Response) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        console.log('Received question:', question);
        let answer = '';
        
        if (typeof chatbot.askQuestion === 'function') {
            answer = await chatbot.askQuestion(question);
            console.log('Answer received:', answer.slice(0, 100) + '...');
        } else {
            console.warn('askQuestion method not implemented in Chatbot');
            answer = 'askQuestion method not implemented in Chatbot.';
        }
        
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error in /ask endpoint:', error);
        const errorMsg = error instanceof Error ? error.message : String(error);
        res.status(500).json({ 
            error: 'Error retrieving answer',
            details: errorMsg 
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
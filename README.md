# PDF Chatbot Assistant

A modern, intelligent chatbot application that analyzes PDF documents and answers questions about their content using Ollama's LLM technology and efficient vector database storage.

## About

This project was developed by Mohamed Zayed ([@m-zayed5722](https://github.com/m-zayed5722)) as a demonstration of modern AI capabilities in document analysis and natural language processing. It features a sleek, user-friendly interface and powerful backend processing.

## Project Structure

```
pdf-chatbot-app
├── src
│   ├── app.ts               # Entry point of the application
│   ├── chatbot
│   │   └── index.ts         # Chatbot functionality
│   ├── pdf
│   │   └── parser.ts        # PDF parsing logic
│   ├── vector
│   │   └── db.ts            # Vector database management
│   ├── llm
│   │   └── index.ts         # LLM interaction
│   └── types
│       └── index.ts         # Type definitions
├── package.json              # NPM dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **TypeScript**: Superset of JavaScript for type safety and better tooling.
- **Express**: Web framework for handling HTTP requests.
- **LangChain**: Framework for building applications with LLMs and vector databases.
- **pdf-lib** or **pdf-parse**: Libraries for parsing PDF documents.
- **GPT-4** or an open-source LLM: For generating responses to user queries.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pdf-chatbot-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   ```
   npm start
   ```

## Usage

- Upload a PDF document through the provided interface.
- Ask questions related to the content of the uploaded PDF.
- The chatbot will respond based on the extracted information from the PDF.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
# PDF Chatbot Application

This project is a chatbot application that answers questions based on the content of uploaded PDF documents. It utilizes LangChain for managing the interaction with the vector database and integrates with GPT-4 (or an open-source LLM) for generating responses.

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
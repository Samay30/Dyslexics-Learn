# Dyslexics Learn

This web application is designed to provide dyslexia-friendly learning tools to help users summarize text, perform OCR (Optical Character Recognition) on images, and receive personalized learning recommendations. The app uses AI and machine learning models for text summarization, text-to-speech functionality, and learning recommendations.

Key Features:

Optical Character Recognition (OCR): Implemented OCR functionality to convert images of text into editable and readable content, allowing users to digitize physical documents for easier access.
OpenDyslexic Font Integration: Utilized the OpenDyslexic font throughout the app to improve readability and reduce letter confusion, catering specifically to the needs of dyslexic users.
Dyslexia-Friendly UI Design: Designed the user interface with dyslexia-friendly colors, spacing, and layouts to minimize visual stress and enhance usability.
Text-to-Speech Functionality: Integrated pyttsx3 to convert written text into spoken words, assisting users who find reading challenging.
Text Summarization Tool: Leveraged Hugging Face's summarization models to condense lengthy texts into concise summaries, making information more digestible.
Question and Answer Builder: Developed a feature that generates questions and answers from the content to facilitate interactive learning and comprehension.
Personalized Learning Recommendations: Implemented K-Nearest Neighbors (KNN) algorithms to offer tailored content suggestions based on user interactions and preferences.
Personalized Learning Recommendation**: Provides learning recommendations based on user progress.
  
## Technologies Used

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Text Summarization Model**: Hugging Face Transformers API
- **OCR**: Tesseract.js or Flask-Tesseract for image-to-text conversion
- **Text-to-Speech**: pyttsx3 for speech synthesis
- **Machine Learning**: K-Nearest Neighbors (KNN) algorithm for learning recommendations

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) for the frontend.
- **Python**: Install [Python](https://www.python.org/) for the backend (Flask).
- **Flask**: Install Flask and other Python dependencies listed in `requirements.txt`.
- **Tesseract-OCR**: Install Tesseract for OCR functionality.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/dyslexia-friendly-learning-app.git
    ```

2. **Navigate to the frontend directory**:

    ```bash
    cd dyslexia-friendly-learning-app/frontend
    ```

3. **Install frontend dependencies**:

    ```bash
    npm install
    ```

4. **Navigate to the backend directory**:

    ```bash
    cd ../backend
    ```

5. **Create a virtual environment and activate it**:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```

6. **Install backend dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

7. **Run the frontend server**:

    ```bash
    cd frontend
    npm start
    ```

8. **Run the backend server**:

    ```bash
    cd backend
    flask run
    ```

## Usage

Once both the frontend and backend servers are running, you can access the app at `http://localhost:3000`.

### Text Summarization

1. Enter your text into the input field in the "Text Summarization" section.
2. Click the "Summarize Text" button.
3. The summary will be displayed below.

### Text-to-Speech

1. After summarizing the text, click the "Speak Text" button to hear the summary.

### Upload Image for OCR

1. In the "Upload Image for OCR" section, click the "Choose File" button and select an image.
2. The app will extract the text from the image and display it.

### Personalized Learning Recommendation

1. Click "Get Recommendation" to receive a learning recommendation based on user progress.

## Project Structure

```bash
├── frontend                   # React.js frontend code
│   ├── public                 # Static assets
│   ├── src                    # React components
│   └── App.js                 # Main app component
│
├── backend                    # Flask backend code
│   ├── app.py                 # Main backend logic
│   ├── models                 # Machine learning models and code
│   └── requirements.txt       # Backend dependencies
│
├── README.md                  # Project documentation
```

## Future Enhancements

- Add user authentication to save user progress.
- Improve text summarization with advanced NLP techniques.
- Add more personalized learning paths based on performance tracking.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and make changes as you'd like. Feel free to submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgments

- The app leverages AI models from [Hugging Face](https://huggingface.co/) for text summarization.
- [pyttsx3](https://pypi.org/project/pyttsx3/) is used for the text-to-speech functionality.
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) is used for image-to-text conversion.

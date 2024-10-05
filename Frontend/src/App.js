import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [progress, setProgress] = useState(50); // Example user progress
  const [ocrText, setOcrText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState('');
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [answer, setAnswer] = useState('');
  

  const [isCorrect, setIsCorrect] = useState(null); // Track if the answer is correct
 // Track if speaking is in progress

  // Function to send text for summarization
  const summarizeText = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/summarize', { text: inputText });
      setSummary(response.data[0].summary_text);
    } catch (error) {
      console.error("Error in summarizing:", error);
    }
  };
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get_questions')
      .then(response => setQuestionsList(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // Handle form submission to add a new question
  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/add_question', {
        question,
        answer
      });
      setFeedback(response.data.message);
      // Fetch the updated list of questions
      const updatedQuestions = await axios.get('http://127.0.0.1:5000/get_questions');
      setQuestionsList(updatedQuestions.data);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Handle form submission to check answer
  const handleCheckAnswer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/check_answer', {
        question: selectedQuestion,
        answer: userAnswer
      });

      setIsCorrect(response.data.correct);
      setFeedback(response.data.message);

      if (response.data.audio_file) {
        const audio = new Audio(`http://127.0.0.1:5000/${response.data.audio_file}`);
        audio.play();
      }

    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  // Function to get learning recommendation
  const getRecommendation = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', { progress });
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error("Error in getting recommendation:", error);
    }
  };

  // Function to play synthesized speech from summary text
  const speakText = async () => {
    if (isSpeaking) return; // Prevent function execution if another is running
    setIsSpeaking(true); // Set speaking state to true

    try {
      const response = await axios.post('http://127.0.0.1:5000/speak', { text: summary });
      if (response.data.audio_file) {
        const audio = new Audio(`http://127.0.0.1:5000/${response.data.audio_file}`);
        audio.play();
        // Disable further clicks until audio finishes
        audio.onended = () => {
          setIsSpeaking(false); // Reset state after audio finishes
        };
      } else {
        console.error("No audio file received");
        setIsSpeaking(false); // Reset state if no audio is received
      }
    } catch (error) {
      console.error("Error in getting audio from the backend:", error);
      setIsSpeaking(false); // Reset state on error
    }
  };

  // Function to play synthesized speech from OCR text
  const speakOcr = async () => {
    if (isSpeaking) return; // Prevent function execution if another is running
    setIsSpeaking(true); // Set speaking state to true

    try {
      const response = await axios.post('http://127.0.0.1:5000/ocrSpeak', { text: ocrText });
      if (response.data.audio_file) {
        const audio = new Audio(`http://127.0.0.1:5000/${response.data.audio_file}`);
        audio.play();
        // Disable further clicks until audio finishes
        audio.onended = () => {
          setIsSpeaking(false); // Reset state after audio finishes
        };
      } else {
        console.error("No audio file received");
        setIsSpeaking(false); // Reset state if no audio is received
      }
    } catch (error) {
      console.error("Error in getting audio from the backend:", error);
      setIsSpeaking(false); // Reset state on error
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOcrText(response.data.ocr_text);
    } catch (error) {
      console.error('There was an error with the OCR request:', error);
    }
  };
  return (
    <div className="App">
      <h1>Dyslexia Friendly Learning</h1>

      {/* Text Summarization Section */}
      <div className="card">
        <h2 className="section-title">Text Summarization</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to summarize or speak"
        />
        <div className="flex-container">
          <button onClick={summarizeText}>Summarize Text</button>
          <button onClick={speakText} disabled={isSpeaking}>
            {isSpeaking ? "Speaking..." : "Speak Text"}
          </button>
        </div>
        <h2><strong>Summary:</strong> {summary}</h2>
      </div>

      {/* OCR Section */}
      <div className="card">
        <h2 className="section-title">Upload Image for OCR</h2>
        <label className="custom-file-upload">
          <input type="file" accept="image/*" onChange={handleUpload} />
          Choose File
        </label>
        <div className="flex-container">
          <button onClick={speakOcr} disabled={isSpeaking}>
            {isSpeaking ? "Speaking..." : "Speak OCR Text"}
          </button>
        </div>
        <h2><strong>OCR Text:</strong> {ocrText}</h2>
      </div>

      {/* Personalized Learning Recommendation Section */}
      <div className="card">
        <h1 className="section-title">Personalized Learning Recommendation</h1>
        <div className="flex-container">
          <button onClick={getRecommendation}>Get Recommendation</button>
        </div>
        <h2><strong>Recommendation:</strong> {recommendation}</h2>
      </div>
      <h1>Question and Answer Builder</h1>

{/* Form to add new question */}
<form onSubmit={handleAddQuestion}>
  <div>
    <label htmlFor="question">Enter a question:</label>
    <input
      id="question"
      name="question"
      type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="answer">Enter the correct answer:</label>
    <input
      id="answer"
      name="answer"
      type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />
  </div>
  <button type="submit">Add Question</button>
</form>

{/* Display feedback */}
<p>{feedback}</p>

{/* List of questions */}
<h2>Choose a question:</h2>
<ul>
  {questionsList.map((q, index) => (
    <li key={index}>
      <button onClick={() => setSelectedQuestion(q.question)}>
        {q.question}
      </button>
    </li>
  ))}
</ul>

{/* Form to answer selected question */}
{selectedQuestion && (
  <form onSubmit={handleCheckAnswer}>
    <h3>{selectedQuestion}</h3>
    <label htmlFor="userAnswer">Your answer:</label>
    <input
      id="userAnswer"
      name="userAnswer"
      type="text"
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
    />
    <button type="submit">Submit Answer</button>
  </form>
)}

{/* Display feedback for answer correctness */}
{isCorrect !== null && (
  <p style={{ color: isCorrect ? 'green' : 'red' }}>{feedback}</p>
)}
</div>

      
    
  );
}  

export default App;

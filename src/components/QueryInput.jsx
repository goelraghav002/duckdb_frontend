import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import PropTypes from 'prop-types';

const QueryInput = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition
  const initializeRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition. Please use a compatible browser.');
      return null;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true; // Capture real-time speech
    return recognition;
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (query.trim()) {
        onSubmit(query); // Submit automatically when speech ends
      }
    };

    if (isListening) {
      recognition.stop(); // Stop recognition if already listening
    } else {
      recognition.start(); // Start recognition
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about your data..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2 rounded-full transition-colors ${
              isListening ? 'bg-red-100' : 'hover:bg-gray-100'
            }`}
            disabled={isLoading}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-red-500" />
            ) : (
              <Mic className="w-5 h-5 text-gray-900" />
            )}
          </button>
          <button
            type="submit"
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
            disabled={isLoading || !query.trim()}
          >
            <Send className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      </div>
    </form>
  );
};

QueryInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default QueryInput;
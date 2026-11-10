import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { ChatMessage } from '../../types';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Sparkles, 
  ArrowLeft,
  Bot,
  User as UserIcon
} from 'lucide-react';

export const AskAIView: React.FC = () => {
  const { farm, latestAssessment, language, setFarmerTab, showNotification } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputText(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
    }

    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init',
        sender: 'assistant',
        text: language === 'mr'
          ? 'नमस्कार! मी तुमचा शेती सहाय्यक आहे. सोयाबीन, पाऊस, किंवा खतांच्या फवारणीबद्दल तुम्ही माईक दाबून बोलू शकता किंवा लिहू शकता.'
          : language === 'hi'
          ? 'नमस्ते! मैं आपका कृषि साथी हूँ। सोयाबीन, बारिश या छिड़काव पर कोई भी सवाल माइक दबाकर पूछें।'
          : 'Namaste! I am your farm assistant. Tap the microphone to ask about rainfall stress, spray schedules, or crop care.',
        timestamp: new Date().toISOString(),
        language,
        mode: 'crop_assistant',
        audioAvailable: true
      };
      setMessages([initialGreeting]);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      showNotification(language === 'mr' ? 'माईक उपलब्ध नाही. कृपया लिहून विचारा.' : 'Microphone not supported. Please type.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (e) {
        showNotification('Microphone error. Check browser permissions.');
      }
    }
  };

  const handleSendMessage = async (text?: string) => {
    const query = text || inputText.trim();
    if (!query || isLoading) return;

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
      language,
      mode: 'crop_assistant'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await api.sendChatMessage({
        message: query,
        language,
        mode: 'crop_assistant',
        farmDetails: farm,
        latestAssessment
      });

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: res.reply,
        timestamp: new Date().toISOString(),
        language,
        mode: 'crop_assistant',
        audioAvailable: true
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      showNotification('Could not connect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = (msg: ChatMessage) => {
    if (activeAudioId === msg.id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setActiveAudioId(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg.text);
      utterance.lang = msg.language === 'mr' ? 'mr-IN' : msg.language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;

      utterance.onend = () => setActiveAudioId(null);
      utterance.onerror = () => setActiveAudioId(null);

      setActiveAudioId(msg.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const quickQuestions = language === 'mr' ? [
    '🌸 फुले गळत आहेत काय करू?',
    '🌧️ पाऊस कधी पडेल?',
    '💧 १३:०:४५ खताची फवारणी कशी करावी?',
    '⚠️ कोरड्या जमिनीत खत टाकावे का?'
  ] : language === 'hi' ? [
    '🌸 फूल गिर रहे हैं क्या करें?',
    '🌧️ बारिश कब होगी?',
    '💧 13:0:45 स्प्रे कैसे करें?',
    '⚠️ सूखी मिट्टी में खाद डालें या नहीं?'
  ] : [
    '🌸 Flowers dropping, what to do?',
    '🌧️ When will rainfall resume?',
    '💧 How to spray 13:0:45 fertilizer?',
    '⚠️ Should I put fertilizer in dry soil?'
  ];

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto flex flex-col h-[calc(100vh-4.5rem)]">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs mb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFarmerTab('home')}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">
              {language === 'mr' ? 'शेती मित्र (प्रश्न विचारा)' : 'Farm Assistant'}
            </h2>
            <p className="text-[10px] text-emerald-800 font-bold">
              {language === 'mr' ? 'मराठीत बोला किंवा टाईप करा' : 'Voice & Text in Marathi/Hindi/English'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([])}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          title="Clear"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-emerald-800 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {!isUser && (
                  <button
                    onClick={() => handlePlayAudio(m)}
                    className="mt-2 pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                  >
                    {activeAudioId === m.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                        <span className="text-rose-700">आवाज थांबवा</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>मोठ्याने ऐका 🔊</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-500 max-w-[75%] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 animate-spin" />
            <span>सल्ला तयार होत आहे...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Pills */}
      <div className="py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 shrink-0">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[11px] bg-white border border-slate-200 hover:border-emerald-600 text-slate-700 px-3 py-1.5 rounded-xl shrink-0 font-medium shadow-2xs cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Big Friendly Bottom Microphone Bar */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex items-center gap-2 shrink-0">
        <button
          onClick={toggleRecording}
          className={`p-3 rounded-xl transition-all cursor-pointer ${
            isRecording
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-emerald-800 text-white hover:bg-emerald-900'
          }`}
          title="बोलण्यासाठी दाबा"
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isRecording ? 'ऐकत आहे... बोला' : 'येथे लिहा किंवा माईक दाबा...'}
          className="flex-1 text-xs py-2 px-1 focus:outline-none"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-slate-900 hover:bg-black disabled:opacity-40 text-white rounded-xl cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

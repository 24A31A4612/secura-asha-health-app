import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Send,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  WifiOff,
  Sparkles,
  CheckCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, DangerSignEvaluation, Language } from '../types';
import { useTranslation } from '../services/i18n';
import { processHealthWorkerQuery } from '../services/localInferenceAdapter';

interface AskSevaPageProps {
  onTriggerEmergencyModal: (evaluation: DangerSignEvaluation) => void;
  isOnline: boolean;
  language: Language;
}

export const AskSevaPage: React.FC<AskSevaPageProps> = ({
  onTriggerEmergencyModal,
  isOnline,
  language
}) => {
  const t = useTranslation(language);

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Namaste! I am Seva, your frontline clinical protocol assistant. Ask me questions regarding maternal care, newborn health, danger signs, or immunization schedules grounded in official MoHFW protocols.\n\nAll questions are evaluated deterministically for emergency danger signs before processing.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      protocolCitation: '[National Health Mission ASHA Guidelines 2024]'
    }
  ]);
  const [thinking, setThinking] = useState(false);

  const suggestedPrompts = [
    { text: 'Patient is 32 weeks pregnant and experiencing sudden vaginal bleeding', type: 'danger' },
    { text: 'Pregnant woman is having continuous convulsions and fits at home', type: 'danger' },
    { text: 'Please give me the dosage of Amoxicillin 500mg for pneumonia', type: 'refusal' },
    { text: 'What is the schedule for 9-month immunization in infants?', type: 'protocol' },
    { text: 'How to manage dehydration in childhood diarrhea with ORS?', type: 'protocol' },
    { text: 'When should the 4 mandatory ANC checkups be completed?', type: 'protocol' }
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || thinking) return;

    setInputQuery('');

    // Append user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setThinking(true);

    try {
      const response = await processHealthWorkerQuery(textToSend, !isOnline);

      // If danger sign was detected, immediately pop up the emergency modal!
      if (response.dangerSignDetected && response.dangerDetails) {
        onTriggerEmergencyModal(response.dangerDetails);
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        protocolCitation: response.citation || undefined,
        dangerSignDetected: response.dangerSignDetected,
        dangerSignDetails: response.dangerDetails,
        isRefusal: response.isRefusal,
        isOffline: response.isOffline
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Inference error:', err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: 'assistant',
        text: 'An error occurred while evaluating the protocol. Please refer the patient to the Medical Officer / PHC.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="space-y-4 pb-12 flex flex-col h-[calc(100vh-8.5rem)] min-h-[500px]">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#D8E5EA] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF7F6] text-[#0D9488] flex items-center justify-center">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#0B3558]">{t.askSevaTitle}</h1>
            <p className="text-xs text-[#607887] hidden sm:block">
              {t.askSevaSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isOnline && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Protocol Cache</span>
            </span>
          )}
          {isOnline && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EAF7F6] text-[#0D9488] border border-teal-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Protocol Safety Active</span>
            </span>
          )}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-white rounded-3xl p-4 sm:p-6 border border-[#D8E5EA] shadow-xs overflow-y-auto space-y-4">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          const isDanger = msg.dangerSignDetected;
          const isRefusal = msg.isRefusal;

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-2 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#0B3558] text-white rounded-br-none'
                    : isDanger
                    ? 'bg-red-50 border-2 border-[#B42318] text-[#183247] rounded-bl-none shadow-sm'
                    : isRefusal
                    ? 'bg-amber-50 border border-amber-300 text-[#183247] rounded-bl-none'
                    : 'bg-[#EEF4F8] text-[#183247] border border-[#D8E5EA] rounded-bl-none'
                }`}
              >
                {/* Danger or Refusal Header Tag */}
                {isDanger && (
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#B42318] pb-1 border-b border-red-200 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
                    <span>EMERGENCY ESCALATION: 108 AMBULANCE PROTOCOL</span>
                  </div>
                )}

                {isRefusal && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 pb-1 border-b border-amber-200 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" />
                    <span>OUT-OF-SCOPE PRESCRIBING REFUSAL</span>
                  </div>
                )}

                {/* Message Text with proper line break rendering */}
                <div className="whitespace-pre-line font-medium text-xs sm:text-[13px]">
                  {msg.text}
                </div>

                {/* Official Protocol Citation Footer */}
                {msg.protocolCitation && (
                  <div
                    className={`mt-2 pt-2 border-t text-[11px] font-bold flex items-center gap-1.5 ${
                      isUser
                        ? 'border-white/20 text-teal-300'
                        : isDanger
                        ? 'border-red-200 text-[#B42318]'
                        : 'border-[#D8E5EA] text-[#0D9488]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>Citation: {msg.protocolCitation}</span>
                  </div>
                )}

                <div
                  className={`text-[10px] text-right ${
                    isUser ? 'text-slate-300' : 'text-[#607887]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {thinking && (
          <div className="flex justify-start">
            <div className="bg-[#EEF4F8] border border-[#D8E5EA] rounded-2xl rounded-bl-none p-3.5 flex items-center gap-2.5 text-xs text-[#0B3558] font-semibold animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-[#0D9488]" />
              <span>{t.thinking}</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="overflow-x-auto pb-1 flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#0B3558] uppercase tracking-wider shrink-0 pl-1">
          {t.suggestedQuestions}:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.text)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border shrink-0 ${
              p.type === 'danger'
                ? 'bg-red-50 text-[#B42318] border-red-200 hover:bg-red-100'
                : p.type === 'refusal'
                ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                : 'bg-white text-[#0B3558] border-[#D8E5EA] hover:bg-[#EAF7F6] hover:border-teal-300'
            }`}
          >
            {p.text.length > 45 ? `${p.text.substring(0, 45)}...` : p.text}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl p-2 border border-[#D8E5EA] shadow-xs flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder={t.askSevaPlaceholder}
          className="flex-1 px-3 py-2 text-xs sm:text-sm text-[#183247] placeholder:text-[#607887] focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={thinking || !inputQuery.trim()}
          className="px-4 py-2 bg-[#0B3558] hover:bg-[#082A46] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>{t.sendQuestion}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AskSevaPage;

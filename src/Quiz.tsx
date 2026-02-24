import { useState } from 'react';
import { CheckCircle, ChevronRight, Loader } from 'lucide-react';
import { projectId, publicAnonKey } from './utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-14f75f49`;

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "When it's homework time, your child usually...",
    options: [
      { value: "says_dont_know", text: "Says 'I don't know how to do this'", weight: { process: 3 } },
      { value: "starts_then_melts", text: "Starts strong then has a meltdown 10 minutes in", weight: { capacity: 3 } },
      { value: "refuses_start", text: "Refuses to even start", weight: { emotional: 3 } },
      { value: "distracted", text: "Gets distracted by everything", weight: { executive_function: 3 } },
    ],
  },
  {
    id: 2,
    question: "The biggest struggle is...",
    options: [
      { value: "understanding_steps", text: "Understanding what steps to take", weight: { process: 3 } },
      { value: "sustaining_focus", text: "Sustaining focus long enough to finish", weight: { capacity: 2, executive_function: 1 } },
      { value: "fear_wrong", text: "Fear of getting it wrong", weight: { emotional: 3 } },
      { value: "getting_started", text: "Just getting started - the transition is impossible", weight: { executive_function: 3 } },
    ],
  },
  {
    id: 3,
    question: "When you try to help, your child...",
    options: [
      { value: "needs_examples", text: "Needs you to show them an example first", weight: { process: 3 } },
      { value: "overwhelmed_fast", text: "Gets overwhelmed fast and shuts down", weight: { capacity: 2, emotional: 1 } },
      { value: "cries_im_stupid", text: "Cries or says 'I'm stupid'", weight: { emotional: 3 } },
      { value: "cant_sit_still", text: "Can't sit still or focus on your explanation", weight: { executive_function: 3 } },
    ],
  },
  {
    id: 4,
    question: "Your child does best when...",
    options: [
      { value: "step_by_step", text: "Given step-by-step instructions", weight: { process: 3 } },
      { value: "short_chunks", text: "Work is broken into short, manageable chunks", weight: { capacity: 3 } },
      { value: "no_pressure", text: "There's no pressure to be perfect", weight: { emotional: 3 } },
      { value: "someone_nearby", text: "Someone is nearby (body doubling)", weight: { executive_function: 3 } },
    ],
  },
  {
    id: 5,
    question: "Teachers usually say your child...",
    options: [
      { value: "needs_reminders", text: "Needs reminders about how to complete tasks", weight: { process: 2, executive_function: 1 } },
      { value: "fades_fast", text: "Starts strong but fades fast", weight: { capacity: 3 } },
      { value: "anxious_perfectionist", text: "Is anxious or a perfectionist", weight: { emotional: 3 } },
      { value: "trouble_organizing", text: "Has trouble organizing or staying on task", weight: { executive_function: 3 } },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId: number, value: string) => {
    setResponses({ ...responses, [questionId]: value });
    
    // Auto-advance after selection
    if (step < QUIZ_QUESTIONS.length) {
      setTimeout(() => {
        setStep(step + 1);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      alert('Please enter your name and email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email,
          name,
          responses: {
            ...responses,
            _name: name,
            _email: email,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Error submitting quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center py-12">
          <CheckCircle className="w-20 h-20 text-[#0d9488] mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-black text-[#111111] mb-6">
            CHECK YOUR EMAIL!
          </h1>
          <p className="text-xl text-[#333333] mb-8 leading-relaxed">
            We've sent your personalized quiz results to <strong className="text-[#0d9488]">{email}</strong>
          </p>
          <div className="bg-[#f5f5f5] rounded-lg p-8 mb-8">
            <p className="text-lg text-[#111111] mb-4">
              <strong>What's in your inbox:</strong>
            </p>
            <ul className="text-left space-y-3 text-[#333333] max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0 mt-1" />
                <span>Your child's specific scaffold type</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0 mt-1" />
                <span>What's actually causing the homework battles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0 mt-1" />
                <span>Specific strategies that work for your child's wiring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0 mt-1" />
                <span>Next steps to stop the nightly fight</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-[#333333]">
            Don't see it? Check your spam folder for an email from Marianna@mzmarianna.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#111111] text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] font-black mb-2">
            FREE 2-MINUTE ASSESSMENT
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            What Type of Scaffolding Does Your Child Need?
          </h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 h-2">
        <div
          className="bg-[#0d9488] h-full transition-all duration-300"
          style={{ width: `${((step + 1) / (QUIZ_QUESTIONS.length + 2)) * 100}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        {/* Contact Info Step */}
        {step === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-black text-[#111111] mb-4">
                First, tell us about you
              </h2>
              <p className="text-lg text-[#333333]">
                We'll send your personalized results to your email
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#111111] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0d9488] focus:outline-none text-lg"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111111] mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0d9488] focus:outline-none text-lg"
                  placeholder="your@email.com"
                />
              </div>

              <button
                onClick={() => name && email && setStep(1)}
                disabled={!name || !email}
                className="w-full py-4 bg-[#0d9488] text-white font-black text-lg rounded-lg hover:bg-[#0891b2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                Start Quiz
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 text-sm text-[#333333] text-center">
              <p>✓ No spam, ever</p>
              <p>✓ Results sent instantly</p>
              <p>✓ Personalized to your child's needs</p>
            </div>
          </div>
        )}

        {/* Quiz Questions */}
        {step > 0 && step <= QUIZ_QUESTIONS.length && (
          <div className="max-w-3xl mx-auto">
            {QUIZ_QUESTIONS.map((q, index) => {
              if (index + 1 !== step) return null;

              return (
                <div key={q.id} className="animate-fade-in">
                  <div className="mb-8">
                    <div className="text-sm font-black text-[#0d9488] mb-2">
                      QUESTION {step} OF {QUIZ_QUESTIONS.length}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#111111] mb-2">
                      {q.question}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {q.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(q.id, option.value)}
                        className={`w-full p-6 text-left border-2 rounded-lg transition-all hover:border-[#0d9488] hover:bg-[#0d9488]/5 ${
                          responses[q.id] === option.value
                            ? 'border-[#0d9488] bg-[#0d9488]/10'
                            : 'border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                            responses[q.id] === option.value
                              ? 'border-[#0d9488] bg-[#0d9488]'
                              : 'border-gray-300'
                          }`}>
                            {responses[q.id] === option.value && (
                              <CheckCircle className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="text-lg text-[#111111] font-medium">
                            {option.text}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="mt-6 text-[#0d9488] font-bold hover:underline"
                    >
                      ← Back
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Final Submit Step */}
        {step === QUIZ_QUESTIONS.length + 1 && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] mb-6">
              Ready to see your results?
            </h2>
            <p className="text-xl text-[#333333] mb-8">
              We'll send your personalized scaffold type and strategies to:
            </p>
            <div className="bg-[#f5f5f5] rounded-lg p-6 mb-8">
              <p className="text-2xl font-black text-[#0d9488] mb-2">{email}</p>
              <p className="text-sm text-[#333333]">{name}</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full max-w-md mx-auto py-4 bg-[#0d9488] text-white font-black text-lg rounded-lg hover:bg-[#0891b2] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Calculating Results...
                </>
              ) : (
                <>
                  Get My Results
                  <ChevronRight className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

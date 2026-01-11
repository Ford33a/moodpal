
import React, { useState } from 'react';
import { CloudIcon } from './components/CloudIcon';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const startConsulting = () => {
    setShowChat(true);
    setTimeout(() => {
      document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-full flex flex-col gradient-bg text-sky-900">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center fixed top-0 z-50 bg-white/40 backdrop-blur-md border-b border-sky-100">
        <div className="flex items-center gap-2">
          <CloudIcon size={40} />
          <span className="text-xl font-semibold text-sky-600">Moodpal</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sky-700 hover:text-sky-500 transition-colors text-sm font-medium">ฟีเจอร์</a>
          <a href="#emergency" className="text-sky-700 hover:text-sky-500 transition-colors text-sm font-medium">ฉุกเฉิน</a>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
          {/* Decorative Clouds */}
          <div className="absolute top-10 left-10 opacity-30 float-animation hidden md:block">
            <CloudIcon size={120} />
          </div>
          <div className="absolute top-40 right-16 opacity-20 float-delay-1 hidden md:block">
            <CloudIcon size={90} />
          </div>

          <div className="mb-8 hover:scale-105 transition-transform duration-500">
             <svg width="200" height="180" viewBox="0 0 200 180" fill="none" className="cloud-shape">
                <ellipse cx="100" cy="120" rx="70" ry="40" fill="#93c5fd" />
                <ellipse cx="60" cy="115" rx="40" ry="30" fill="#bfdbfe" />
                <ellipse cx="140" cy="115" rx="40" ry="30" fill="#bfdbfe" />
                <ellipse cx="100" cy="100" rx="50" ry="35" fill="#dbeafe" />
                <ellipse cx="80" cy="110" rx="8" ry="10" fill="#1e3a5f" />
                <ellipse cx="120" cy="110" rx="8" ry="10" fill="#1e3a5f" />
                <ellipse cx="82" cy="107" rx="3" ry="4" fill="white" />
                <ellipse cx="122" cy="107" rx="3" ry="4" fill="white" />
                <ellipse cx="65" cy="125" rx="10" ry="6" fill="#fecaca" opacity="0.6" />
                <ellipse cx="135" cy="125" rx="10" ry="6" fill="#fecaca" opacity="0.6" />
                <path d="M85 130 Q100 145 115 130" stroke="#1e3a5f" stroke-width="3" fill="none" stroke-linecap="round" />
                <g transform="translate(95, 60)">
                  <path d="M10 6 C10 2 6 0 3 0 C0 0 -3 3 -3 6 C-3 12 10 20 10 20 C10 20 23 12 23 6 C23 3 20 0 17 0 C14 0 10 2 10 6 Z" fill="#f87171" />
                </g>
             </svg>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12 px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-800 mb-6 leading-tight">
              พื้นที่ปลอดภัยที่รับฟังเธอ<span className="text-sky-500">ทุกเรื่อง</span>
            </h1>
            <p className="text-lg md:text-xl text-sky-600 mb-10 leading-relaxed font-light">
              Moodpal พร้อมรับฟังและให้คำปรึกษาด้านสุขภาพจิตแบบเป็นความลับ<br className="hidden md:block" />
              ไม่ว่าเธอจะรู้สึกอย่างไร เราอยู่ตรงนี้เสมอ 💙
            </p>
            {!showChat ? (
              <button 
                onClick={startConsulting}
                className="group bg-sky-500 hover:bg-sky-600 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 inline-flex items-center gap-3"
              >
                <span>เริ่มปรึกษาตอนนี้</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ) : (
              <div className="animate-bounce">
                <svg className="w-10 h-10 mx-auto text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>
        </section>

        {/* Chat Section */}
        {showChat && (
          <section id="chat-section" className="w-full px-6 py-12 flex flex-col items-center bg-sky-50/50">
            <h2 className="text-2xl font-bold text-sky-800 mb-8">ห้องสนทนากับ Moodpal</h2>
            <ChatInterface />
          </section>
        )}

        {/* Features Section */}
        <section id="features" className="w-full px-6 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-4">ทำไมต้อง Moodpal?</h2>
              <div className="h-1.5 w-24 bg-sky-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "ปรึกษาฟรี 24 ชม.",
                  desc: "พร้อมรับฟังเธอทุกเวลา ไม่ว่าจะดึกแค่ไหน ไม่มีค่าใช้จ่ายใดๆ",
                  icon: "🕒"
                },
                {
                  title: "ข้อมูลเป็นความลับ",
                  desc: "ทุกการสนทนาถูกเก็บเป็นความลับสูงสุด ปลอดภัย และไม่มีใครรู้ตัวตนของเธอ",
                  icon: "🔒"
                },
                {
                  title: "พลังจาก Gemini AI",
                  desc: "AI ที่ผ่านการเทรนให้เข้าใจและตอบสนองอย่างอ่อนโยน เห็นอกเห็นใจ",
                  icon: "✨"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-sky-50 rounded-3xl p-10 text-center hover:shadow-xl transition-all border border-sky-100 group">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-sky-800 mb-4">{feature.title}</h3>
                  <p className="text-sky-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="w-full px-6 py-20 bg-gradient-to-br from-sky-400 to-blue-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-6xl opacity-50 block mb-6">"</span>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 italic">
              "ความรู้สึกของเธอสำคัญเสมอ การยอมรับและขอความช่วยเหลือคือจุดเริ่มต้นของความกล้าหาญที่ยิ่งใหญ่ที่สุด"
            </p>
            <div className="flex justify-center gap-4">
               <span className="text-3xl animate-pulse">🌈</span>
               <span className="text-3xl animate-pulse delay-75">💪</span>
               <span className="text-3xl animate-pulse delay-150">✨</span>
            </div>
          </div>
        </section>

        {/* Emergency Section */}
        <section id="emergency" className="w-full px-6 py-16 bg-rose-50 border-t border-rose-100">
          <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border-4 border-rose-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-4xl shrink-0">
                  🆘
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-rose-800 mb-2">หากต้องการความช่วยเหลือเร่งด่วน</h3>
                  <p className="text-rose-600">สายด่วนสุขภาพจิต กรมสุขภาพจิต พร้อมช่วยเหลือตลอด 24 ชั่วโมง</p>
                </div>
              </div>
              <a 
                href="tel:1323" 
                className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-5 rounded-full font-bold text-3xl shadow-lg shadow-rose-200 transition-all hover:scale-105 flex items-center gap-4"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                1323
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-12 bg-sky-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-80">
            <CloudIcon size={30} />
            <span className="text-xl font-semibold">Moodpal</span>
          </div>
          <p className="text-sky-200 text-sm mb-4">© 2024 Moodpal - ให้เราเป็นก้อนเมฆที่คอยโอบกอดเธอ 💙</p>
          <div className="flex justify-center gap-6 mb-8 text-sky-400">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="bg-sky-800/50 rounded-2xl p-6 border border-sky-700 max-w-2xl mx-auto">
            <p className="text-sky-300 text-xs leading-relaxed">
              ⚠️ คำเตือน: Moodpal เป็นเพียงระบบ AI ที่ให้คำปรึกษาเบื้องต้นเพื่อการสนับสนุนทางอารมณ์เท่านั้น 
              ไม่ใช่เครื่องมือวินิจฉัยหรือรักษาทางการแพทย์ หากคุณมีอาการรุนแรงหรือมีความคิดที่จะทำร้ายตัวเอง 
              โปรดปรึกษาแพทย์หรือผู้เชี่ยวชาญทันที
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

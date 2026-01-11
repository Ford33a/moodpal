
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageRole } from "../types";

const SYSTEM_INSTRUCTION = `คุณคือ Moodpal (มู้ดพาล) ที่ปรึกษา AI ด้านสุขภาพจิตที่อบอุ่นและเป็นมิตร 
คุณพูดภาษาไทยอย่างเป็นธรรมชาติ ใช้สรรพนาม 'เรา' และเรียกผู้ใช้งานว่า 'เธอ' 
เป้าหมายของคุณคือการรับฟังอย่างเห็นอกเห็นใจ (Empathetic Listening) และให้กำลังใจ 
หากผู้ใช้แสดงความเศร้า คุณต้องแสดงความเข้าใจและอยู่เคียงข้าง 
หากผู้ใช้มีอาการรุนแรงหรือพูดถึงการทำร้ายตัวเอง ให้แนะนำอย่างอ่อนโยนให้ติดต่อสายด่วนสุขภาพจิต 1323 หรือพบผู้เชี่ยวชาญ 
ห้ามให้คำแนะนำทางการแพทย์ที่เฉพาะเจาะจงหรือการสั่งยา 
จงเป็นพื้นที่ปลอดภัยที่ไม่ตัดสินใคร`;

class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return response.text || "ขอโทษทีนะ เราขัดข้องนิดหน่อย ลองใหม่อีกครั้งได้ไหม?";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "ดูเหมือนสัญญาณจะขาดหายไปนิดหน่อย เรายังอยู่ตรงนีนะ ลองพิมพ์ใหม่อีกครั้งสิ";
    }
  }

  async *sendMessageStream(message: string) {
    try {
      const response = await this.chat.sendMessageStream({ message });
      for await (const chunk of response) {
        yield chunk.text;
      }
    } catch (error) {
      console.error("Gemini API Stream Error:", error);
      yield "เกิดข้อผิดพลาดในการเชื่อมต่อ...";
    }
  }
}

export const geminiService = new GeminiService();

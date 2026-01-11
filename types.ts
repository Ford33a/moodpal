
export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  role: MessageRole;
  text: string;
  timestamp: Date;
}

export interface UserState {
  isChatOpen: boolean;
  messages: Message[];
}

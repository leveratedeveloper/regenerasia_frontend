export interface Session {
    date: string;
    time: string;
  }
  
  export type SessionCount = 1 | 5 | 10;
  
  export interface FormData {
    fullName: string;
    email: string;
    phone: string;
    contactBy: {
      whatsapp: boolean;
      email: boolean;
      phone: boolean;
    };
    sessionCount: SessionCount;
    sessions: Session[];
    treatmentInfo: string;
    agreedToSafety: boolean;
  }
  
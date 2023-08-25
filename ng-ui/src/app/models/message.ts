export interface Message {
    source: string;
    content: string;
    type?: string,
    sdp?: string,
    destination?: string
  }
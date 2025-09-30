export type Channel = 'email' | 'messenger' | 'instagram' | 'telegram';

export interface NormalizedMessage {
  id: string;
  channel: Channel;
  from: string;
  to: string;
  text?: string;
  timestamp: number;
  raw?: unknown;
}

export interface SendMessageParams {
  channel: Channel;
  to: string;
  text: string;
}

export interface MessageProvider {
  sendMessage(params: SendMessageParams): Promise<void>;
}

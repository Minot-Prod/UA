import { NormalizedMessage, Channel, MessageProvider } from './send_message_interface.js';
import { generateAutoReply } from '../ia_logic/auto_response_template.js';

type ProviderMap = Partial<Record<Channel, MessageProvider>>;

export class MessageRouter {
  constructor(private providers: ProviderMap) {}

  async handleIncoming(msg: NormalizedMessage): Promise<void> {
    // Génère réponse avec IA
    const text = await generateAutoReply(msg);

    const provider = this.providers[msg.channel];
    if (!provider) {
      throw new Error(`No provider configured for channel: ${msg.channel}`);
    }
    await provider.sendMessage({ channel: msg.channel, to: msg.from, text });
  }
}

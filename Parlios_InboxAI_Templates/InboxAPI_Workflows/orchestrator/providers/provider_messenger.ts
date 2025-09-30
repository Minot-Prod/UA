import axios from 'axios';
import { MessageProvider, SendMessageParams } from '../send_message_interface.js';

/**
 * Provider Messenger
 * Envoi via Graph API: POST /{PAGE_ID}/messages
 */
export class MessengerProvider implements MessageProvider {
  constructor(private pageId: string, private getPageAccessToken: () => Promise<string>) {}

  async sendMessage(params: SendMessageParams): Promise<void> {
    const token = await this.getPageAccessToken();
    await axios.post(
      `https://graph.facebook.com/v20.0/${this.pageId}/messages`,
      {
        recipient: { id: params.to },
        message: { text: params.text }
      },
      { params: { access_token: token } }
    );
  }
}

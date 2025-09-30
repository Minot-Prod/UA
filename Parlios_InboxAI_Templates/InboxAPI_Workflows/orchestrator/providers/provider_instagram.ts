import axios from 'axios';
import { MessageProvider, SendMessageParams } from '../send_message_interface.js';

/**
 * Provider Instagram
 * Envoi via Graph API IG: POST /{IG_USER_ID}/messages
 */
export class InstagramProvider implements MessageProvider {
  constructor(private igUserId: string, private getIgAccessToken: () => Promise<string>) {}

  async sendMessage(params: SendMessageParams): Promise<void> {
    const token = await this.getIgAccessToken();
    await axios.post(
      `https://graph.facebook.com/v20.0/${this.igUserId}/messages`,
      {
        recipient: { id: params.to },
        message: { text: params.text }
      },
      { params: { access_token: token } }
    );
  }
}

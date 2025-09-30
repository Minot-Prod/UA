import axios from 'axios';
import { MessageProvider, SendMessageParams } from '../send_message_interface.js';

/**
 * Provider GMAIL
 * Implémentation minimale: utilise l'API Gmail (messages.send) après OAuth.
 * Les tokens doivent être récupérés du coffre / DB selon l'utilisateur.
 */
export class GmailProvider implements MessageProvider {
  constructor(private getAccessToken: () => Promise<string>) {}

  async sendMessage(params: SendMessageParams): Promise<void> {
    const accessToken = await this.getAccessToken();
    const raw = [
      `To: ${params.to}`,
      'Subject: Réponse Parlios',
      '',
      params.text || ''
    ].join('\r\n');
    const body = { raw: Buffer.from(raw).toString('base64') };

    await axios.post(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      { message: body },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  }
}

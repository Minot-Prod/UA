import { NormalizedMessage } from '../orchestrator/send_message_interface.js';

/**
 * Générateur de réponse (mock). 
 * Remplacer par un appel à votre moteur IA préféré.
 */
export async function generateAutoReply(msg: NormalizedMessage): Promise<string> {
  const preview = msg.text ? msg.text.slice(0, 80) : '';
  return `Bonjour! Merci pour votre message. (canal=${msg.channel})\n> ${preview}`;
}

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Health
app.get('/health', (_req, res) => res.status(200).send({ ok: true }));

// Webhooks (stubs)
import metaWebhook from './meta_webhook_template.js';
import emailWebhook from './email_webhook_template.js';
import telegramWebhook from './telegram_webhook_template.js';
app.use('/webhook/meta', metaWebhook);
app.use('/webhook/email', emailWebhook);
app.use('/webhook/telegram', telegramWebhook);

// OAuth (stubs)
import { router as metaOAuth } from '../oauth_flows/meta_oauth_stub.js';
import { router as googleOAuth } from '../oauth_flows/google_oauth_stub.js';
app.use('/oauth/meta', metaOAuth);
app.use('/oauth/google', googleOAuth);

const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
app.listen(port, () => {
  console.log(`Inbox AI dev server listening on :${port}`);
});

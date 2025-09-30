import { Router } from 'express';

const router = Router();

// Verification (GET)
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Events (POST)
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    // TODO: normaliser payload (Messenger / Instagram)
    // Ex: messages, sender, recipient, timestamp
    // Route vers orchestrator
    // await routeIncomingMessage(normalizedMessage)
    res.sendStatus(200);
  } catch (e) {
    console.error('META webhook error', e);
    res.sendStatus(500);
  }
});

export default router;

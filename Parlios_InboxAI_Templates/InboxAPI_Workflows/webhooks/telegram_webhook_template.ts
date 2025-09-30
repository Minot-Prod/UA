import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const secret = req.header('X-Telegram-Secret');
    if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      return res.sendStatus(401);
    }
    const update = req.body;
    // TODO: normaliser (chat_id, text, user)
    // route vers orchestrator
    res.sendStatus(200);
  } catch (e) {
    console.error('Telegram webhook error', e);
    res.sendStatus(500);
  }
});

export default router;

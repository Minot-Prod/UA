import { Router } from 'express';

// NOTE: Gmail n'a pas de webhook HTTP direct en MVP.
// Ce stub illustre un endpoint de polling ou Pub/Sub (à compléter).

const router = Router();

router.post('/', async (_req, res) => {
  // TODO: recevoir notif (Pub/Sub) ou déclencher un polling
  // ex: fetch unread → normalize → orchestrator
  res.sendStatus(200);
});

export default router;

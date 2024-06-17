import { Request, Response, Router } from 'express';
import { subscribe } from '../controllers/subscriptions';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post('/', subscribe);

export default router;

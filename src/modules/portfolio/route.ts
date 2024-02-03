import { Router } from 'express';
import { getAllPortfolios } from './controller';

const router = Router();

router.get('/', getAllPortfolios);

const portfolioRoutes = router;

export default portfolioRoutes;

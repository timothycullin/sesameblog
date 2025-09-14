import { nauruDeportationDeal } from './posts/nauru-deportation-deal.js';
import { gazaRefugeeIntake } from './posts/gaza-refugee-intake.js';

export const posts = [
    nauruDeportationDeal,
    gazaRefugeeIntake,
].sort((a, b) => new Date(b.date) - new Date(a.date));

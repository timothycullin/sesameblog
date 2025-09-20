import { nauruDeportationDeal } from './posts/nauru-deportation-deal.js';

export const posts = [
    nauruDeportationDeal,

].sort((a, b) => new Date(b.date) - new Date(a.date));

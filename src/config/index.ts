import production from './production.config';
import env from './env.config';

export default process.env.NODE_ENV === 'production' ? production : env;

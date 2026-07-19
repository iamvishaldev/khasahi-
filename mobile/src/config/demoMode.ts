import {DEMO_MODE as RAW_DEMO_MODE} from '@env';

/**
 * Hackathon-only auth bypass. Flip DEMO_MODE=false (or delete the var) in
 * .env to fully restore the real auth gate — nothing else references this
 * file besides RootNavigator.
 */
export const isDemoModeEnabled = RAW_DEMO_MODE === 'true';

export const DEMO_USER = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@khasahi.ai',
};

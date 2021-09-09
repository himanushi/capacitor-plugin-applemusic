import { registerPlugin } from '@capacitor/core';

import type { CapacitorAppleMusicPlugin } from './definitions';

const CapacitorAppleMusic = registerPlugin<CapacitorAppleMusicPlugin>(
  'CapacitorAppleMusic',
  {
    web: () => import('./web').then(m => new m.CapacitorAppleMusicWeb()),
  },
);

export * from './definitions';
export { CapacitorAppleMusic };

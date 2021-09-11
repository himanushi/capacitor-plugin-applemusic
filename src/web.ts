import { WebPlugin, registerPlugin } from '@capacitor/core';

import type { CapacitorAppleMusicPlugin } from './definitions';

export class CapacitorAppleMusicWeb
  extends WebPlugin
  implements CapacitorAppleMusicPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async configure(config: MusicKit.Config): Promise<boolean> {
    let configured = false;
    try {
      configured = Boolean(await MusicKit.configure(config));
    } catch (error) {
      console.log(error);
    }
    return configured;
  }
}

const CapacitorAppleMusic = registerPlugin<CapacitorAppleMusicPlugin>(
  'CapacitorAppleMusic',
  {
    web: () => import('./web').then(m => new m.CapacitorAppleMusicWeb()),
  },
);

export { CapacitorAppleMusic };

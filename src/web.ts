import { WebPlugin } from '@capacitor/core';

import type { CapacitorAppleMusicPlugin } from './definitions';

export class CapacitorAppleMusicWeb
  extends WebPlugin
  implements CapacitorAppleMusicPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

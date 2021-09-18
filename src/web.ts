/* eslint-disable @typescript-eslint/no-namespace */

import { WebPlugin, registerPlugin } from '@capacitor/core';

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

  async isAuthorized(): Promise<boolean> {
    let authorized = false;
    try {
      authorized = MusicKit.getInstance().isAuthorized;
    } catch (error) {
      console.log(error);
    }
    return authorized;
  }

  async authorize(): Promise<void> {
    try {
      MusicKit.getInstance().authorize();
    } catch (error) {
      console.log(error);
    }
  }

  async unauthorize(): Promise<void> {
    try {
      MusicKit.getInstance().unauthorize();
    } catch (error) {
      console.log(error);
    }
  }
}

const CapacitorAppleMusic = registerPlugin<CapacitorAppleMusicPlugin>(
  'CapacitorAppleMusic',
  {
    web: () => import('./web').then(m => new m.CapacitorAppleMusicWeb()),
  },
);

export { CapacitorAppleMusic };

interface CapacitorAppleMusicPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  configure(config: MusicKit.Config): Promise<boolean>;
  isAuthorized(): Promise<boolean>;
}

// ver: 3.2136.9-prerelease
declare namespace MusicKit {
  interface Config {
    developerToken: string;
    app: {
      name: string;
      build: string;
    };
  }
  function configure(config: Config): Promise<MusicKitInstance>;
  function getInstance(): MusicKitInstance;

  interface MusicKitInstance {
    storefrontId: string;
    readonly isAuthorized: boolean;
    authorize: () => void;
    unauthorize: () => void;
  }
}

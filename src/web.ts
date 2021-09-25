/* eslint-disable @typescript-eslint/no-namespace */

import { WebPlugin, registerPlugin } from '@capacitor/core';

export class CapacitorAppleMusicWeb
  extends WebPlugin
  implements CapacitorAppleMusicPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async configure(config: MusicKit.Config): Promise<{ result: boolean }> {
    let configured = false;
    try {
      configured = Boolean(await MusicKit.configure(config));
    } catch (error) {
      console.log(error);
    }
    return { result: configured };
  }

  async isAuthorized(): Promise<{ result: boolean }> {
    let authorized = false;
    try {
      authorized = MusicKit.getInstance().isAuthorized;
    } catch (error) {
      console.log(error);
    }
    return { result: authorized };
  }

  async authorize(): Promise<{ result: boolean }> {
    try {
      await MusicKit.getInstance().authorize();
    } catch (error) {
      console.log(error);
    }
    return { result: true };
  }

  async unauthorize(): Promise<{ result: boolean }> {
    try {
      await MusicKit.getInstance().unauthorize();
    } catch (error) {
      console.log(error);
    }
    return { result: true };
  }

  async setQueue(options: { songId: string }): Promise<{ result: boolean }> {
    try {
      await MusicKit.getInstance().setQueue({ songs: [options.songId] });
    } catch (error) {
      console.log(error);
    }
    return { result: true };
  }

  async play(): Promise<{ result: boolean }> {
    try {
      await MusicKit.getInstance().play();
    } catch (error) {
      console.log(error);
    }
    return { result: true };
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
  configure(config: MusicKit.Config): Promise<{ result: boolean }>;
  isAuthorized(): Promise<{ result: boolean }>;
  authorize(): Promise<{ result: boolean }>;
  unauthorize(): Promise<{ result: boolean }>;
  setQueue(options: { songId: string }): Promise<{ result: boolean }>;
  play(): Promise<{ result: boolean }>;
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
    setQueue: (options: { songs: string[] }) => Promise<void>;
    play: () => Promise<void>;
  }
}

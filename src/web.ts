/* eslint-disable @typescript-eslint/no-namespace */

import type { PluginListenerHandle } from '@capacitor/core';
import { WebPlugin, registerPlugin } from '@capacitor/core';

export class CapacitorAppleMusicWeb
  extends WebPlugin
  implements CapacitorAppleMusicPlugin {
  private playbackStateDidChange = (state: {
    oldState: number;
    state: number;
  }) => {
    const status = MusicKit.PlaybackStates[state.state];
    const data = { result: status };
    this.notifyListeners('playbackStateDidChange', data);
  };

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async configure(options: {
    config: MusicKit.Config;
  }): Promise<{ result: boolean }> {
    let configured = false;
    try {
      const musicKit = await MusicKit.configure(options.config);

      musicKit.addEventListener(
        'playbackStateDidChange',
        this.playbackStateDidChange,
      );

      configured = true;
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

  async setSong(options: { songId: string }): Promise<{ result: boolean }> {
    try {
      await MusicKit.getInstance().setQueue({ songs: [options.songId] });
    } catch (error) {
      console.log(error);
    }
    return { result: true };
  }

  async play(): Promise<{ result: boolean }> {
    let result = false;
    try {
      await MusicKit.getInstance().play();
      result = true;
    } catch (error) {
      console.log(error);
    }
    return { result };
  }

  async stop(): Promise<{ result: boolean }> {
    let result = false;
    try {
      await MusicKit.getInstance().stop();
      result = true;
    } catch (error) {
      console.log(error);
    }
    return { result };
  }

  async pause(): Promise<{ result: boolean }> {
    let result = false;
    try {
      await MusicKit.getInstance().pause();
      result = true;
    } catch (error) {
      console.log(error);
    }
    return { result };
  }

  async currentPlaybackDuration(): Promise<{ result: number }> {
    return { result: MusicKit.getInstance().currentPlaybackDuration };
  }

  async currentPlaybackTime(): Promise<{ result: number }> {
    return { result: MusicKit.getInstance().currentPlaybackTime };
  }

  async seekToTime(options: {
    playbackTime: number;
  }): Promise<{ result: boolean }> {
    let result = false;
    try {
      MusicKit.getInstance().seekToTime(options.playbackTime);
      result = true;
    } catch (error) {
      console.log(error);
    }
    return { result };
  }
}

const CapacitorAppleMusic = registerPlugin<CapacitorAppleMusicPlugin>(
  'CapacitorAppleMusic',
  {
    web: () => import('./web').then(m => new m.CapacitorAppleMusicWeb()),
  },
);

export { CapacitorAppleMusic };

export type PlaybackStates = keyof typeof MusicKit.PlaybackStates;
export type PlaybackStateDidChangeListener = (state: {
  result: PlaybackStates;
}) => void;

interface CapacitorAppleMusicPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  configure(options: { config: MusicKit.Config }): Promise<{ result: boolean }>;
  isAuthorized(): Promise<{ result: boolean }>;
  authorize(): Promise<{ result: boolean }>;
  unauthorize(): Promise<{ result: boolean }>;
  setSong(options: { songId: string }): Promise<{ result: boolean }>;
  play(): Promise<{ result: boolean }>;
  stop(): Promise<{ result: boolean }>;
  pause(): Promise<{ result: boolean }>;
  currentPlaybackDuration(): Promise<{ result: number }>;
  currentPlaybackTime(): Promise<{ result: number }>;
  seekToTime(options: { playbackTime: number }): Promise<{ result: boolean }>;
  addListener(
    eventName: 'playbackStateDidChange',
    listenerFunc: PlaybackStateDidChangeListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
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
    currentPlaybackTime: number;
    currentPlaybackDuration: number;
    readonly isAuthorized: boolean;
    authorize: () => void;
    unauthorize: () => void;
    setQueue: (options: { songs: string[] }) => Promise<void>;
    play: () => Promise<void>;
    stop: () => Promise<void>;
    pause: () => Promise<void>;
    seekToTime: (playbackTime: number) => Promise<void>;
    addEventListener: (
      eventName: string,
      callback: (state: { oldState: number; state: number }) => void,
    ) => number;
  }

  enum PlaybackStates {
    none,
    loading,
    playing,
    paused,
    stopped,
    ended,
    seeking,
    waiting,
    stalled,
    completed,
  }
}

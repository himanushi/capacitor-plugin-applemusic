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
  }

  const Events: {
    audioTrackAdded: 'audioTrackAdded';
    audioTrackChanged: 'audioTrackChanged';
    audioTrackRemoved: 'audioTrackRemoved';
    authorizationStatusDidChange: 'authorizationStatusDidChange';
    authorizationStatusWillChange: 'authorizationStatusWillChange';
    autoplayEnabledDidChange: 'autoplayEnabledDidChange';
    bufferedProgressDidChange: 'bufferedProgressDidChange';
    capabilitiesChanged: 'capabilitiesChanged';
    configured: 'musickitconfigured';
    drmUnsupported: 'drmUnsupported';
    eligibleForSubscribeView: 'eligibleForSubscribeView';
    forcedTextTrackChanged: 'forcedTextTrackChanged';
    loaded: 'musickitloaded';
    mediaCanPlay: 'mediaCanPlay';
    mediaElementCreated: 'mediaElementCreated';
    mediaItemStateDidChange: 'mediaItemStateDidChange';
    mediaItemStateWillChange: 'mediaItemStateWillChange';
    mediaPlaybackError: 'mediaPlaybackError';
    mediaRollEntered: 'mediaRollEntered';
    mediaSkipAvailable: 'mediaSkipAvailable';
    mediaUpNext: 'mediaUpNext';
    metadataDidChange: 'metadataDidChange';
    nowPlayingItemDidChange: 'nowPlayingItemDidChange';
    nowPlayingItemWillChange: 'nowPlayingItemWillChange';
    playbackBitrateDidChange: 'playbackBitrateDidChange';
    playbackDurationDidChange: 'playbackDurationDidChange';
    playbackProgressDidChange: 'playbackProgressDidChange';
    playbackRateDidChange: 'playbackRateDidChange';
    playbackStateDidChange: 'playbackStateDidChange';
    playbackStateWillChange: 'playbackStateWillChange';
    playbackTargetAvailableDidChange: 'playbackTargetAvailableDidChange';
    playbackTargetIsWirelessDidChange: 'playbackTargetIsWirelessDidChange';
    playbackTimeDidChange: 'playbackTimeDidChange';
    playbackVolumeDidChange: 'playbackVolumeDidChange';
    playerTypeDidChange: 'playerTypeDidChange';
    presentationModeDidChange: 'presentationModeDidChange';
    primaryPlayerDidChange: 'primaryPlayerDidChange';
    queueIsReady: 'queueIsReady';
    queueItemForStartPosition: 'queueItemForStartPosition';
    queueItemsDidChange: 'queueItemsDidChange';
    queuePositionDidChange: 'queuePositionDidChange';
    repeatModeDidChange: 'repeatModeDidChange';
    shuffleModeDidChange: 'shuffleModeDidChange';
    storefrontCountryCodeDidChange: 'storefrontCountryCodeDidChange';
    storefrontIdentifierDidChange: 'storefrontIdentifierDidChange';
    textTrackAdded: 'textTrackAdded';
    textTrackChanged: 'textTrackChanged';
    textTrackRemoved: 'textTrackRemoved';
    timedMetadataDidChange: 'timedMetadataDidChange';
    userTokenDidChange: 'userTokenDidChange';
    webComponentsLoaded: 'musickitwebcomponentsloaded';
  };

  interface MKError {
    ACCESS_DENIED: 'ACCESS_DENIED';
    AGE_VERIFICATION: 'AGE_VERIFICATION';
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR';
    CONFIGURATION_ERROR: 'CONFIGURATION_ERROR';
    CONTENT_EQUIVALENT: 'CONTENT_EQUIVALENT';
    CONTENT_RESTRICTED: 'CONTENT_RESTRICTED';
    CONTENT_UNAVAILABLE: 'CONTENT_UNAVAILABLE';
    CONTENT_UNSUPPORTED: 'CONTENT_UNSUPPORTED';
    DEVICE_LIMIT: 'DEVICE_LIMIT';
    INTERNAL_ERROR: 'INTERNAL_ERROR';
    INVALID_ARGUMENTS: 'INVALID_ARGUMENTS';
    MEDIA_CERTIFICATE: 'MEDIA_CERTIFICATE';
    MEDIA_DESCRIPTOR: 'MEDIA_DESCRIPTOR';
    MEDIA_KEY: 'MEDIA_KEY';
    MEDIA_LICENSE: 'MEDIA_LICENSE';
    MEDIA_PLAYBACK: 'MEDIA_PLAYBACK';
    MEDIA_SESSION: 'MEDIA_SESSION';
    NETWORK_ERROR: 'NETWORK_ERROR';
    NOT_FOUND: 'NOT_FOUND';
    OUTPUT_RESTRICTED: 'OUTPUT_RESTRICTED';
    PARSE_ERROR: 'PARSE_ERROR';
    PLAYREADY_CBC_ENCRYPTION_ERROR: 'PLAYREADY_CBC_ENCRYPTION_ERROR';
    PLAY_ACTIVITY: 'PLAY_ACTIVITY';
    QUOTA_EXCEEDED: 'QUOTA_EXCEEDED';
    REQUEST_ERROR: 'REQUEST_ERROR';
    SERVER_ERROR: 'SERVER_ERROR';
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE';
    STREAM_UPSELL: 'STREAM_UPSELL';
    SUBSCRIPTION_ERROR: 'SUBSCRIPTION_ERROR';
    TOKEN_EXPIRED: 'TOKEN_EXPIRED';
    UNAUTHORIZED_ERROR: 'UNAUTHORIZED_ERROR';
    UNKNOWN_ERROR: 'UNKNOWN_ERROR';
    UNSUPPORTED_ERROR: 'UNSUPPORTED_ERROR';
  }

  const PlayActivityEndReasonType: {
    0: 'NOT_APPLICABLE';
    1: 'OTHER';
    2: 'TRACK_SKIPPED_FORWARDS';
    3: 'PLAYBACK_MANUALLY_PAUSED';
    4: 'PLAYBACK_SUSPENDED';
    5: 'MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM';
    6: 'PLAYBACK_PAUSED_DUE_TO_INACTIVITY';
    7: 'NATURAL_END_OF_TRACK';
    8: 'PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT';
    9: 'TRACK_BANNED';
    10: 'FAILED_TO_LOAD';
    11: 'PAUSED_ON_TIMEOUT';
    12: 'SCRUB_BEGIN';
    13: 'SCRUB_END';
    14: 'TRACK_SKIPPED_BACKWARDS';
    15: 'NOT_SUPPORTED_BY_CLIENT';
    16: 'QUICK_PLAY';
    17: 'EXITED_APPLICATION';
    EXITED_APPLICATION: 17;
    FAILED_TO_LOAD: 10;
    MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM: 5;
    NATURAL_END_OF_TRACK: 7;
    NOT_APPLICABLE: 0;
    NOT_SUPPORTED_BY_CLIENT: 15;
    OTHER: 1;
    PAUSED_ON_TIMEOUT: 11;
    PLAYBACK_MANUALLY_PAUSED: 3;
    PLAYBACK_PAUSED_DUE_TO_INACTIVITY: 6;
    PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT: 8;
    PLAYBACK_SUSPENDED: 4;
    QUICK_PLAY: 16;
    SCRUB_BEGIN: 12;
    SCRUB_END: 13;
    TRACK_BANNED: 9;
    TRACK_SKIPPED_BACKWARDS: 14;
  };

  const PlaybackBitrate: {
    64: 'STANDARD';
    256: 'HIGH';
    HIGH: 256;
    STANDARD: 64;
  };

  const PlaybackMode: {
    0: 'PREVIEW_ONLY';
    1: 'MIXED_CONTENT';
    2: 'FULL_PLAYBACK_ONLY';
    FULL_PLAYBACK_ONLY: 2;
    MIXED_CONTENT: 1;
    PREVIEW_ONLY: 0;
  };

  const PlayerRepeatMode: {
    0: 'none';
    1: 'one';
    2: 'all';
    all: 2;
    none: 0;
    one: 1;
  };

  const PresentationMode: {
    0: 'pictureinpicture';
    1: 'inline';
    inline: 1;
    pictureinpicture: 0;
  };

  const VideoTypes: {
    'EditorialVideoClip': true;
    'Episode': true;
    'Movie': true;
    'RealityVideo': true;
    'Show': true;
    'Vod': true;
    'movie': true;
    'music-movies': true;
    'music-videos': true;
    'musicMovie': true;
    'musicVideo': true;
    'trailer': true;
    'tv-episodes': true;
    'tvEpisode': true;
    'uploaded-videos': true;
    'uploadedVideo': true;
  };
}

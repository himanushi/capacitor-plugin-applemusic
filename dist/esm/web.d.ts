import { WebPlugin } from '@capacitor/core';
export declare class CapacitorAppleMusicWeb extends WebPlugin implements CapacitorAppleMusicPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    configure(config: MusicKit.Config): Promise<boolean>;
    isAuthorized(): Promise<boolean>;
    authorize(): Promise<void>;
    unauthorize(): Promise<void>;
}
declare const CapacitorAppleMusic: CapacitorAppleMusicPlugin;
export { CapacitorAppleMusic };
interface CapacitorAppleMusicPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    configure(config: MusicKit.Config): Promise<boolean>;
    isAuthorized(): Promise<boolean>;
    authorize(): Promise<void>;
    unauthorize(): Promise<void>;
}
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

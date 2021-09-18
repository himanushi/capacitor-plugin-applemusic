/* eslint-disable @typescript-eslint/no-namespace */
import { WebPlugin, registerPlugin } from '@capacitor/core';
export class CapacitorAppleMusicWeb extends WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async configure(config) {
        let configured = false;
        try {
            configured = Boolean(await MusicKit.configure(config));
        }
        catch (error) {
            console.log(error);
        }
        return configured;
    }
    async isAuthorized() {
        let authorized = false;
        try {
            authorized = MusicKit.getInstance().isAuthorized;
        }
        catch (error) {
            console.log(error);
        }
        return authorized;
    }
    async authorize() {
        try {
            MusicKit.getInstance().authorize();
        }
        catch (error) {
            console.log(error);
        }
    }
    async unauthorize() {
        try {
            MusicKit.getInstance().unauthorize();
        }
        catch (error) {
            console.log(error);
        }
    }
}
const CapacitorAppleMusic = registerPlugin('CapacitorAppleMusic', {
    web: () => import('./web').then(m => new m.CapacitorAppleMusicWeb()),
});
export { CapacitorAppleMusic };
//# sourceMappingURL=web.js.map
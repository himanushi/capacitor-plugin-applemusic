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
}
const CapacitorAppleMusic = registerPlugin('CapacitorAppleMusic', {
    web: () => import('./web').then(m => new m.CapacitorAppleMusicWeb()),
});
export { CapacitorAppleMusic };
//# sourceMappingURL=web.js.map
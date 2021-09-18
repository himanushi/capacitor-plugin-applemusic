var capacitorCapacitorAppleMusic = (function (exports, core) {
    'use strict';

    /* eslint-disable @typescript-eslint/no-namespace */
    class CapacitorAppleMusicWeb extends core.WebPlugin {
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
    const CapacitorAppleMusic = core.registerPlugin('CapacitorAppleMusic', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.CapacitorAppleMusicWeb()),
    });

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CapacitorAppleMusicWeb: CapacitorAppleMusicWeb,
        CapacitorAppleMusic: CapacitorAppleMusic
    });

    exports.CapacitorAppleMusic = CapacitorAppleMusic;
    exports.CapacitorAppleMusicWeb = CapacitorAppleMusicWeb;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
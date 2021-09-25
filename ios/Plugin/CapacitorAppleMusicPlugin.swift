import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
let resultKey = "result"

@objc(CapacitorAppleMusicPlugin)
public class CapacitorAppleMusicPlugin: CAPPlugin {
    private let implementation = CapacitorAppleMusic()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": implementation.echo(value)])
    }

    @objc func configure(_ call: CAPPluginCall) {
        call.resolve([resultKey: true])
    }

    @objc func isAuthorized(_ call: CAPPluginCall) {
        call.resolve([resultKey: implementation.isAuthorized()])
    }

    @objc func authorize(_ call: CAPPluginCall) {
        Task {
            call.resolve([resultKey: await implementation.authorize()])
        }
    }

    @objc func setQueue(_ call: CAPPluginCall) {
        let songId = call.getString("songId") ?? ""
        Task {
            call.resolve([resultKey: await implementation.setQueue(songId)])
        }
    }

    @objc func play(_ call: CAPPluginCall) {
        Task {
            call.resolve([resultKey: await implementation.play()])
        }
    }
}

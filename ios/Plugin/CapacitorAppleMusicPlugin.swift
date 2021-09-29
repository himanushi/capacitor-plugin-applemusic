import Foundation
import Capacitor
import MediaPlayer

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
let resultKey = "result"

@available(iOS 15.0, *)
@objc(CapacitorAppleMusicPlugin)
public class CapacitorAppleMusicPlugin: CAPPlugin {
    private let implementation = CapacitorAppleMusic()

    override public func load() {
        let audioSession = AVAudioSession.sharedInstance()
        do {
            // AVPlayer をサイレントモードとバックグラウンドで再生する
            // TODO: interruptSpokenAudioAndMixWithOthers を設定すると AVPlayer による MPRemoteCommandCenter が有効にならないのでどうにかすること
            try audioSession.setCategory(.playback, mode: .default, options: [.interruptSpokenAudioAndMixWithOthers])
            try audioSession.setActive(true)
        } catch {
            print(error)
        }

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(self.playbackStateDidChange(notification:)),
            name: Notification.Name.MPMusicPlayerControllerPlaybackStateDidChange,
            object: nil)
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    @objc private func playbackStateDidChange(notification: NSNotification) {
        let result = implementation.playbackStateDidChange()
        if result != "" {
            notifyListeners("playbackStateDidChange", data: ["result": result])
        }
    }

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

    @objc func setSong(_ call: CAPPluginCall) {
        let songId = call.getString("songId") ?? ""
        Task {
            call.resolve([resultKey: await implementation.setSong(songId)])
        }
    }

    @objc func play(_ call: CAPPluginCall) {
        Task {
            call.resolve([resultKey: await implementation.play()])
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        Task {
            call.resolve([resultKey: await implementation.stop()])
        }
    }

    @objc func pause(_ call: CAPPluginCall) {
        Task {
            call.resolve([resultKey: await implementation.pause()])
        }
    }

    @objc func currentPlaybackTime(_ call: CAPPluginCall) {
        Task {
            call.resolve([resultKey: await implementation.currentPlaybackTime()])
        }
    }

    @objc func seekToTime(_ call: CAPPluginCall) {
        let playbackTime = call.getDouble("playbackTime") ?? 0.0
        Task {
            call.resolve([resultKey: await implementation.seekToTime(playbackTime)])
        }
    }
}

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
        call.resolve([
            "value": implementation.echo(value)
        ])
    }

    @objc func configure(_ call: CAPPluginCall) {
        call.resolve([resultKey: true])
    }

    @objc func isAuthorized(_ call: CAPPluginCall) {
        var result: Bool = false
        if MusicAuthorization.currentStatus == .authorized {
            result = true
        }
        call.resolve([resultKey: result])
    }

    @objc func authorize(_ call: CAPPluginCall) {
        Task {
            let status = await MusicAuthorization.request()
            if status == .authorized {
                call.resolve([resultKey: true])
            } else {
                call.resolve([resultKey: false])
            }
        }
    }

    @objc func setQueue(_ call: CAPPluginCall) {
        let songId = call.getString("songId") ?? ""
        let request = MusicCatalogResourceRequest<MusicKit.Song>(matching: \.id, equalTo: MusicItemID(songId))
        print("songId : \(songId)")
        Task {
            do {
                let response = try await request.response()
                if let track = response.items.first {
                    print("name : \(track.title)")
                    ApplicationMusicPlayer.shared.queue = [track]
                }
                call.resolve([resultKey: true])
            } catch {
                print(error)
                call.resolve([resultKey: false])
            }
        }
    }

    @objc func play(_ call: CAPPluginCall) {
        Task {
            do {
                try await ApplicationMusicPlayer.shared.play()
                call.resolve([resultKey: true])
            } catch {
                print(error)
                call.resolve([resultKey: false])
            }
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        Task {
            if ApplicationMusicPlayer.shared.state.playbackStatus == MusicPlayer.PlaybackStatus.playing {
                ApplicationMusicPlayer.shared.stop()
            }
            call.resolve([resultKey: true])
        }
    }

    @objc func pause(_ call: CAPPluginCall) {
        Task {
            if ApplicationMusicPlayer.shared.state.playbackStatus == MusicPlayer.PlaybackStatus.playing {
                ApplicationMusicPlayer.shared.pause()
            }
            call.resolve([resultKey: true])
        }
    }
}

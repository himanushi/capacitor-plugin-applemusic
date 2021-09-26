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
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(self.playbackStateDidChange(notification:)),
            name: Notification.Name.MPMusicPlayerControllerPlaybackStateDidChange,
            object: nil)
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    let player = MPMusicPlayerController.applicationMusicPlayer
    var prevPlaybackState: MPMusicPlaybackState = .stopped
    var started = false

    @objc private func playbackStateDidChange(notification: NSNotification) {
        var result = ""

        if started &&
           player.currentPlaybackTime == 0.0 &&
           player.playbackState == .paused &&
           prevPlaybackState == .paused
        {
            result = "completed"
            prevPlaybackState = .stopped
            started = false
        }
        else if player.playbackState == .playing &&
                prevPlaybackState != .playing
        {
            result = "playing"
            started = true
        }
        else if player.playbackState == .paused &&
                prevPlaybackState != .paused
        {
            result = "paused"
        }
        else if player.playbackState == .stopped &&
                prevPlaybackState != .stopped
        {
            result = "stopped"
        }
        else if player.playbackState == .interrupted &&
                prevPlaybackState != .interrupted
        {
            result = "paused"
        }

        if result != "" {
            notifyListeners("playbackStateDidChange", data: ["result": result])
        }

        prevPlaybackState = player.playbackState
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
}

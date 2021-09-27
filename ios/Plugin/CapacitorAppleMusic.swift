import Foundation
import MusicKit
import MediaPlayer

@available(iOS 15.0, *)
@objc public class CapacitorAppleMusic: NSObject {

    let player = MPMusicPlayerController.applicationMusicPlayer

    var prevPlaybackState: MPMusicPlaybackState = .stopped
    var started = false
    @objc public func playbackStateDidChange() -> String {
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
        else if !started
        {
            result = "loading"
        }

        prevPlaybackState = player.playbackState

        return result
    }

    @objc public func echo(_ value: String) -> String {
        return value
    }

    @objc public func isAuthorized() -> Bool {
        var result = false
        if MusicAuthorization.currentStatus == .authorized {
            result = true
        }
        return result
    }

    @objc public func authorize() async -> Bool {
        var result = false
        let status = await MusicAuthorization.request()
        if status == .authorized {
            result = true
        }
        return result
    }

    @objc public func setSong(_ songId: String) async -> Bool {
        var result = false
        let request = MusicCatalogResourceRequest<MusicKit.Song>(matching: \.id, equalTo: MusicItemID(songId))
        print("songId : \(songId)")

        do {
            let response = try await request.response()
            if let track = response.items.first {
                print("name : \(track.title)")
                ApplicationMusicPlayer.shared.queue = [track]
            }
            result = true
        } catch {
            print(error)
        }

        return result
    }

    @objc public func play() async -> Bool {
        var result = false
        do {
            try await ApplicationMusicPlayer.shared.play()
            result = true
        } catch {
            print(error)
        }
        return result
    }

    @objc public func stop() async -> Bool {
        ApplicationMusicPlayer.shared.stop()
        return true
    }

    @objc public func pause() async -> Bool {
        ApplicationMusicPlayer.shared.pause()
        return true
    }

    @objc public func currentPlaybackTime() async -> Double {
        return ApplicationMusicPlayer.shared.playbackTime
    }

    @objc public func seekToTime(_ playbackTime: Double) async -> Bool {
        ApplicationMusicPlayer.shared.playbackTime = playbackTime
        return true
    }
}

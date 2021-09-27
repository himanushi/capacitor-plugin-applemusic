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

    var playable = false
    @objc public func setSong(_ songId: String) async -> Bool {
        var result = false
        let request = MusicCatalogResourceRequest<MusicKit.Song>(matching: \.id, equalTo: MusicItemID(songId))

        do {
            let response = try await request.response()

            guard let track = response.items.first else {
                return false
            }

            playable = track.playParameters != nil
            if(playable) {
                ApplicationMusicPlayer.shared.queue = [track]
                result = true
            } else {
                let query = MPMediaQuery.songs()
                let filter = MPMediaPropertyPredicate(
                    value: track.title,
                    forProperty: MPMediaItemPropertyTitle,
                    comparisonType: .equalTo)
                query.filterPredicates = NSSet(object: filter) as? Set<MPMediaPredicate>
                player.setQueue(with: query)
                result = true
            }

        } catch {
            print(error)
        }

        return result
    }

    @objc public func play() async -> Bool {
        var result = false
        do {
            if(playable) {
                try await ApplicationMusicPlayer.shared.play()
            } else {
                player.play()
            }
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

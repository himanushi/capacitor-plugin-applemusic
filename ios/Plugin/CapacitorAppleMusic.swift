import Foundation
import MusicKit
import StoreKit
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

            // reset
            ApplicationMusicPlayer.shared.queue = []
            player.setQueue(with: [])

            if(playable) {
                // Apple Music
                ApplicationMusicPlayer.shared.queue = [track]
                result = true
            } else {
                let term = track.title
                                .replacingOccurrences(of: ",", with: " ")
                                .addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)
                let urlString = "https://api.music.apple.com/v1/me/library/search?term=\(term!)&types=library-songs&limit=25"
                guard let url = URL(string: urlString) else { return false }

                let data = try await MusicDataRequest(urlRequest: URLRequest(url: url)).response()
                let response: LibrarySongsResults = try JSONDecoder().decode(LibrarySongsResults.self, from: data.data)

                if let purchasedTrack = response.results?.librarySongs?.data?.filter({ song in
                    return song.attributes?.playParams?.purchasedID == songId
                }).first {
                    // Play a song purchased from iTunes.
                    let query = MPMediaQuery.songs()
                    let trackTitleFilter = MPMediaPropertyPredicate(
                        value: purchasedTrack.attributes?.name,
                        forProperty: MPMediaItemPropertyTitle,
                        comparisonType: .equalTo)
                    let albumTitleFilter = MPMediaPropertyPredicate(
                        value: purchasedTrack.attributes?.albumName,
                        forProperty: MPMediaItemPropertyAlbumTitle,
                        comparisonType: .equalTo)
                    let filterPredicates: Set<MPMediaPredicate> = [trackTitleFilter, albumTitleFilter]
                    query.filterPredicates = filterPredicates
                    if (query.items?.count ?? 0) > 0 {
                        player.setQueue(with: query)
                        result = true
                    }
                } else {
                    // Play the preview
                }
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

    // ref: https://app.quicktype.io/
//    {
//         "results": {
//             "library-songs": {
//                 "data": [{
//                     "attributes": {
//                         "name": "D8: バトル〜Adel",
//                         "albumName": "DESTINY 8 - SaGa Band Arrangement Album Vol.2",
//                         "playParams": {
//                            "id": "i.xxxxxxxxxxxxxx",
//                            "isLibrary": true,
//                            "kind": "song",
//                            "purchasedId": "1577159951",
//                            "reporting": false,
//                            "catalogId": "1175972539"
//                         }
//                     },
//                     "id": ""
//                 }]
//             }
//         }
//    }

    // MARK: - LibrarySongsResults
    struct LibrarySongsResults: Codable {
        let results: Results?
    }

    // MARK: - Results
    struct Results: Codable {
        let librarySongs: LibrarySongs?

        enum CodingKeys: String, CodingKey {
            case librarySongs = "library-songs"
        }
    }

    // MARK: - LibrarySongs
    struct LibrarySongs: Codable {
        let data: [Datum]?
    }

    // MARK: - Datum
    struct Datum: Codable {
        let attributes: Attributes?
        let id: String?
    }

    // MARK: - Attributes
    struct Attributes: Codable {
        let name, albumName: String?
        let playParams: PlayParams?
    }

    // MARK: - PlayParams
    struct PlayParams: Codable {
        let id: String?
        let isLibrary: Bool?
        let kind, purchasedID: String?
        let reporting: Bool?
        let catalogID: String?

        enum CodingKeys: String, CodingKey {
            case id, isLibrary, kind
            case purchasedID = "purchasedId"
            case reporting
            case catalogID = "catalogId"
        }
    }
}

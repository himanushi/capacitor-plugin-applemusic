import Foundation
import MusicKit

@available(iOS 15.0, *)
@objc public class CapacitorAppleMusic: NSObject {
    @objc public func echo(_ value: String) -> String {
        return value
    }

    @objc public func isAuthorized() -> Bool {
        var result: Bool = false
        if MusicAuthorization.currentStatus == .authorized {
            result = true
        }
        return result
    }

    @objc public func authorize() async -> Bool {
        var result: Bool = false
        let status = await MusicAuthorization.request()
        if status == .authorized {
            result = true
        }
        return result
    }

    @objc public func setQueue(_ songId: String) async -> Bool {
        var result = false
        let request = MusicCatalogResourceRequest<MusicKit.Song>(
            matching: \.id, equalTo: MusicItemID(songId))
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
}

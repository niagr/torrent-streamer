// Custom type definitions and augmentations



declare namespace TorrentStream {

    interface TorrentMetadata {
        pieceLength: number;
        infoHash: string;
        name: string;
    }

    interface TorrentEngine {
        torrent: TorrentMetadata;
    }
}
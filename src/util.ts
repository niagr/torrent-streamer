import * as nodefs from "fs"

export namespace fs {
    export function accessAsync (filePath: string) {
        return new Promise((resolve, reject) => nodefs.access(filePath, err => err ? reject(err) : resolve()))
    }

    // wrap node fs.open in Promise
    export function openAsync(path: string, flags: string): Promise<number> {
        return new Promise<number>((resolve, reject) => nodefs.open(path, flags, (err, fd) => err ? reject(err) : resolve(fd)))
    }

    // wrap node fs.stat in Promise
    export function statAsync(path: string): Promise<nodefs.Stats> {
        return new Promise((resolve, reject) => nodefs.stat(path, (err, stats) => err? reject(err): resolve(stats)))
    }
}
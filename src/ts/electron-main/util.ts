import * as fs from "fs"

// wrap node fs.open in Promise
export function openFileAsync(path: string, flags: string): Promise<number> {
    return new Promise<number>((resolve, reject) => fs.open(path, flags, (err, fd) => err ? reject(err) : resolve(fd)))
}

// wrap node fs.stat in Promise
export function statAsync(path: string): Promise<fs.Stats> {
    return new Promise((resolve, reject) => fs.stat(path, (err, stats) => err? reject(err): resolve(stats)))
}
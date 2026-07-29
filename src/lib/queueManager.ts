export class QueueManager {
  private queue: string[] = []
  private currentIndex: number = -1
  private originalQueue: string[] = []
  private shuffle: boolean = false

  constructor(songs: string[] = []) {
    this.setQueue(songs)
  }

  public setQueue(songs: string[]) {
    this.queue = [...songs]
    this.originalQueue = [...songs]
    this.currentIndex = -1
  }

  public addToQueue(songId: string) {
    this.queue.push(songId)
    if (this.originalQueue.length > 0) {
      this.originalQueue.push(songId)
    }
  }

  public removeFromQueue(index: number) {
    if (index >= 0 && index < this.queue.length) {
      this.queue.splice(index, 1)
      if (index <= this.currentIndex && this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }

  public play(songId: string) {
    const index = this.queue.indexOf(songId)
    if (index !== -1) {
      this.currentIndex = index
      return this.current()
    }
    return null
  }

  public next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++
      return this.current()
    }
    return null
  }

  public previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      return this.current()
    }
    return null
  }

  public current() {
    if (this.currentIndex >= 0 && this.currentIndex < this.queue.length) {
      return this.queue[this.currentIndex]
    }
    return null
  }

  public getCurrentIndex() {
    return this.currentIndex
  }

  public setShuffle(shuffle: boolean) {
    this.shuffle = shuffle

    if (shuffle) {
      const current = this.queue[this.currentIndex]
      const beforeCurrent = this.queue.slice(0, this.currentIndex)
      const afterCurrent = this.queue.slice(this.currentIndex + 1)

      // Fisher-Yates shuffle
      for (let i = afterCurrent.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[afterCurrent[i], afterCurrent[j]] = [afterCurrent[j], afterCurrent[i]]
      }

      this.queue = [...beforeCurrent, current, ...afterCurrent]
    } else {
      // Restore original order
      const current = this.queue[this.currentIndex]
      this.queue = [...this.originalQueue]
      if (current) {
        this.currentIndex = this.queue.indexOf(current)
      }
    }
  }

  public isShuffle() {
    return this.shuffle
  }

  public getQueue() {
    return [...this.queue]
  }

  public getQueueLength() {
    return this.queue.length
  }

  public clear() {
    this.queue = []
    this.originalQueue = []
    this.currentIndex = -1
  }
}

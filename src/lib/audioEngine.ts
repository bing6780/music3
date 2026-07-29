export interface AudioEngineEvents {
  play: (time: number) => void
  pause: (time: number) => void
  seek: (time: number) => void
  ended: () => void
  timeupdate: (time: number, duration: number) => void
  error: (error: Error) => void
}

export class AudioEngine {
  private audio: HTMLAudioElement
  private listeners: Map<keyof AudioEngineEvents, Function[]> = new Map()
  private audioContext?: AudioContext
  private analyser?: AnalyserNode

  constructor() {
    this.audio = new Audio()
    this.audio.crossOrigin = 'anonymous'
    this.setupEventListeners()
  }

  private setupEventListeners() {
    this.audio.addEventListener('play', () => {
      this.emit('play', this.audio.currentTime)
    })

    this.audio.addEventListener('pause', () => {
      this.emit('pause', this.audio.currentTime)
    })

    this.audio.addEventListener('seeking', () => {
      this.emit('seek', this.audio.currentTime)
    })

    this.audio.addEventListener('ended', () => {
      this.emit('ended')
    })

    this.audio.addEventListener('timeupdate', () => {
      this.emit('timeupdate', this.audio.currentTime, this.audio.duration)
    })

    this.audio.addEventListener('error', () => {
      const error = new Error(`Audio loading error: ${this.audio.error?.message}`)
      this.emit('error', error)
    })
  }

  public on<K extends keyof AudioEngineEvents>(event: K, callback: AudioEngineEvents[K]) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  public off<K extends keyof AudioEngineEvents>(event: K, callback: AudioEngineEvents[K]) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit<K extends keyof AudioEngineEvents>(event: K, ...args: any[]) {
    const callbacks = this.listeners.get(event) || []
    callbacks.forEach((cb) => cb(...args))
  }

  public load(src: string) {
    this.audio.src = src
  }

  public play() {
    return this.audio.play().catch((e) => {
      console.error('Play error:', e)
    })
  }

  public pause() {
    this.audio.pause()
  }

  public seek(time: number) {
    this.audio.currentTime = Math.max(0, Math.min(time, this.audio.duration))
  }

  public setVolume(volume: number) {
    this.audio.volume = Math.max(0, Math.min(1, volume))
  }

  public getVolume() {
    return this.audio.volume
  }

  public getCurrentTime() {
    return this.audio.currentTime
  }

  public getDuration() {
    return this.audio.duration
  }

  public isPlaying() {
    return !this.audio.paused
  }

  public getAudio() {
    return this.audio
  }

  // Web Audio API visualizer support
  public getAnalyser() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    if (!this.analyser) {
      const source = this.audioContext.createMediaElementAudioSource(this.audio)
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 256
      source.connect(this.analyser)
      this.analyser.connect(this.audioContext.destination)
    }

    return this.analyser
  }

  public destroy() {
    this.audio.pause()
    this.audio.src = ''
    this.listeners.clear()
    if (this.audioContext) {
      this.audioContext.close()
    }
  }
}

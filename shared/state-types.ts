export interface SequencerConfig {
  INTRO: number;          // ms
  COUNTDOWN: number;      // ms
  INSTRUCTIONS: number;   // ms
  PRIZE_SPONSORS: number; // ms
  DRAW_LOOP: number;      // ms (optional upper bound)
  WINNER: number;         // ms
  MINIGAME: number;       // ms
}

export interface GameMode {
  id: string;             // 'regular' | 'x' | 'l' | ...
  label: string;
  pattern: string;        // free-form hint, e.g. 'X', 'L', 'FULL'
}

export interface ThemePack {
  id: string;
  name: string;
  palette?: Record<string, string>;
  fonts?: string[];
  backgrounds?: string[]; // file paths
  numberAnimation?: string;
  winAnimation?: string;
}

export interface SponsorAsset {
  id: string;
  type: 'image'|'video';
  src: string;            // absolute or app-relative file path
  duration: number;       // ms
  ctaQr?: string;         // optional
}

export interface SessionState {
  phase: string;                // matches Phase
  modeIndex: number;            // index into modes array
  drawnNumbers: number[];
  rngSeed: number;
  timers: Record<string, number>; // remaining time per phase (ms)
  activeThemeId: string;
  sponsorIndex: number;         // playlist pointer
  startedAt: number;            // epoch ms
}

export interface ConfigSettings {
  modes: GameMode[];
  sequencer: SequencerConfig;
  themeId: string;
  sponsors: SponsorAsset[];
  draw: {
    intervalMs: number;
    animation: string;
    boardStyle: string;
  };
  winner: {
    animation: string;
    durationMs: number;
  };
  miniGameEnabled: boolean;
  displayBindings?: {
    configurator?: number;
    host?: number;
    main?: number;
    grid?: number;
  };
}

export interface Move {
    name: string;
    category: 'Basic' | 'Balance' | 'Playbook';
    rollsWith: keyof Stats | null;
    description: string[];
}

export interface Technique {
    name: string;
    training: string[];
    approach: Approach;
    description: string[];
    mastery: 'learned' | 'mastered';
}

export interface Feature {}

export interface Stats {
    creativity: number;
    focus: number;
    harmony: number;
    passion: number;
}

export interface Playbook {
    id: string;
    name: string;
    banner: string;
    tagline: string;
    description: string[];
    principles: {
        names: string[];
        description: string[];
    }
    stats: Stats;
    customization: {
        demeanorOptions: string[];
        historyQuestions: string[];
        connections: string[];
    }
    demeanorOptions: string[];
    historyQuestions: string[];
    momentOfBalance: string;
    feature: {
        header: string;
        details: string[];
    }
    moves: Move[];
    movesAdvice: string[];
    secondaryBanner: string;
    advancedTechnique: {
        technique: Move;
        advice: string;
    }
    growthQuestion: {
        question: string;
        details: string;
    }
}

export interface CharacterDraft {
    step: number;
}

export interface Era {
    name: string;
}

export interface Training {}

export interface IconOption {
    id: string;
    url: string;
}

export type Approach = 'attack' | 'defend' | 'evade';
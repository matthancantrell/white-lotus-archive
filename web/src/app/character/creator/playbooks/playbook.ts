

export interface Playbook {
    id: string;
    name: string;
    banner: string;
    tagline: string;
    description: string[];
    principles: [string, string];
    principlesDescription: string[];
    stats: { creativity: number; focus: number; harmony: number; passion: number }
}
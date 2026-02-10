// Common types
export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface MoodEntry {
    id: string;
    date: string;
    mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'tired';
    weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
    note?: string;
    image?: string;
}


export enum AppSection {
  LANDING = 'LANDING',
  STICKY_NOTES = 'STICKY_NOTES',
  STORY = 'STORY',
  GAMES = 'GAMES',
  CAKE = 'CAKE',
  FINAL_NOTE = 'FINAL_NOTE'
}

export interface StoryChapter {
  id: number;
  title: string;
  year: string;
  content: string;
  imageUrl: string;
}

export interface StickyNote {
  id: number;
  text: string;
  emoji: string;
  color: string;
}

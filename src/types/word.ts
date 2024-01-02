export interface WordMetadata {
  learned: boolean;
  date: Date;
}

export interface Word {
  id: number;
  word: string;
  meaning: string;
  learned: boolean;
  phoneme: string;
  tags: string[];
  metadata: WordMetadata;
}

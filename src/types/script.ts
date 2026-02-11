export interface ScriptItem {
  start: number;
  end: number;
  text: string;
  is_important?: boolean;
}

export interface Script {
  segments: ScriptItem[];
  highlights?: string[];
  summary?: string;
  relatedVideos?: { title: string; thumbnail: string; videoId: string }[];
  important_indices?: number[];
}

export interface ScriptData extends Omit<Script, "segments"> {
  id: string;
  scripts: ScriptItem[];
}

export interface ScriptOverview {
  id: string;
  [key: string]: any;
}

export interface HighlightValue {
  value: string;
  matchLevel: string;
  matchedWords: string[];
  fullyHighlighted?: boolean;
}

export interface HighlightResult {
  full_text?: HighlightValue;
  title?: HighlightValue;
  [key: string]: HighlightValue | undefined;
}

export interface ScriptSearch {
  id: string;
  category_id: string;
  title: string;
  category?: string;
  full_text?: string;
  updatedAt?: any;
  _highlightResult?: HighlightResult;
  [key: string]: any;
}

export interface PlaybackMetadata {
  time: number;
  rate: number;
  duration: number;
}

export interface Category {
  id: string;
  name: string;
}

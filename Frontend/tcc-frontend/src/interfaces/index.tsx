import { GraphEdge, GraphNode } from 'reagraph';

export interface CsvRow {
  Subject: string;
  Relation: string;
  Object: string;
}

export interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<string>;
}

export interface CsvParserReturn {
  nodes: GraphNode[];
  edges: GraphEdge[];
  uniqueNodes: Map<string, GraphNode>;
}

export interface AnswersRakingProps {
  answers: Answers[];
  setHighlightedPath: React.Dispatch<string[]>;
  setAnswers: React.Dispatch<Answers[]>;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}

export interface Message {
  sender: 'user' | 'server';
  content: string;
}

export interface ChatBoxProps {
  messages: Message[];
  uniqueNodes: Map<string, GraphNode>;
  setHighlightedPath: React.Dispatch<string[]>;
  setAnswers: React.Dispatch<Answers[]>;
}

export interface Answers {
  label: string;
  path: string[];
  checked: boolean;
}

export interface TopbarProps {
  setResetKey: React.Dispatch<number>;
  resetKey: number;
}

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

export interface csvParserReturn {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

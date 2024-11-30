import { GraphNode } from 'reagraph';
import { verifyPath } from '../utils/verifyPath';

export const searchPath = async (
  input: string,
  uniqueNodes: Map<string, GraphNode>,
): Promise<string[]> => {
  try {
    const response = await fetch('http://localhost:5000/process_query_first', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });

    if (!response.ok) throw new Error('Erro ao buscar o caminho.');

    const data: string[] = await response.json();
    const highlightedPath: string[] = verifyPath(data, uniqueNodes);
    return highlightedPath;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
};

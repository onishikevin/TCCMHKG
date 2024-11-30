import { GraphNode } from 'reagraph';

export const verifyPath = (path: string[], uniqueNodes: Map<string, GraphNode>): string[] => {
  const correctedPath: string[] = [];
  path.forEach((element, index, paths) => {
    if (!uniqueNodes.has(element)) {
      correctedPath.push(`${paths[index - 1]}-${element}-${paths[index + 1]}`);
      correctedPath.push(`${paths[index + 1]}-${element}-${paths[index - 1]}`);
    } else {
      correctedPath.push(element);
    }
  });
  return correctedPath;
};

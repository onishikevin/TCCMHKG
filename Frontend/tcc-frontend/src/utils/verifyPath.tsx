import { GraphNode } from 'reagraph';

export const verifyPath = (paths: string[][], uniqueNodes: Map<string, GraphNode>): string[][] => {
  const correctedPaths: Array<Array<string>> = new Array<Array<string>>();
  paths.forEach((path) => {
    const pathForCurrentAnswer: string[] = [];
    path.forEach((element, pathIndex, path) => {
      if (!uniqueNodes.has(element)) {
        pathForCurrentAnswer.push(`${path[pathIndex - 1]}-${element}-${path[pathIndex + 1]}`);
        pathForCurrentAnswer.push(`${path[pathIndex + 1]}-${element}-${path[pathIndex - 1]}`);
      } else {
        pathForCurrentAnswer.push(element);
      }
    });
    correctedPaths.push(pathForCurrentAnswer);
  });
  console.log(correctedPaths);
  return correctedPaths;
};

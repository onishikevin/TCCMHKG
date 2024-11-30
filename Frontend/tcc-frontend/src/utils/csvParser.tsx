import Papa from 'papaparse';
import { GraphEdge, GraphNode } from 'reagraph';
import { csvParserReturn, CsvRow } from '../interfaces';

export const csvParser = async (): Promise<csvParserReturn> => {
  const uniqueNodes = new Map<string, GraphNode>();
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  await fetch('./src/assets/grafo.csv')
    .then((response) => {
      if (!response.ok) throw new Error('Erro ao carregar o arquivo CSV');
      return response.text();
    })
    .then((csvText) => {
      Papa.parse<CsvRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const { data } = result;
          const graphEdges: GraphEdge[] = [];

          data.forEach((row) => {
            const { Subject, Relation, Object } = row;

            if (!uniqueNodes.has(Subject)) {
              uniqueNodes.set(Subject, { id: Subject, label: Subject });
            }
            if (!uniqueNodes.has(Object)) {
              uniqueNodes.set(Object, { id: Object, label: Object });
            }
            graphEdges.push({
              id: `${Subject}-${Relation}-${Object}`,
              source: Subject,
              target: Object,
              label: Relation,
              labelVisible: true,
            });
          });
          nodes.push(...Array.from(uniqueNodes.values()));
          edges.push(...graphEdges);
        },
      });
    })
    .catch((error) => console.error('Erro ao carregar CSV:', error));
  return { nodes, edges };
};

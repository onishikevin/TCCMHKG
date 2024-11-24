import React, { useEffect, useState } from 'react';
import { GraphCanvas, GraphNode, GraphEdge } from 'reagraph';
import Papa from 'papaparse';
import '../styles/GraphVisualizer.css';

interface CsvRow {
  Subject: string;
  Relation: string;
  Object: string;
}

const GraphVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);
  const [uniqueNodes] = useState<Map<string, GraphNode>>(new Map<string, GraphNode>());

  useEffect(() => {
    fetch('./src/assets/grafo.csv')
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
            // Construir nós e arestas
            // const uniqueNodes = new Map<string, GraphNode>();
            const graphEdges: GraphEdge[] = [];

            data.forEach((row) => {
              const { Subject, Relation, Object } = row;

              // Adiciona nós
              if (!uniqueNodes.has(Subject)) {
                uniqueNodes.set(Subject, { id: Subject, label: Subject });
              }
              if (!uniqueNodes.has(Object)) {
                uniqueNodes.set(Object, { id: Object, label: Object });
              }
              // Adiciona arestas
              graphEdges.push({
                id: `${Subject}-${Relation}-${Object}`,
                source: Subject,
                target: Object,
                label: Relation,
                labelVisible: true,
              });
            });

            setNodes(Array.from(uniqueNodes.values()));
            setEdges(graphEdges);
          },
        });
      })
      .catch((error) => console.error('Erro ao carregar CSV:', error));
  }, []);

  // Função para buscar caminho do backend
  const buscarCaminho = async (input: string) => {
    try {
      const response = await fetch('http://localhost:5000/process_query_first', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error('Erro ao buscar o caminho.');

      const data: string[] = await response.json();
      setHighlightedPath(verificarCaminho(data));
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const verificarCaminho = (path: string[]) => {
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

  return (
    <div className="container">
      <h2>Visualizador de Grafo com Caminho Percorrido</h2>
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Digite sua consulta"
          onKeyDown={(e) => {
            if (e.key === 'Enter') buscarCaminho(e.currentTarget.value);
          }}
        />
      </div>
      <div className="canvaContainer">
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          // selections={highlightedPath}
          layoutType="forceDirected2d"
          cameraMode="pan"
          actives={highlightedPath}
          labelType="all"
          edgeLabelPosition="natural"
          onNodeClick={(node) => console.log('Nó clicado:', node)}
          draggable
        />
      </div>
      <div>
        <h2> Resposta: {highlightedPath[highlightedPath.length - 1]}</h2>
      </div>
    </div>
  );
};

export default GraphVisualizer;

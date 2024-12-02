import { Box, Grid2, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { GraphCanvas, GraphNode, GraphEdge } from 'reagraph';
import Header from '../../components/header';
import { csvParser } from '../../utils/csvParser';
import AnswersRanking from '../../components/ranking';
import ChatBox from '../../components/chat';
import { Answers, Message } from '../../interfaces';
import { getGraphCanvaTheme } from '../../theme';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);
  const [uniqueNodes, setUniqueNodes] = useState<Map<string, GraphNode>>(
    new Map<string, GraphNode>(),
  );
  const [messages] = useState<Message[]>([
    { sender: 'server', content: 'Welcome to our ChatBot about the Blue Amazon!' },
  ]);
  const [answers, setAnswers] = useState<Answers[]>([]);
  const theme = useTheme();
  const canvaTheme = getGraphCanvaTheme(theme.palette.mode);

  useEffect(() => {
    csvParser()
      .then((result) => {
        setNodes(result.nodes);
        setEdges(result.edges);
        setUniqueNodes(result.uniqueNodes);
      })
      .catch((error) => console.error('Erro ao carregar nodes e edges:', error));
  }, []);

  return (
    <>
      <Box sx={{ mr: '20px' , ml:'20px'}}>
        <Box display="flex" justifyContent="space-between" alignItems>
          <Header
            title={'Knowledge Graphs'}
            subtitle={'Multi-Hop Question Answering with Knowledge Graphs'}
          />
        </Box>
      </Box>
      <Grid2 container spacing={2} sx={{ mr: '50px' , ml:'50px' ,mt:'10px', mb:'10px'}}>
        <Grid2 size={10} height="50vh">
          <Box position="absolute" width="65vw" height="50%">
            <GraphCanvas
              theme={canvaTheme}
              nodes={nodes}
              edges={edges}
              selections={highlightedPath}
              layoutType="forceDirected2d"
              cameraMode="pan"
              actives={highlightedPath}
              labelType="all"
              edgeLabelPosition="natural"
              onNodeClick={(node) => console.log('Nó clicado:', node)}
              draggable
            />
          </Box>
        </Grid2>
        <Grid2 size={2}>
          <AnswersRanking
            answers={answers}
            setHighlightedPath={setHighlightedPath}
            setAnswers={setAnswers}
          />
        </Grid2>
        <Grid2 size={9}>
          <ChatBox
            messages={messages}
            uniqueNodes={uniqueNodes}
            setHighlightedPath={setHighlightedPath}
            setAnswers={setAnswers}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default GraphVisualizer;

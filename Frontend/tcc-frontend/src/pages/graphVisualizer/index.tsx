import { Box, Grid2, Paper, Typography, useTheme, Stack } from '@mui/material';
import { tokens } from '../../theme';
import React, { useEffect, useState } from 'react';
import { GraphCanvas, GraphNode, GraphEdge } from 'reagraph';
import Header from '../../components/header';
import { csvParser } from '../../utils/csvParser';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  useEffect(() => {
    csvParser()
      .then((result) => {
        setNodes(result.nodes);
        setEdges(result.edges);
      })
      .catch((error) => console.error('Erro ao carregar nodes e edges:', error));
  }, []);

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems>
          <Header
            title={'Grafo de conhecimento'}
            subtitle={'Grafo de conhecimento junto com algoritmos de salto de contexto'}
          />
        </Box>
      </Box>
      {/* <Grid2 container spacing={2} m="50px">
        <Grid2 size={9} md={8} height="75vh">
          <Grid2 container spacing={2}>
            <Grid2 size="12" width="100%" height="100%">
              <Box
                position="absolute"
                width="50%"
                height="50%"
                styles={{ transfor: 'translate(-50%, -50%)' }}
              >
                <GraphCanvas
                  nodes={nodes}
                  edges={edges}
                  // selections={highlightedPath}
                  layoutType="forceDirected2d"
                  cameraMode="pan"
                  // actives={highlightedPath}
                  labelType="all"
                  edgeLabelPosition="natural"
                  onNodeClick={(node) => console.log('Nó clicado:', node)}
                  draggable
                />
              </Box>
            </Grid2>
            <Grid2 size="12">
              <Box>
                <Paper> CHAT </Paper>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={3} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>RANKING</Typography>
          </Paper>
        </Grid2>
      </Grid2> */}
      <Grid2 container spacing={2} m="50px">
        <Grid2 size={11} height="50vh">
          <Box position="absolute" width="70vw" height="50%">
            <GraphCanvas
              nodes={nodes}
              edges={edges}
              // selections={highlightedPath}
              layoutType="forceDirected2d"
              cameraMode="pan"
              // actives={highlightedPath}
              labelType="all"
              edgeLabelPosition="natural"
              onNodeClick={(node) => console.log('Nó clicado:', node)}
              draggable
            />
          </Box>
        </Grid2>
        <Grid2 size={1}>RANKING</Grid2>
        <Grid2 size={10}>CHAT</Grid2>
      </Grid2>
    </>
  );
};

export default GraphVisualizer;

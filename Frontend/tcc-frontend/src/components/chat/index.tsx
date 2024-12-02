import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  useTheme,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { tokens } from '../../theme';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Answers, ChatBoxProps } from '../../interfaces';
import { searchPath } from '../../services/searchPath';
import { AccountCircle } from '@mui/icons-material';

const ChatBox = ({ messages, uniqueNodes, setHighlightedPath, setAnswers }: ChatBoxProps) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [numericParam, setNumericParam] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSendMessage = () => {
    if (inputMessage !== '') {
      setIsLoading(true);
      console.log('Mensagem enviada:', inputMessage);
      console.log('Parâmetro numérico selecionado:', numericParam);
      messages.push({ content: inputMessage, sender: 'user' });

      searchPath(inputMessage, uniqueNodes)
        .then((result: string[][]) => {
          const currentAnswers: Answers[] = [];
          result.forEach((path, index) => {
            if (index < numericParam) {
              if (index === 0) {
                setHighlightedPath(path);
                messages.push({
                  content: `I think the most suited answer is: ${path[path.length - 1]}`,
                  sender: 'server',
                });
                currentAnswers.push({
                  label: `${index + 1} - ${path[path.length - 1]}`,
                  path: path,
                  checked: true,
                });
              } else {
                currentAnswers.push({
                  label: `${index + 1} - ${path[path.length - 1]}`,
                  path: path,
                  checked: false,
                });
              }
            }
          });
          setAnswers(currentAnswers);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao receber resposta do servidor:', error);
          setIsLoading(false);
        });
      setInputMessage('');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="300px"
      border={`1px solid ${colors.primary[900]}`}
      borderRadius="8px"
      overflow="hidden"
    >
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(0, 0, 0, 0.5)"
          zIndex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Box
        flex={1}
        overflow="auto"
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
        bgcolor={`${colors.primary[600]}`}
        height="300px"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Paper
              elevation={3}
              style={{
                padding: '10px 15px',
                borderRadius: '15px',
                maxWidth: '60%',
                backgroundColor:
                  message.sender === 'user'
                    ? `${colors.greenAccent[600]}`
                    : `${colors.primary[400]}`,
              }}
            >
              <Typography>{message.content}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Input de mensagem e dropdown */}
      <Box display="flex" alignItems="center" p={1} borderTop={`1px solid ${colors.primary[900]}`}>
        <TextField
          autoComplete="false"
          fullWidth
          variant="outlined"
          placeholder="Enter here your question"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          onKeyDown={(ev) => {
            console.log(`Pressed keyCode ${ev.key} with ${inputMessage}`);
            if (ev.key === 'Enter') {
              ev.preventDefault();
              handleSendMessage();
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${colors.greenAccent[300]}`,
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
          onClick={handleSendMessage}
          sx={{
            '&:hover': {
              backgroundColor: `${colors.greenAccent[300]}`,
            },
          }}
        >
          Send
          <SendOutlinedIcon fontSize="medium" margin="10px" />
        </Button>
        <Select
          value={numericParam}
          onChange={(e) => setNumericParam(Number(e.target.value))}
          style={{}}
          sx={{
            marginLeft: '10px',
            width: '60px',

            '&.Mui-focused fieldset': {
              borderColor: `${colors.greenAccent[300]} !important`,
            },
          }}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value}>
              {value} Answers
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default ChatBox;

// '& .MuiOutlinedInput-input:-webkit-autofill': {
//               WebkitBoxShadow: `0 0 0 100px ${colors.primary[300]} inset !important`,
//               WebkitTextFillColor: 'transparent !important',
//             },

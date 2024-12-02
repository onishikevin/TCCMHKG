import {
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
  Paper,
} from '@mui/material';
import { AnswersRakingProps } from '../../interfaces';
import { tokens } from '../../theme';

const AnswersRanking = ({ answers, setAnswers, setHighlightedPath }: AnswersRakingProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const newHighlightedPath: string[] = [];
  const handleToggle = (changeIndex: number) => {
    const newAnswers = answers.map((answer, index) => {
      if (changeIndex === index) {
        answer.checked = !answer.checked;
      }
      if (answer.checked === true) {
        newHighlightedPath.push(...answer.path);
      }
      return answer;
    });
    setAnswers(newAnswers);
    setHighlightedPath(newHighlightedPath);
    console.log('Selected items:', answers[changeIndex].label);
    console.log('All selected', answers);
  };

  return (
    <Paper
      elevation={12}
      width="100%"
      style={{
        background: `${colors.primary[400]}`,
      }}
      square={false}
    >
      <List>
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mx: '10px' }}
          textAlign="center"
        >
          Ranking
        </Typography>
        {answers.map((item, index) => (
          <ListItem key={index} disablePadding>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleToggle(index)}
                  sx={{
                    color: colors.greenAccent[800],
                    '&.Mui-checked': {
                      color: colors.greenAccent[600],
                    },
                    '& .MuiSvgIcon-root': { fontSize: 30 },
                    ml: '10px',
                  }}
                />
              }
              label={item.label}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AnswersRanking;

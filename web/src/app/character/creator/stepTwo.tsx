import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface StepTwoProps {
    name: string;
    onNameChange: (name: string) => void;
}

export default function StepTwo({ name, onNameChange }: StepTwoProps) {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Name Your Character
            </Typography>
            <TextField
                label="Character name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                fullWidth
            />
        </Box>
    );
}
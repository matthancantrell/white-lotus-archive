import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EraSelector from './eras/eraSelector';
import InformationPanel from './informationPanel';

interface StepOneProps {
    selectedEra: string | null;
    onSelectEra: (era: string | null) => void;
}

export default function StepOne({ selectedEra, onSelectEra }: StepOneProps) {
    return (

        // User should be able to:
        // - Select an era from a list of eras with a side bar populating with the era's details
        // - Select the campaign details button to provide optional details
        // - Provide the character's name, gender, and pronouns
        // - Select a character icon

        <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create A Character
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '1.5rem' }}>
                    Each game begins with your group picking an era as the backdrop for your game.
                    The eras are each tied to the span of an Avatar&apos;s life—except for the Hundred
                    Year War era during which Avatar Aang was frozen—and focuses on distinct themes
                    which define the type of game you play.
                </Typography>

                <EraSelector selectedEra={selectedEra} onSelectEra={onSelectEra} />
            </Box>

            <InformationPanel selectedEra={selectedEra} />
        </Box>
    );
}
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EraSelector from './eras/eraSelector';
import InformationPanel from './informationPanel';

export default function StepOne() {
    // User should be able to:
    // - Select an era from a list of eras with a side bar populating with the era's details
    // - Select the campaign details button to provide optional details
    // - Provide the character's name, gender, and pronouns
    // - Select a character icon

    const [selectedEra, setSelectedEra] = useState<string | null>(null);

    return (
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

                <EraSelector selectedEra={selectedEra} onSelectEra={setSelectedEra} />
            </Box>

            <InformationPanel selectedEra={selectedEra} />
        </Box>
    );
}
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface InformationPanelProps {
    selectedEra: string | null;
}

const ERA_CONTENT: Record<string, { title: string; body: string }> = {
    kyoshi: {
        title: 'The Kyoshi Era',
        body: 'During the Kyoshi Era, the world was in a state of relative peace and prosperity. Avatar Kyoshi, known for her unwavering sense of justice and formidable bending skills, played a crucial role in maintaining balance and order. Her era was marked by significant cultural developments and the establishment of the Kyoshi Warriors.',
    },
    roku: {
        title: 'The Roku Era',
        body: 'During the Roku Era, the world experienced significant changes and challenges. Avatar Roku, known for his wisdom and strong connection to the elements, led the fight against the Fire Nation and worked to maintain peace and balance.',
    },
    hyw: {
        title: "The Hundred Years' War",
        body: "During the Hundred Years' War, the world was torn apart by conflict between the Fire Nation and the other nations. This era was characterized by intense warfare, political intrigue, and the struggle for power and control.",
    },
    aang: {
        title: 'The Aang Era',
        body: 'During the Aang Era, the world was torn apart by conflict between the Fire Nation and the other nations. This era was characterized by intense warfare, political intrigue, and the struggle for power and control.',
    },
    korra: {
        title: 'The Korra Era',
        body: 'During the Korra Era, the world was torn apart by conflict between the Fire Nation and the other nations. This era was characterized by intense warfare, political intrigue, and the struggle for power and control.',
    },
};

export default function InformationPanel({ selectedEra }: InformationPanelProps) {
    const content = selectedEra ? ERA_CONTENT[selectedEra] : null;

    return (
        <Paper
            variant="outlined"
            sx={{
                width: '18rem',
                flexShrink: 0,
                position: 'sticky',
                top: '1rem',
                alignSelf: 'flex-start',
                padding: '1.5rem',
                borderRadius: '0.75rem',
            }}
        >
            {!content && (
                <Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                        You&apos;re the hero!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Select an era to learn more about it.
                    </Typography>
                </Box>
            )}

            {content && (
                <Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {content.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {content.body}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}
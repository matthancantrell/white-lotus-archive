import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

interface CreatorHeaderProps {
    characterName: string;
    approaches?: { creativity: number; focus: number; harmony: number; passion: number };
}

const DEFAULT_APPROACHES = { creativity: 0, focus: 0, harmony: 0, passion: 0 };

export default function CreatorHeader({ characterName, approaches = DEFAULT_APPROACHES }: CreatorHeaderProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e5e7eb',
                background: '#ffffff',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '10rem' }}>
                <Avatar sx={{ bgcolor: '#4f46e5', width: 44, height: 44, fontWeight: 700 }}>
                    {(characterName || '?').charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: '#111827' }}>
                    {characterName || 'Unnamed'}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
                {(
                    [
                        ['Creativity', approaches.creativity],
                        ['Focus', approaches.focus],
                        ['Harmony', approaches.harmony],
                        ['Passion', approaches.passion],
                    ] as const
                ).map(([label, value]) => (
                    <Chip
                        key={label}
                        label={`${value >= 0 ? '+' : ''}${value}  ${label}`}
                        variant="outlined"
                        sx={{
                            fontWeight: 600,
                            borderColor: '#d1d5db',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            letterSpacing: '0.03em',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NAV_ITEMS = [
    { label: 'Getting Started', enabled: true, complete: false },
    { label: 'Playbook', enabled: false, complete: false },
    { label: 'Concept', enabled: false, complete: false },
    { label: 'Training', enabled: false, complete: false },
    { label: 'Techniques', enabled: false, complete: false },
    { label: 'Growth', enabled: false, complete: false },
];

interface StepNavProps {
    currentIndex: number;
}

export default function StepNav({ currentIndex }: StepNavProps) {
    return (
        <Box
            sx={{
                width: '14rem',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '1.5rem 1rem',
                borderRight: '1px solid #e5e7eb',
            }}
        >
            {NAV_ITEMS.map((item, i) => {
                const isActive = item.enabled && i === currentIndex;
                return (
                    <Box
                        key={item.label}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.9rem',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: isActive ? '#4f46e5' : '#e5e7eb',
                            background: isActive ? '#eef2ff' : '#fff',
                            opacity: item.enabled ? 1 : 0.45,
                            cursor: item.enabled ? 'pointer' : 'default',
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600, color: isActive ? '#4338ca' : '#374151' }}>
                            {item.label}
                        </Typography>
                        {/* {item.complete && <CheckCircleIcon sx={{ fontSize: 18, color: '#16a34a' }} />} */}
                    </Box>
                );
            })}
        </Box>
    );
}
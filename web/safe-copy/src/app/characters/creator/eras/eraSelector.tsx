import Box from '@mui/material/Box';
import KyoshiEraButton from "./kyoshi/kyoshiEraButton";
import RokuEraButton from "./roku/rokuEraButton";
import HywEraButton from "./hundred-years-war/hywEraButton";
import AangEraButton from "./aang/aangEraButton";
import KorraEraButton from "./korra/korraEraButton";

interface EraSelectorProps {
    selectedEra: string | null;
    onSelectEra: (era: string | null) => void;
}

export default function EraSelector({ selectedEra, onSelectEra }: EraSelectorProps) {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.1rem',
            }}>
            <KyoshiEraButton isSelected={selectedEra === 'kyoshi'} onClick={() => onSelectEra('kyoshi')} />
            <RokuEraButton isSelected={selectedEra === 'roku'} onClick={() => onSelectEra('roku')} />
            <HywEraButton isSelected={selectedEra === 'hyw'} onClick={() => onSelectEra('hyw')} />
            <AangEraButton isSelected={selectedEra === 'aang'} onClick={() => onSelectEra('aang')} />
            <KorraEraButton isSelected={selectedEra === 'korra'} onClick={() => onSelectEra('korra')} />
        </Box>
    )
}
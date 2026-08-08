import Button from '@mui/material/Button';
import Image, { type StaticImageData } from 'next/image';

interface ButtonProps {
    imageSrc: StaticImageData;
    eraName: string;
    isSelected?: boolean;
    onClick: () => void;
}

export default function EraButtonBase({ imageSrc, eraName, isSelected, onClick }: ButtonProps) {
    return (
        <Button
            disableRipple
            variant = 'text'
            onClick={onClick}
            sx = {{
                flexDirection: 'column',
                gap: '0.25rem',
                textTransform: 'none',
                maxWidth: '7rem',
                lineHeight: '1rem',
            }}
        >
            <Image
                src={imageSrc}
                alt= {`${eraName}`}
                style={{
                    width: '7rem',
                    height: 'auto',
                }}
            />
            <span>{eraName}</span>
        </Button>
    )
}
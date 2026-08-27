import korraImage from '@/assets/eras/korra.jpg';
import EraButtonBase from "../eraButtonBase";

interface KorraEraProps {
    isSelected: boolean;
    onClick: () => void;
}

export default function KorraEraButton({ isSelected, onClick }: KorraEraProps) {
    return (
        <EraButtonBase 
            imageSrc={korraImage}
            eraName="Korra"
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}
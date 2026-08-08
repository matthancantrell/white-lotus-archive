import aangImage from '@/assets/eras/aang.jpg';
import EraButtonBase from "../eraButtonBase";

interface AangEraProps {
    isSelected: boolean;
    onClick: () => void;
}

export default function AangEraButton({ isSelected, onClick }: AangEraProps) {
    return (
        <EraButtonBase 
            imageSrc={aangImage}
            eraName="Aang"
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}
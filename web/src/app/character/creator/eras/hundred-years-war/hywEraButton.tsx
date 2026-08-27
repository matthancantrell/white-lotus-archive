import hywImage from '@/assets/eras/hundred-year-war.jpg';
import EraButtonBase from "../eraButtonBase";

interface HywEraProps {
    isSelected: boolean;
    onClick: () => void;
}

export default function HywEraButton({ isSelected, onClick }: HywEraProps) {
    return (
        <EraButtonBase 
            imageSrc={hywImage}
            eraName="Hundred Years War"
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}
import rokuImage from '@/assets/eras/roku.jpg';
import EraButtonBase from "../eraButtonBase";

interface RokuEraProps {
    isSelected: boolean;
    onClick: () => void;
}

export default function RokuEraButton({ isSelected, onClick }: RokuEraProps) {
    return (
        <EraButtonBase 
            imageSrc={rokuImage}
            eraName="Roku"
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}
import kyoshiImage from '@/assets/eras/kyoshi.jpg';
import EraButtonBase from "../eraButtonBase";

interface KyoshiEraProps {
    isSelected: boolean;
    onClick: () => void;
}

export default function KyoshiEraButton({ isSelected, onClick }: KyoshiEraProps) {
    return (
        <EraButtonBase 
            imageSrc={kyoshiImage}
            eraName="Kyoshi"
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}
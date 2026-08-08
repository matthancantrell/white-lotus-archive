import EraBase from '../eraBase';

export default function AangEra() {
    const name = 'Aang';
    const body = 
    <div>
        <div>
            <h2>Where We Start</h2>
            <p>The Aang Era specifically details the state of the world just after the conclusion of the Imbalance comic trilogy. 
                The Hundred Year War is finally over thanks to Avatar Aang and his team. 
                This era is one of hope after a long stretch of strife. It is a time of possibility, cooperation, and healing, restoring balance to the world. 
                For the first time in years, the nations have a chance at true cooperation, but many struggle with embracing the forgiveness needed for collaboration. 
                Plenty fight against progress towards social and political cooperation, and those who cannot change find themselves left behind, 
                holding onto narrow-minded attitudes that are quickly becoming outdated.
            </p>
        </div>
        <div>
            <h2>Avatar Aang</h2>
            <p>Avatar Aang is the protagonist of the series and the only person able to master all four elements. He is a kind-hearted and wise young man who serves as the bridge between the physical and spiritual worlds.</p>
        </div>
    </div>;

    return <EraBase name={name} body={body} />;
}
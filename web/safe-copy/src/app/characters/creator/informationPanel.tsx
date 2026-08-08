interface InformationPanelProps {
    selectedEra: string | null;
}

export default function InformationPanel({ selectedEra }: InformationPanelProps) {
    return (
        <div>
            {selectedEra === null &&
            <div>
                <h1>You&apos;re the hero!</h1>
            </div>
            }

            {selectedEra === 'kyoshi' &&
            <div>
                <h1>The Kyoshi Era</h1>
                <p>During the Kyoshi Era, the world was in a state of relative peace and prosperity. Avatar Kyoshi, known for her unwavering sense of justice and formidable bending skills, played a crucial role in maintaining balance and order. Her era was marked by significant cultural developments and the establishment of the Kyoshi Warriors.</p>
            </div>
            }

            {selectedEra === 'roku' &&
            <div>
                <h1>The Roku Era</h1>
                <p>During the Roku Era, the world experienced significant changes and challenges. Avatar Roku, known for his wisdom and strong connection to the elements, led the fight against the Fire Nation and worked to maintain peace and balance.</p>
            </div>
            }

            {selectedEra === 'hyw' &&
            <div>
                <h1>The Hundred Years&apos; War</h1>
                <p>During the Hundred Years&apos; War, the world was torn apart by conflict between the Fire Nation and the other nations. This era was characterized by intense warfare, political intrigue, and the struggle for power and control.</p>
            </div>
            }

            {selectedEra === 'aang' &&
            <div>
                <h1>The Aang Era</h1>
                <p>During the Hundred Years&apos; War, the world was torn apart by conflict between the Fire Nation and the other nations. This era was characterized by intense warfare, political intrigue, and the struggle for power and control.</p>
            </div>
            }

            {selectedEra === 'korra' &&
            <div>
                <h1>The Korra Era</h1>
                <p>During the Hundred Years&apos; War, the world was torn apart by conflict between the Fire Nation and the other nations. This era was characterized by intense warfare, political intrigue, and the struggle for power and control.</p>
            </div>
            }
        </div>
    )
}
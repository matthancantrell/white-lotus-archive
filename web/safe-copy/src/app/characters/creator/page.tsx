/* eslint-disable react/jsx-key */
import { useCharacterCreationForm } from './useCharacterCreationForm';

export default function CharacterCreatorPage() {
    const { steps, currentIndex } = useCharacterCreationForm([
        <div>One</div>,
        <div>Two</div>,
    ]);

    return (
        <div
            style={{
                position: 'relative',
                background: 'white',
                border: '1px solid black',
                padding: '2rem',
                margin: '1rem',
                borderRadius: '0.5rem',
                fontFamily: 'Arial'
            }}
        >

            <form>
                <div
                    style={{ 
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                    }}
                >
                    { currentIndex + 1} / {steps.length}
                </div>
            </form>

        </div>
    )
}
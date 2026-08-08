
export default function EraBase({ name, body }: { name: string; body: React.ReactNode }) {
    return (
        <div>
            <h1>The {name} Era</h1>
            <div>
                {body}
            </div>
        </div>
    );
}
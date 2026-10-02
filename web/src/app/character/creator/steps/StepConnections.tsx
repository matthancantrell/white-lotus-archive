import { Connection } from '../data';
import StepHeader from '../StepHeader';
import { TextField } from '../TextField';

export default function StepConnections({
  connections,
  onUpdate,
  onRemove,
  onAdd,
}: {
  connections: Connection[];
  onUpdate: (i: number, patch: Partial<Connection>) => void;
  onRemove: (i: number) => void;
  onAdd: () => void;
}) {
  return (
    <section>
      <StepHeader title="Connections" subtitle="Tie yourself to the rest of the party — add each companion and how you know them." />
      <div className="flex flex-col gap-3 mb-4.5">
        {connections.map((cn, i) => (
          <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5 items-center">
            <TextField compact type="text" value={cn.name} onChange={(e) => onUpdate(i, { name: e.target.value })} placeholder="Companion's name" />
            <TextField compact type="text" value={cn.note} onChange={(e) => onUpdate(i, { note: e.target.value })} placeholder="How do you know them?" />
            <button onClick={() => onRemove(i)} className="text-[#d97a5c] text-[13px] px-2 py-2">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={onAdd} className="text-gold text-sm font-semibold">+ Add a connection</button>
    </section>
  );
}

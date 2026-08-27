import { Connection } from '../data';

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
  const inputCls = 'box-border bg-white/6 border border-white/18 rounded-[10px] px-3 py-2.5 text-parchment text-sm placeholder:text-[#6f827d] focus:outline-none focus:border-gold';

  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Connections</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">Tie yourself to the rest of the party &mdash; add each companion and how you know them.</p>
      <div className="flex flex-col gap-3 mb-4.5">
        {connections.map((cn, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2.5 items-center">
            <input type="text" value={cn.name} onChange={(e) => onUpdate(i, { name: e.target.value })} placeholder="Companion's name" className={inputCls} />
            <input type="text" value={cn.note} onChange={(e) => onUpdate(i, { note: e.target.value })} placeholder="How do you know them?" className={inputCls} />
            <button onClick={() => onRemove(i)} className="text-[#d97a5c] text-[13px] px-2 py-2">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={onAdd} className="text-gold text-sm font-semibold">+ Add a connection</button>
    </section>
  );
}

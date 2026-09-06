// Every step screen opens with the same title + subtitle treatment — pulled out
// so that pairing doesn't have to be retyped (and kept in sync) in ten places.
export default function StepHeader({ title, subtitle }: { title: string; subtitle: React.ReactNode }) {
  return (
    <>
      <h1 className="font-display font-semibold text-[30px] mb-2">{title}</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">{subtitle}</p>
    </>
  );
}

// Shared input styling for the auth/profile forms (login, signup, profile) — a
// distinct look from the character creator's plain-page fields (see
// app/character/creator/TextField.tsx): a darker tinted background and a focus ring.
const BASE =
  'text-[15px] px-3.5 py-3 rounded-[10px] border border-white/[0.18] bg-ink/60 text-parchment w-full box-border placeholder:text-[#6f847f] focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold/20';

export function AuthTextField({ className = '', ...props }: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${BASE} ${className}`} />;
}

export function AuthTextArea({ className = '', ...props }: { className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${BASE} ${className}`} />;
}

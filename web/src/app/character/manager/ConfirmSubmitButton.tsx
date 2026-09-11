'use client';

// A form submit button that asks for confirmation first — for destructive Server
// Actions (like deleting a character) rendered from a Server Component page,
// where the confirm() call itself needs a Client Component boundary since it's
// an event handler, even though the form/action around it stays server-rendered.
export function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
}: {
  confirmMessage: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { highlightStats, highlightTerms } from './highlightStats';

// Renders a move/technique `details` string as markdown (paragraphs, **bold**,
// *italics*, lists, > quotes, tables, `code`, ---) so card text can be
// formatted in the data files. Stat names (Creativity/Focus/Harmony/Passion)
// keep the same gold-bold treatment highlightStats gives them elsewhere —
// applied to plain-text children only, so it never fights explicit markdown.
//
// `className` sets the base text size/color/leading (same classes the old <p>
// carried); everything inside inherits it.

// A run of 3+ underscores marks a fill-in-the-blank spot (connection prompts) —
// swapped for a visual blank line instead of literal underscores.
function renderBlanks(text: string): ReactNode {
  return text.split(/(_{3,})/g).map((part, i) =>
    /^_{3,}$/.test(part)
      ? <span key={i} className="inline-block align-baseline" style={{ width: '5.5em', borderBottom: '1.5px solid rgba(232,200,116,0.55)', margin: '0 2px' }} />
      : part
  );
}

// Stat highlighting is skipped when `terms` are given (move-advice text names
// moves, not stats).
function decorate(text: string, terms: string[]): ReactNode {
  return Children.map(renderBlanks(text), (part) =>
    typeof part !== 'string' ? part : terms.length ? highlightTerms(part, terms) : highlightStats(part)
  );
}

function withStats(children: ReactNode, terms: string[]): ReactNode {
  return Children.map(children, (child) =>
    typeof child === 'string' ? decorate(child, terms) : isValidElement(child) ? child : child
  );
}

const buildComponents = (terms: string[]): Components => ({
  p: ({ children }) => <p className="mb-2 last:mb-0">{withStats(children, terms)}</p>,
  li: ({ children }) => <li>{withStats(children, terms)}</li>,
  td: ({ children }) => <td className="border border-white/15 px-2 py-1 align-top">{withStats(children, terms)}</td>,
  th: ({ children }) => <th className="border border-white/15 px-2 py-1 text-left text-gold font-semibold">{children}</th>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-2 last:mb-0">
      <table className="w-full border-collapse text-[12.5px]">{children}</table>
    </div>
  ),
  strong: ({ children }) => <strong className="text-gold font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 last:mb-0 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 last:mb-0 space-y-1">{children}</ol>,
  h1: ({ children }) => <h4 className="font-display font-semibold text-gold text-sm mb-1">{children}</h4>,
  h2: ({ children }) => <h4 className="font-display font-semibold text-gold text-sm mb-1">{children}</h4>,
  h3: ({ children }) => <h5 className="font-display font-semibold text-gold text-[13px] mb-1">{children}</h5>,
  h4: ({ children }) => <h5 className="font-display font-semibold text-gold text-[13px] mb-1">{children}</h5>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gold/50 pl-3 mb-2 last:mb-0 italic opacity-90">{children}</blockquote>
  ),
  code: ({ children }) => <code className="rounded bg-black/30 px-1 py-0.5 text-[12px]">{children}</code>,
  hr: () => <hr className="my-2 border-white/15" />,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-gold underline">{children}</a>
  ),
});

// `terms`: names (e.g. a playbook's move names) to bold wherever they appear.
export default function MarkdownText({ children, className = '', terms = [] }: { children: string; className?: string; terms?: string[] }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(terms)}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

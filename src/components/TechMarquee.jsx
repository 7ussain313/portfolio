const row1 = ['React.js', 'Go', 'Rust', 'TypeScript', 'Flutter', 'Laravel', 'Node.js', 'Docker']
const row2 = ['WebSockets', 'Firebase', 'GraphQL', 'Tailwind CSS', 'Java', 'C++', 'REST API', 'PHP']

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden py-2">
      <div
        className={`flex gap-4 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="px-5 py-2 rounded-full text-sm font-semibold dark:bg-white/[0.04] bg-white dark:border-white/[0.08] border-slate-200 border dark:text-slate-400 text-slate-600 whitespace-nowrap shrink-0 hover:text-violet-500 dark:hover:text-violet-400 hover:border-violet-400/40 dark:hover:border-violet-500/40 transition-colors duration-200 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div className="py-10 overflow-hidden relative">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 dark:bg-gradient-to-r dark:from-[#0d0d1a] bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 dark:bg-gradient-to-l dark:from-[#0d0d1a] bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </div>
  )
}

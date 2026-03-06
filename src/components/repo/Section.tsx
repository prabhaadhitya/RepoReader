export default function Section({ children }: any) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      {children}
    </section>
  );
}

// divider
// <div className="border-t border-slate-800 my-6" />
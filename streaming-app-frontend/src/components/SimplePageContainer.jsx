function SimplePageContainer({ title, subtitle }) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-slate-400">{subtitle}</p>
    </section>
  );
}

export default SimplePageContainer;

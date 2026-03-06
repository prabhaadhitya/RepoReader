const cardData = [
        {
            head: "Public repos only",
            para: "We only read publicly available repositories. Your private code is never accessed."
        },
        {
            head: "Beginner-friendly",
            para: "Results are written in plain language — no advanced knowledge required."
        },
        {
            head: "Instant results",
            para: "Get a clear breakdown and a generated README in under 30 seconds."
        }
    ]

function DetailCards() {

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8">
      {cardData.map((card) => (
        <div
          key={card.head}
          className="border-2 border-[#3F4450] bg-slate-900/40 backdrop-blur p-5 rounded-2xl hover:border-blue-500 transition"
        >
          <h3 className="text-md font-semibold mb-2 text-white">
            {card.head}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {card.para}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DetailCards

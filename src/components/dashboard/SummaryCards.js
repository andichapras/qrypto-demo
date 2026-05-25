export default function SummaryCards({ aggregate }) {
  if (!aggregate) return null;

  const cards = [
    {
      title: "Average",
      value: aggregate.avgPrice?.toFixed(2),
    },
    {
      title: "Minimum",
      value: aggregate.minPrice?.toFixed(2),
    },
    {
      title: "Maximum",
      value: aggregate.maxPrice?.toFixed(2),
    },
    {
      title: "Spread",
      value: aggregate.spread?.toFixed(2),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="border rounded p-4">
          <h3>{card.title}</h3>

          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

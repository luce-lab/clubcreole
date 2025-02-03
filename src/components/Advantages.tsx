import { Gift, Tool, HeartHandshake } from "lucide-react";

const advantages = [
  {
    icon: Gift,
    title: "Des réductions",
    description: "Profitez de réductions exclusives chez nos partenaires",
  },
  {
    icon: Tool,
    title: "Prêt de matériel",
    description: "Accédez à du matériel de réception et des outils",
  },
  {
    icon: HeartHandshake,
    title: "Services gratuits",
    description: "Bénéficiez de services d'assistance gratuits",
  },
];

export const Advantages = () => {
  return (
    <section id="advantages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-creole-blue mb-12">
          Les bons plans !
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <advantage.icon className="h-12 w-12 text-creole-green mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {advantage.title}
              </h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const WhyChooseUs = () => {
  const cards = [
    {
      icon: "⭐",
      title: "QUALITY AND SAVING",
      description: "Comprehensive quality control and affordable prices",
    },
    {
      icon: "🏠",
      title: "GLOBAL WAREHOUSE",
      description: "37 overseas warehouses",
    },
    {
      icon: "🚚",
      title: "FAST SHIPPING",
      description: "Fast and convenient door to door delivery",
    },
    {
      icon: "🛡️",
      title: "PAYMENT SECURITY",
      description: "More than 10 different secure payment methods",
    },
    {
      icon: "❓",
      title: "HAVE QUESTIONS?",
      description: "24/7 Customer Service - We're here and happy to help!",
    },
  ];

  return (
    <div className="relative w-full py-16 bg-primary-color">
      {/* Overlay */}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
        <h2 className="text-3xl z-10 font-bold text-white mb-8">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center text-black"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-bold mb-2">{card.title}</h3>
              <p className="text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

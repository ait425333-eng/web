export function ProductsSection() {
  const projects = [
    {
      name: "Dassu Aquamarine El Prospect",
      category: "PROJECTS",
      description:
        "Raw samples of gemstones, cut and polished to attract the market. Efforts are ongoing to initiate mining activities.",
      image: "/aquamarine-crystal-gemstone.jpg",
    },
    {
      name: "Hunza Ruby Mining",
      category: "PROJECTS",
      description: "High-quality ruby extraction from the marble beds of the South Karakoram metamorphic complex.",
      image: "/ruby-mining-operation.jpg",
    },
    {
      name: "Gold Exploration",
      category: "PROJECTS",
      description: "Advanced exploration and extraction of gold deposits with modern geological techniques.",
      image: "/gold-ore-mining.jpg",
    },
  ]

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-amber-800 font-semibold mb-2">/ PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            OUR
            <br />
            PRODUCTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-amber-800 text-sm font-semibold mb-2">{project.category}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

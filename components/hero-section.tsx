export function HeroSection() {
  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=mining-quarry-excavation)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              RE-IMAGINING
              <br />
              <span className="text-amber-400">MINING IN</span>
              <br />
              PAKISTAN
            </h1>
            <p className="text-lg text-gray-100 max-w-md leading-relaxed">
              Transforming Pakistan's mineral resources through sustainable and responsible mining practices.
            </p>
          </div>

          {/* Right Content - Mineral showcase */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur rounded-lg overflow-hidden">
                <img src="/ruby-gemstone.jpg" alt="Ruby" className="w-full h-48 object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="text-white font-bold text-sm mb-2">HUNZA RUBY</h3>
                <p className="text-gray-200 text-xs leading-relaxed">
                  High-quality rubies from the marble beds of the South Karakoram region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

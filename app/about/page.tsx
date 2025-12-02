import { Award, Users, Heart, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brass-gold via-primary-dark to-deep-maroon text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            Preserving the rich heritage of Odisha's traditional brass and copper craftsmanship
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-deep-maroon mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                BodhOm was born from a deep passion for preserving the traditional art forms of Odisha.
                We work directly with skilled artisans who have inherited these crafts through generations,
                ensuring that each piece tells a story of cultural heritage and exceptional craftsmanship.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to bridge the gap between traditional artisans and modern consumers,
                bringing authentic, handcrafted brass and copper products to homes across India and beyond.
                Every purchase supports these talented craftspeople and helps keep these ancient traditions alive.
              </p>
            </div>
            <div className="bg-gradient-to-br from-sandstone-beige to-white rounded-2xl p-12 shadow-elegant-lg">
              <div className="aspect-square bg-white/50 rounded-xl flex items-center justify-center">
                <span className="text-9xl">🏺</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-white to-sandstone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-deep-maroon mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-elegant text-center">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deep-maroon mb-3">
                Authenticity
              </h3>
              <p className="text-gray-600">
                Every product is authentically crafted using traditional techniques passed down through generations.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-elegant text-center">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deep-maroon mb-3">
                Artisan Support
              </h3>
              <p className="text-gray-600">
                We work directly with artisans, ensuring fair compensation and supporting their livelihoods.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-elegant text-center">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deep-maroon mb-3">
                Quality First
              </h3>
              <p className="text-gray-600">
                We maintain the highest standards of quality, ensuring every product meets our rigorous standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-sandstone-beige to-white rounded-2xl p-12 shadow-elegant-lg order-2 lg:order-1">
              <div className="aspect-square bg-white/50 rounded-xl flex items-center justify-center">
                <span className="text-9xl">🎨</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-serif font-bold text-deep-maroon mb-6">
                Odisha's Rich Heritage
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Odisha has been a center of traditional metalwork for centuries. The state's artisans
                are renowned for their skill in working with brass and copper, creating everything from
                utilitarian items to intricate decorative pieces.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our products are sourced from various regions of Odisha, each with its own unique style
                and technique. From the coastal regions to the tribal heartlands, we celebrate the diversity
                of Odisha's craftsmanship.
              </p>
              <div className="flex items-center gap-2 text-brass-gold mt-6">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Odisha, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deep-maroon to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Join Us in Preserving Tradition
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Every purchase helps keep these beautiful traditions alive for future generations
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-deep-maroon px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Our Products
          </a>
        </div>
      </section>
    </div>
  )
}


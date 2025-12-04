import { Award, Users, Heart, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/slide0.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Heritage & Tradition</p>
          <div className="ethnic-title-wrapper">
            <h1 className="text-5xl md:text-6xl font-serif font-bold title-decorated animate-fade-in-up">
              Our Story
            </h1>
          </div>
          <p className="text-xl text-cream-300 leading-relaxed animate-fade-in-up stagger-2 mt-6">
            Preserving the rich heritage of Odisha's traditional brass and copper craftsmanship
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tribal-border pb-6 mb-6">
                <h2 className="text-4xl font-serif font-bold text-charcoal title-decorated">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-charcoal-500 mb-4 leading-relaxed">
                BodhOm was born from a deep passion for preserving the traditional art forms of Odisha.
                We work directly with skilled artisans who have inherited these crafts through generations,
                ensuring that each piece tells a story of cultural heritage and exceptional craftsmanship.
              </p>
              <p className="text-lg text-charcoal-500 leading-relaxed">
                Our mission is to bridge the gap between traditional artisans and modern consumers,
                bringing authentic, handcrafted brass and copper products to homes across India and beyond.
                Every purchase supports these talented craftspeople and helps keep these ancient traditions alive.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cream-200 to-cream-100 rounded-2xl p-12 shadow-soft-lg">
              <div className="aspect-square bg-white/50 rounded-xl flex items-center justify-center">
                <span className="text-9xl">🏺</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 section-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 paisley-decoration">
            <div className="ethnic-title-wrapper">
              <h2 className="text-4xl font-serif font-bold text-charcoal title-decorated">
                Our Values
              </h2>
            </div>
            <p className="text-lg text-charcoal-400 mt-6">
              The principles that guide everything we do
            </p>
            <div className="section-divider mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center card-glow">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                Authenticity
              </h3>
              <p className="text-charcoal-400">
                Every product is authentically crafted using traditional techniques passed down through generations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center card-glow">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                Artisan Support
              </h3>
              <p className="text-charcoal-400">
                We work directly with artisans, ensuring fair compensation and supporting their livelihoods.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center card-glow">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                Quality First
              </h3>
              <p className="text-charcoal-400">
                We maintain the highest standards of quality, ensuring every product meets our rigorous standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-16 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-cream-200 to-cream-100 rounded-2xl p-12 shadow-soft-lg order-2 lg:order-1">
              <div className="aspect-square bg-white/50 rounded-xl flex items-center justify-center">
                <span className="text-9xl">🎨</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="tribal-border pb-6 mb-6">
                <h2 className="text-4xl font-serif font-bold text-charcoal title-decorated">
                  Odisha's Rich Heritage
                </h2>
              </div>
              <p className="text-lg text-charcoal-500 mb-4 leading-relaxed">
                Odisha has been a center of traditional metalwork for centuries. The state's artisans
                are renowned for their skill in working with brass and copper, creating everything from
                utilitarian items to intricate decorative pieces.
              </p>
              <p className="text-lg text-charcoal-500 mb-4 leading-relaxed">
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
      <section className="py-16 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brass-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brass-gold rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="ethnic-title-wrapper">
            <h2 className="text-4xl font-serif font-bold title-decorated">
              Join Us in Preserving Tradition
            </h2>
          </div>
          <p className="text-xl text-cream-300 mb-8 mt-6">
            Every purchase helps keep these beautiful traditions alive for future generations
          </p>
          <a
            href="/products"
            className="inline-block btn-gold text-white px-8 py-4 rounded-xl font-semibold"
          >
            Explore Our Products
          </a>
        </div>
      </section>
    </div>
  )
}

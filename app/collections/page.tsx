import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    name: 'Brass Utensils',
    description: 'Traditional brass cookware and utensils for everyday use',
    image: '/api/placeholder/600/400',
    count: 45,
    slug: 'brass-utensils',
  },
  {
    name: 'Copper Cookware',
    description: 'Pure copper vessels for healthy cooking',
    image: '/api/placeholder/600/400',
    count: 32,
    slug: 'copper-cookware',
  },
  {
    name: 'Pooja Items',
    description: 'Essential items for your daily prayers and rituals',
    image: '/api/placeholder/600/400',
    count: 67,
    slug: 'pooja-items',
  },
  {
    name: 'Home Decor',
    description: 'Beautiful decorative pieces to enhance your living space',
    image: '/api/placeholder/600/400',
    count: 28,
    slug: 'home-decor',
  },
  {
    name: 'Idols & Statues',
    description: 'Handcrafted idols and statues for worship',
    image: '/api/placeholder/600/400',
    count: 52,
    slug: 'idols-statues',
  },
  {
    name: 'Gift Sets',
    description: 'Curated gift sets for special occasions',
    image: '/api/placeholder/600/400',
    count: 18,
    slug: 'gift-sets',
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-maroon mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections of traditional brass and copper works
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={`/collections/${collection.slug}`}
              className="group bg-white rounded-xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-brass-gold/20 to-primary-dark/20 flex items-center justify-center relative overflow-hidden">
                <div className="text-7xl">🏺</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Explore Collection</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brass-gold transition-colors">
                  {collection.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {collection.description}
                </p>
                <p className="text-sm text-brass-gold font-medium">
                  {collection.count} items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


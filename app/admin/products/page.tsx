'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star, StarOff } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  thumbnail: string
  price: number
  original_price: number
  stock_quantity: number
  is_active: boolean
  is_featured: boolean
  badge: string
  category: { name: string } | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?active=false')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, is_active: boolean) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !is_active }),
      })
      setProducts(products.map(p => p.id === id ? { ...p, is_active: !is_active } : p))
    } catch (error) {
      console.error('Error toggling product status:', error)
    }
  }

  const toggleFeatured = async (id: string, is_featured: boolean) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !is_featured }),
      })
      setProducts(products.map(p => p.id === id ? { ...p, is_featured: !is_featured } : p))
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Products</h1>
          <p className="text-charcoal-400 mt-1">Manage your product inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal-400 mb-4">No products found</p>
            <Link href="/admin/products/new" className="text-brass-gold hover:text-primary-dark font-medium">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 font-semibold text-charcoal">Product</th>
                  <th className="text-left py-4 px-2 font-semibold text-charcoal">Category</th>
                  <th className="text-left py-4 px-2 font-semibold text-charcoal">Price</th>
                  <th className="text-left py-4 px-2 font-semibold text-charcoal">Stock</th>
                  <th className="text-center py-4 px-2 font-semibold text-charcoal">Status</th>
                  <th className="text-center py-4 px-2 font-semibold text-charcoal">Featured</th>
                  <th className="text-right py-4 px-2 font-semibold text-charcoal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.thumbnail ? (
                            <Image src={product.thumbnail} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🏺</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{product.name}</p>
                          {product.badge && (
                            <span className="text-xs bg-brass-gold text-white px-2 py-0.5 rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-charcoal-500">
                      {product.category?.name || '-'}
                    </td>
                    <td className="py-4 px-2">
                      <p className="font-medium text-charcoal">₹{product.price.toLocaleString()}</p>
                      {product.original_price > product.price && (
                        <p className="text-sm text-charcoal-400 line-through">
                          ₹{product.original_price.toLocaleString()}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-2">
                      <span className={`font-medium ${product.stock_quantity > 10 ? 'text-green-600' : product.stock_quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button
                        onClick={() => toggleActive(product.id, product.is_active)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          product.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {product.is_active ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button
                        onClick={() => toggleFeatured(product.id, product.is_featured)}
                        className={`p-2 rounded-lg transition-colors ${
                          product.is_featured
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {product.is_featured ? (
                          <Star className="w-5 h-5 fill-current" />
                        ) : (
                          <StarOff className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-charcoal-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          description: string
          short_description: string | null
          price: number
          original_price: number | null
          sku: string
          category_id: string | null
          images: string[]
          thumbnail: string | null
          badge: string | null
          rating: number
          reviews_count: number
          stock_quantity: number
          is_active: boolean
          is_featured: boolean
          meta_title: string | null
          meta_description: string | null
          specifications: Json
          features: string[]
          weight: number | null
          dimensions: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          description: string
          short_description?: string | null
          price: number
          original_price?: number | null
          sku: string
          category_id?: string | null
          images?: string[]
          thumbnail?: string | null
          badge?: string | null
          rating?: number
          reviews_count?: number
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          specifications?: Json
          features?: string[]
          weight?: number | null
          dimensions?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          slug?: string
          description?: string
          short_description?: string | null
          price?: number
          original_price?: number | null
          sku?: string
          category_id?: string | null
          images?: string[]
          thumbnail?: string | null
          badge?: string | null
          rating?: number
          reviews_count?: number
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          specifications?: Json
          features?: string[]
          weight?: number | null
          dimensions?: Json | null
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string | null
          image: string | null
          parent_id: string | null
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          is_active?: boolean
          sort_order?: number
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          order_number: string
          user_id: string | null
          status: string
          payment_status: string
          payment_method: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          subtotal: number
          shipping_cost: number
          tax: number
          discount: number
          total: number
          currency: string
          shipping_address: Json
          billing_address: Json
          customer_name: string
          customer_email: string
          customer_phone: string
          notes: string | null
          items: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          order_number: string
          user_id?: string | null
          status?: string
          payment_status?: string
          payment_method?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          subtotal: number
          shipping_cost?: number
          tax?: number
          discount?: number
          total: number
          currency?: string
          shipping_address: Json
          billing_address: Json
          customer_name: string
          customer_email: string
          customer_phone: string
          notes?: string | null
          items: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          order_number?: string
          user_id?: string | null
          status?: string
          payment_status?: string
          payment_method?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          subtotal?: number
          shipping_cost?: number
          tax?: number
          discount?: number
          total?: number
          currency?: string
          shipping_address?: Json
          billing_address?: Json
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          notes?: string | null
          items?: Json
        }
      }
      hero_slides: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          subtitle: string | null
          description: string | null
          image: string
          button_text: string | null
          button_link: string | null
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          subtitle?: string | null
          description?: string | null
          image: string
          button_text?: string | null
          button_link?: string | null
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          image?: string
          button_text?: string | null
          button_link?: string | null
          is_active?: boolean
          sort_order?: number
        }
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          category: string | null
          author: string
          author_image: string | null
          read_time: string | null
          is_published: boolean
          published_at: string | null
          meta_title: string | null
          meta_description: string | null
          tags: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          category?: string | null
          author: string
          author_image?: string | null
          read_time?: string | null
          is_published?: boolean
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          category?: string | null
          author?: string
          author_image?: string | null
          read_time?: string | null
          is_published?: boolean
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[]
        }
      }
      page_content: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          page_key: string
          section_key: string
          content: Json
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          page_key: string
          section_key: string
          content: Json
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          page_key?: string
          section_key?: string
          content?: Json
          is_active?: boolean
        }
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          name: string
          location: string | null
          initials: string | null
          avatar: string | null
          rating: number
          text: string
          product: string | null
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          location?: string | null
          initials?: string | null
          avatar?: string | null
          rating?: number
          text: string
          product?: string | null
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          location?: string | null
          initials?: string | null
          avatar?: string | null
          rating?: number
          text?: string
          product?: string | null
          is_active?: boolean
          sort_order?: number
        }
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          role: string
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          role?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: string
          is_active?: boolean
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          created_at: string
          email: string
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type Category = Database['public']['Tables']['categories']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']

export type HeroSlide = Database['public']['Tables']['hero_slides']['Row']
export type HeroSlideInsert = Database['public']['Tables']['hero_slides']['Insert']

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']

export type PageContent = Database['public']['Tables']['page_content']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']


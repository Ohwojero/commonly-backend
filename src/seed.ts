import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'
import { Category } from './categories/category.entity'
import { Subcategory } from './categories/subcategory.entity'
import { Product } from './products/product.entity'
import { User } from './users/user.entity'
import { Save } from './saves/save.entity'
import { ActivityLog } from './activity/activity.entity'
import { Review } from './reviews/review.entity'

config()

const toSlug = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Category, Subcategory, Product, User, Save, ActivityLog, Review],
  synchronize: true,
  ssl: process.env.DATABASE_URL?.includes('supabase.co') ? { rejectUnauthorized: false } : false,
})

const defaultCategories = [
  {
    slug: 'news',
    label: 'News',
    eyebrow: 'The latest edit',
    title: 'What is worth knowing now.',
    description: 'New launches, cultural shifts, and considered finds from the worlds shaping how we live.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-secondary',
    items: ['Celebrity', 'New launches', 'Treatment & FDA news', 'Industry & retail news'],
  },
  {
    slug: 'face',
    label: 'Face',
    eyebrow: 'The face edit',
    title: 'Care for the skin you are in.',
    description: 'Thoughtful routines and proven essentials for every complexion, concern, and daily ritual.',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-accent/10',
    items: ['Acne', 'Anti-aging', 'Eye care', 'Hyperpigmentation', 'Makeup', 'Sensitive skin', 'Skin care', 'Skin conditions', 'Smile', 'Sun care'],
  },
  {
    slug: 'treatments',
    label: 'Treatments',
    eyebrow: 'The treatment edit',
    title: 'Research before the ritual.',
    description: 'A clearer way to understand treatments, devices, ingredients, and what comes next.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-primary/10',
    items: ['Neurotoxins', 'Fillers', 'Lasers & energy devices', 'Microneedling', 'Post-procedure skin care', 'Regenerative aesthetics', 'Skin lifting and tightening'],
  },
  {
    slug: 'body',
    label: 'Body',
    eyebrow: 'The body edit',
    title: 'Good care, from head to toe.',
    description: 'The products and practices that make everyday body care feel more intentional.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-secondary',
    items: ['Skin care', 'Body sculpting', 'Breasts', 'Butts', 'Cellulite', 'Fragrance', 'Hands + nails', 'Legs', 'Pregnancy'],
  },
  {
    slug: 'hair',
    label: 'Hair',
    eyebrow: 'The hair edit',
    title: 'A better hair day starts here.',
    description: 'Useful guidance for healthier hair, calmer scalps, and routines that fit real life.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-accent/10',
    items: ['Bond repair', 'Celebrity hair', 'Dry hair', 'Frizzy hair', 'Gray hair', 'Hair color', 'Hair growth', 'Hair repair', 'Scalp health', 'Tips + tutorials'],
  },
  {
    slug: 'awards',
    label: 'Awards',
    eyebrow: 'The Commonly awards',
    title: 'The things we would buy again.',
    description: 'Our highest-conviction picks, recognized for doing one thing exceptionally well.',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-primary/10',
    items: ['Best in class', 'Editor favorites', 'Reader favorites', 'New and notable'],
  },
  {
    slug: 'shopping',
    label: 'Shopping',
    eyebrow: 'The shopping edit',
    title: 'Buy less. Choose better.',
    description: 'A focused collection of products selected for usefulness, longevity, and quiet delight.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-secondary',
    items: ['Best sellers', 'Under $25', 'Gifts', 'Everyday essentials'],
  },
  {
    slug: 'creams',
    label: 'Creams',
    eyebrow: 'The cream edit',
    title: 'The right cream changes everything.',
    description: 'From rich body butters to featherlight face creams, discover textures made for every ritual and skin need.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-accent/10',
    items: ['Face creams', 'Moisturizers', 'Body creams', 'Night creams', 'Hand creams', 'Natural creams'],
  },
]

const sampleProducts = [
  {
    slug: 'eltamd-uv-clear-spf-46',
    name: 'UV Clear Broad-Spectrum SPF 46',
    brand: 'EltaMD',
    categorySlug: 'face',
    subcategorySlug: 'sun-care',
    price: 43.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85',
    description: 'Oil-free transparent sunscreen formulated with high-purity niacinamide to calm blemish-prone and sensitive skin while delivering broad-spectrum UV protection.',
    tags: ['Sunscreen', 'Dermatologist Recommended', 'Acne-Prone'],
    affiliateUrl: 'https://www.amazon.com/dp/B002MSN3QQ',
    isSpotlight: false,
    views: 1120,
    highlights: ['Transparent Zinc Oxide 9.0%', 'Calming Actives: 5.0% Niacinamide', 'Silky, weightless finish'],
    itemDetails: ['Brand: EltaMD', 'Size: 1.7 oz airless pump', 'Broad Spectrum UVA/UVB'],
    specs: ['Item Form: Lotion', 'Non-comedogenic', 'Fragrance-free'],
  },
  {
    slug: 'supergoop-unseen-sunscreen',
    name: 'Unseen Sunscreen SPF 40',
    brand: 'Supergoop!',
    categorySlug: 'face',
    subcategorySlug: 'sun-care',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=85',
    description: 'The original 100% invisible, weightless, scentless daily sunscreen with a velvety primer finish that grips makeup seamlessly all day.',
    tags: ['Makeup Primer', 'Clean Beauty', 'Reader Favorite'],
    affiliateUrl: 'https://www.amazon.com/dp/B082TNSCHG',
    isSpotlight: false,
    views: 940,
    highlights: ['Completely clear, pore-blurring primer', 'Broad spectrum SPF 40', 'Reef-Friendly formula'],
    itemDetails: ['Brand: Supergoop!', 'Size: 1.7 fl oz / 50 ml', 'Form: Clear velvety gel'],
    specs: ['Water Resistance: 40 minutes', 'Finish: Natural matte'],
  },
  {
    slug: 'nuface-trinity-plus',
    name: 'Trinity+ Advanced Facial Toning Kit',
    brand: 'NuFACE',
    categorySlug: 'treatments',
    subcategorySlug: 'lasers-energy-devices',
    price: 395.00,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
    description: 'FDA-cleared smart microcurrent device clinically proven to lift, contour, and tone the facial muscles and neck in 5 minutes a day.',
    tags: ['FDA Cleared', 'Clinical Tech', 'Facial Sculpting'],
    affiliateUrl: 'https://www.amazon.com/dp/B0BFBNV66Y',
    isSpotlight: false,
    views: 1040,
    highlights: ['3-depth microcurrent with Boost button', 'Visibly sculpts neck and jawline', 'NuFACE Smart App sync'],
    itemDetails: ['Brand: NuFACE', 'Model: Trinity+ Smart System', 'FDA-cleared Medical Class II'],
    specs: ['Rechargeable battery', '1-year warranty'],
  },
  {
    slug: 'omnilux-contour-face',
    name: 'Contour Face LED Light Therapy Mask',
    brand: 'Omnilux',
    categorySlug: 'treatments',
    subcategorySlug: 'lasers-energy-devices',
    price: 395.00,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=85',
    description: 'The gold-standard medical grade flexible silicone LED mask utilizing clinically proven red and near-infrared wavelengths to stimulate collagen synthesis.',
    tags: ['Medical Grade', 'LED Therapy', 'Collagen Stimulator'],
    affiliateUrl: 'https://www.amazon.com/dp/B08XJ8P86R',
    isSpotlight: true,
    views: 1210,
    highlights: ['Dual matrix Red (633nm) and Near-Infrared (830nm)', 'Medical CE and FDA cleared', 'Flexible silicone design'],
    itemDetails: ['Brand: Omnilux Medical', '132 medical-grade LEDs', 'USB rechargeable'],
    specs: ['Optical Output: 30mW/cm²', 'Auto shut-off at 10 min'],
  },
  {
    slug: 'augustinus-bader-the-rich-cream',
    name: 'The Rich Cream',
    brand: 'Augustinus Bader',
    categorySlug: 'creams',
    subcategorySlug: 'face-creams',
    price: 290.00,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1000&q=85',
    description: 'An intensely luxurious, deeply nourishing cream powered by patented TFC8 technology to support cellular renewal and intensely condition.',
    tags: ['TFC8 Science', 'Award Winner', 'Clinical Hydration'],
    affiliateUrl: 'https://www.amazon.com/dp/B07P41S88D',
    isSpotlight: false,
    views: 1140,
    highlights: ['Proprietary TFC8 (Trigger Factor Complex)', 'Rich, emollient balm-cream texture', 'Reduces fine lines and redness'],
    itemDetails: ['Brand: Augustinus Bader', 'Size: 50ml / 1.7 fl oz', 'Recyclable packaging'],
    specs: ['Use: Morning and night', 'Dermatologist tested'],
  },
  {
    slug: 'baccarat-rouge-540-extrait',
    name: 'Baccarat Rouge 540 Extrait de Parfum',
    brand: 'Maison Francis Kurkdjian',
    categorySlug: 'body',
    subcategorySlug: 'fragrance',
    price: 465.00,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
    description: 'An exalted interpretation of the legendary fragrance, amplifying the radiance of Egyptian Grandiflorum jasmine, bitter almond, and ambergris.',
    tags: ['Haute Parfumerie', 'Iconic Sillage', 'Prestige Luxury'],
    affiliateUrl: 'https://www.amazon.com/dp/B071DX343W',
    isSpotlight: false,
    views: 1510,
    highlights: ['Egyptian jasmine, bitter almond, ambergris', 'Extrait de Parfum high concentration', 'Enduring 16+ hour longevity'],
    itemDetails: ['Brand: Maison Francis Kurkdjian', 'Size: 70ml / 2.4 fl oz', 'Made in France'],
    specs: ['Family: Amber Floral Woody', 'Gender: Unisex'],
  },
]

async function seed() {
  await AppDataSource.initialize()
  console.log('Connected to Supabase PostgreSQL database')

  const catRepo = AppDataSource.getRepository(Category)
  const subRepo = AppDataSource.getRepository(Subcategory)
  const prodRepo = AppDataSource.getRepository(Product)

  console.log('Seeding categories and subcategories...')
  const subcategoryMap: Record<string, Subcategory> = {}

  for (const catData of defaultCategories) {
    let cat = await catRepo.findOne({ where: { slug: catData.slug } })
    if (!cat) {
      cat = catRepo.create({
        slug: catData.slug,
        label: catData.label,
        eyebrow: catData.eyebrow,
        title: catData.title,
        description: catData.description,
        image: catData.image,
        tone: catData.tone,
      })
      cat = await catRepo.save(cat)
    }

    for (const item of catData.items) {
      const subSlug = toSlug(item)
      let sub = await subRepo.findOne({ where: { slug: subSlug } })
      if (!sub) {
        sub = subRepo.create({
          slug: subSlug,
          label: item,
          image: cat.image,
          category: cat,
        })
        sub = await subRepo.save(sub)
      }
      subcategoryMap[subSlug] = sub
    }
  }

  console.log('Seeding initial products...')
  for (const prodData of sampleProducts) {
    const existing = await prodRepo.findOne({ where: { slug: prodData.slug } })
    if (!existing) {
      const sub = subcategoryMap[prodData.subcategorySlug] || (await subRepo.findOne({ where: { slug: prodData.subcategorySlug } }))
      const product = prodRepo.create({
        slug: prodData.slug,
        name: prodData.name,
        brand: prodData.brand,
        price: prodData.price,
        image: prodData.image,
        description: prodData.description,
        tags: prodData.tags,
        affiliateUrl: prodData.affiliateUrl,
        isSpotlight: prodData.isSpotlight,
        views: prodData.views,
        highlights: prodData.highlights,
        itemDetails: prodData.itemDetails,
        specs: prodData.specs,
        subcategory: sub || undefined,
      })
      await prodRepo.save(product)
    }
  }

  console.log('Seeding complete! Categories, subcategories, and products are populated.')
  await AppDataSource.destroy()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

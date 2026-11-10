import 'reflect-metadata'
import { DataSource, In } from 'typeorm'
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
  ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false,
})

const defaultCategories = [
  {
    slug: 'personal-edit',
    label: 'The Everyday Tech Edit',
    eyebrow: 'Connected Living & Mobility',
    title: 'Smart home, vehicle telematics & precision power systems.',
    description: 'Curated smart thermostats, 4K wireless security cameras, video doorbells, connected radar telemetry, precision steam ovens, and portable power stations.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-primary/10',
    items: [
      'Smart Thermostats',
      'Smart Doorbells',
      'Security Cameras',
      'Escort MAX 360c MKII Connected Radar',
      'Anova Precision Smart Combi Steam Oven',
      'EcoFlow DELTA 2 (1024Wh LiFePO4)',
    ],
  },
  {
    slug: 'studio-edit',
    label: 'The Studio Edit',
    eyebrow: 'Compute & Sound',
    title: 'Peak developer productivity & acoustic precision.',
    description: 'Audiophile spatial monitoring, ultra-wide productivity displays, and high-throughput Thunderbolt infrastructure.',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-primary/10',
    items: [
      'Audiophile Headphones',
      'Spatial Audio',
      'Desktop Monitors (Speakers)',
      'Ultra-Wide Screens',
      'Vertical Coding Displays',
      'Heavy-Duty Arm Mounts',
      'Enterprise Docking Stations',
      'External SSD Hubs',
      'Developer Cable Matrices',
    ],
  },
  {
    slug: 'ergonomic-edit',
    label: 'The Ergonomic Edit',
    eyebrow: 'Posture & Tactile',
    title: 'Engineered seating, standing desks & tactile layouts.',
    description: 'Executive task seating, solid hardwood motorized desk systems, and thoughtfully selected workspace and mobility accessories.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-secondary',
    items: [
      'Ergonomic Task Chairs (Herman Miller, Steelcase)',
      'Mesh Task Seating',
      'Active Posture Stools',
      'Solid Wood Desk Tops',
      'Motorized Standing Frames',
      'Ergonomic Vertical Mice',
      'Smart Portable EV Charging Systems',
      '4K AI Smart Dash Cams',
    ],
  },
  {
    slug: 'news',
    label: 'News',
    eyebrow: 'The latest edit',
    title: 'What is worth knowing now.',
    description: 'New tech launches, industry shifts, and considered finds from the worlds shaping how we work and move.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-secondary',
    items: ['New launches', 'EV & Auto tech news', 'Workspace hardware news', 'Industry & retail news'],
  },
  {
    slug: 'awards',
    label: 'Awards',
    eyebrow: 'The Commonlys awards',
    title: 'The tech we would buy again.',
    description: 'Our highest-conviction picks, recognized for doing one thing exceptionally well in performance, build quality, and value.',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-primary/10',
    items: ['Best in class', 'Editor favorites', 'Reader favorites', 'New and notable'],
  },
  {
    slug: 'shopping',
    label: 'Shopping',
    eyebrow: 'The shopping edit',
    title: 'Buy less. Choose better.',
    description: 'A focused collection of tech products selected for performance, longevity, and reliable Amazon Prime value.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
    tone: 'bg-secondary',
    items: ['Best sellers', 'Under $100', 'Gifts for tech enthusiasts', 'Everyday carry essentials'],
  },
]

const sampleProducts = [
  // ── THE EVERYDAY TECH EDIT (The 6 Curated Essentials) ──
  {
    slug: 'ecobee-smart-thermostat-premium',
    name: 'ecobee Smart Thermostat Premium with SmartSensor & Air Quality Monitor',
    brand: 'ecobee',
    categorySlug: 'personal-edit',
    subcategorySlug: 'smart-thermostats',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1000&q=85',
    description: 'Transform home energy efficiency with high-precision radar occupancy sensing, built-in indoor air quality monitoring, and an included SmartSensor to eliminate hot or cold spots across living zones.',
    tags: ['Smart Thermostat', 'Air Quality', 'ENERGY STAR'],
    affiliateUrl: 'https://www.amazon.com/dp/B09XXS4MV7',
    isSpotlight: true,
    views: 3100,
    highlights: ['Built-in Air Quality Monitor & Smoke Alarm Detection', 'SmartSensor included to balance hot and cold spots', 'Works with Apple HomeKit, Alexa, Google Assistant'],
    itemDetails: ['Screen: 4-inch Glass Touch Display (540x540)', 'C-Wire Required: Power Extender Kit Included in Box'],
    specs: ['Sensory Array: Radar Occupancy, VOC & CO2 Air Quality, Humidity', 'Connectivity: Dual-Band Wi-Fi 2.4/5GHz + Bluetooth'],
  },
  {
    slug: 'ring-video-doorbell-pro-2',
    name: 'Ring Video Doorbell Pro 2 — 1536p HD Head-to-Toe Video with 3D Motion Detection',
    brand: 'Ring',
    categorySlug: 'personal-edit',
    subcategorySlug: 'smart-doorbells',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=85',
    description: 'Premium wired doorbell camera featuring 1536p HD Head-to-Toe video that lets you see packages on your doorstep. Powered by 3D Motion Detection with radar-guided Bird\'s Eye View tracking.',
    tags: ['Video Doorbell', 'Head-to-Toe HD', '3D Radar Detection'],
    affiliateUrl: 'https://www.amazon.com/dp/B086Q54K53',
    isSpotlight: false,
    views: 3450,
    highlights: ['Head-to-Toe 1536p HD Video with color night vision', '3D Motion Detection with Bird\'s Eye View radar mapping', 'Two-way talk with Audio+ noise cancellation'],
    itemDetails: ['Power: Hardwired (16-24 VAC doorbell transformer)', 'Field of View: 150° Horizontal, 150° Vertical'],
    specs: ['Resolution: 1536p HD Video', 'Audio: Two-Way Audio with Audio+'],
  },
  {
    slug: 'eufycam-s330-4k-solar-security-system',
    name: 'eufy Security eufyCam S330 (eufyCam 3) 4K Wireless Solar Security System (2-Cam Kit)',
    brand: 'eufy Security',
    categorySlug: 'personal-edit',
    subcategorySlug: 'security-cameras',
    price: 469.99,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=85',
    description: '4K Ultra HD wireless security camera kit with integrated Forever Power solar panels requiring just 2 hours of direct sunlight per day. Local BionicMind AI facial recognition filters out family from strangers with zero monthly fees.',
    tags: ['4K Solar Security', 'BionicMind AI', 'Zero Monthly Fees'],
    affiliateUrl: 'https://www.amazon.com/dp/B0B1L4GZQJ',
    isSpotlight: false,
    views: 2900,
    highlights: ['4K Ultra HD detail with Forever Power solar panel', 'BionicMind AI facial recognition filters non-threats', 'Expandable local storage up to 16TB — zero monthly fees'],
    itemDetails: ['Included: 2x eufyCam S330 Cameras + 1x HomeBase 3', 'Battery: 13,000mAh with Integrated Solar Panel'],
    specs: ['Weather Resistance: IP67 Waterproof', 'Storage: 16GB EMMC on HomeBase 3, Expandable via 2.5" HDD/SSD'],
  },
  {
    slug: 'escort-max-360c-mkii-radar',
    name: 'Escort MAX 360c MKII Connected Laser Radar Detector',
    brand: 'Escort',
    categorySlug: 'personal-edit',
    subcategorySlug: 'escort-max-360c-mkii-connected-radar',
    price: 699.95,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=85',
    description: 'The benchmark in vehicle situational intelligence. 360° directional arrow threat detection, dual-antenna BlackFin DSP processor, AutoLearn AI false alert filtering, and live shared radar telemetry via connected cloud Wi-Fi.',
    tags: ['360 Telematics', 'AutoLearn AI', 'Connected Radar'],
    affiliateUrl: 'https://www.amazon.com/dp/B0BH32N66L',
    isSpotlight: false,
    views: 2200,
    highlights: ['360° Directional Arrows pinpoint threat source instantly', 'AutoLearn AI uses GPS to eliminate false alerts over time', 'Built-in Wi-Fi connects to Escort Live community alerts'],
    itemDetails: ['Processor: BlackFin 547 DSP', 'Display: Multi-Color OLED Graphic'],
    specs: ['Radar Coverage: X, K, Ka, SuperWide, Laser', 'GPS: TrueLock & Speed Camera Database'],
  },
  {
    slug: 'anova-precision-oven-combi-steam',
    name: 'Anova Precision Smart Combi Steam Oven with WiFi & App Control',
    brand: 'Anova',
    categorySlug: 'personal-edit',
    subcategorySlug: 'anova-precision-smart-combi-steam-oven',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=85',
    description: 'Professional combi steam cooking brought to the countertop. Sous-vide without the bag via precision temperature and wet-bulb humidity sensors. Dual-band WiFi with mobile app multi-stage cook recipes.',
    tags: ['Combi Steam', 'Bagless Sous-Vide', 'WiFi Smart'],
    affiliateUrl: 'https://www.amazon.com/dp/B08HR9KMSZ',
    isSpotlight: false,
    views: 2400,
    highlights: ['Bagless sous-vide mode with wet-bulb humidity control', 'Continuous steam injection from external 1.3L water tank', 'Multipoint food probe with app graph monitoring'],
    itemDetails: ['Capacity: 1.2 cu ft (fits a 12lb turkey)', 'Connectivity: Wi-Fi 2.4 GHz iOS/Android App'],
    specs: ['Temp Range: 77°F–482°F (25°C–250°C)', 'Heating: 5 Independent Heating Elements'],
  },
  {
    slug: 'ecoflow-delta-2-power-station',
    name: 'EcoFlow DELTA 2 Smart Portable Power Station — 1024Wh LiFePO4 1800W',
    brand: 'EcoFlow',
    categorySlug: 'personal-edit',
    subcategorySlug: 'ecoflow-delta-2-1024wh-lifepo4',
    price: 699.00,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1000&q=85',
    description: 'High-output 1024Wh LiFePO4 smart portable energy system. 1800W pure sine wave AC output (2700W surge) to power 90% of home appliances and studio workstations. 0-80% ultra-fast X-Stream charging in just 50 minutes with full app telemetry.',
    tags: ['LiFePO4 Battery', '1800W Pure Sine', 'X-Stream Fast Charge'],
    affiliateUrl: 'https://www.amazon.com/dp/B0B9X3R7PN',
    isSpotlight: false,
    views: 3150,
    highlights: ['LiFePO4 Chemistry: 3,000+ full cycles to 80% capacity', '1800W AC output powers 15 devices simultaneously', '0 to 80% recharge in 50 minutes via AC wall outlet'],
    itemDetails: ['Capacity: 1024Wh (Expandable to 3040Wh)', 'Outputs: 6x AC Outlets, 2x USB-C 100W PD'],
    specs: ['Solar Input: Up to 500W (11-60V)', 'App Control: Wi-Fi & Bluetooth App Monitoring'],
  },

  // ── THE STUDIO EDIT ──
  {
    slug: 'dell-ultrasharp-40-curved-5k',
    name: 'Dell UltraSharp 40" Curved WUHD 5K Monitor (U4025QW)',
    brand: 'Dell',
    categorySlug: 'studio-edit',
    subcategorySlug: 'ultra-wide-screens',
    price: 1799.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=85',
    description: 'The premier panoramic coding display featuring 5120 x 2160 WUHD resolution, IPS Black technology for 2000:1 contrast, and 120Hz smooth scrolling.',
    tags: ['Ultra-Wide', 'Coding Display', 'IPS Black 120Hz'],
    affiliateUrl: 'https://www.amazon.com/dp/B0CT41S99V',
    isSpotlight: false,
    views: 2150,
    highlights: ['5120x2160 WUHD Resolution', 'IPS Black 2000:1 Contrast', '120Hz Refresh Rate with Ambient Light Sensor'],
    itemDetails: ['Brand: Dell', 'Screen Size: 40 Inches', 'Aspect Ratio: 21:9'],
    specs: ['Panel Type: IPS Black', 'Connectivity: Thunderbolt 4 (140W PD)'],
  },
  {
    slug: 'caldigit-ts4-thunderbolt-4-dock',
    name: 'TS4 Thunderbolt 4 18-Port Enterprise Dock',
    brand: 'CalDigit',
    categorySlug: 'studio-edit',
    subcategorySlug: 'enterprise-docking-stations',
    price: 399.95,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85',
    description: 'The industry benchmark for developer workstations. 18 ports of extreme connectivity with 98W Power Delivery, UHS-II SD cards, and 2.5 Gigabit Ethernet.',
    tags: ['Thunderbolt 4', 'Developer Setup', '98W Power Delivery'],
    affiliateUrl: 'https://www.amazon.com/dp/B09GK8PTB7',
    isSpotlight: false,
    views: 1840,
    highlights: ['18 Ports of expansion', '98W Host Power Delivery', '2.5GbE Ethernet'],
    itemDetails: ['Brand: CalDigit', 'Model: TS4-US-AMZ', 'Color: Space Gray Aluminum'],
    specs: ['Interface: Thunderbolt 4', 'Max Resolution: Up to Single 8K or Dual 6K 60Hz'],
  },
  {
    slug: 'herman-miller-aeron-chair',
    name: 'Aeron Ergonomic Task Chair (Graphite)',
    brand: 'Herman Miller',
    categorySlug: 'ergonomic-edit',
    subcategorySlug: 'ergonomic-task-chairs-herman-miller-steelcase',
    price: 1805.00,
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a506cb?auto=format&fit=crop&w=1000&q=85',
    description: 'The defining icon of ergonomic seating. Pellicle 8Z breathable elastomer suspension distributes weight evenly, while PostureFit SL supports the sacrum and spine.',
    tags: ['Ergonomic Icon', 'Herman Miller', 'PostureFit SL'],
    affiliateUrl: 'https://www.amazon.com/dp/B0735BPB58',
    isSpotlight: false,
    views: 3100,
    highlights: ['Pellicle 8Z zone-calibrated suspension', 'Fully adjustable arms & PostureFit SL', 'Engineered in the USA'],
    itemDetails: ['Brand: Herman Miller', 'Color: Graphite Frame & Mesh', 'Size: Size B (Medium)'],
    specs: ['Weight Capacity: 350 lbs', 'Warranty: 12-Year Official Coverage'],
  },
]

async function seed() {
  await AppDataSource.initialize()
  console.log('Connected to Supabase PostgreSQL database')

  const catRepo = AppDataSource.getRepository(Category)
  const subRepo = AppDataSource.getRepository(Subcategory)
  const prodRepo = AppDataSource.getRepository(Product)

  // 1. Clean up legacy beauty products & obsolete slugs
  const obsoleteSlugs = [
    'omnilux-contour-face',
    'eltamd-uv-clear-spf-46',
    'supergoop-unseen-sunscreen',
    'nuface-trinity-plus',
    'augustinus-bader-the-rich-cream',
    'baccarat-rouge-540-extrait',
    'carlinkit-5-wireless-carplay-adapter',
    'fanttik-x8-apex-smart-tire-inflator',
    'rove-r2-4k-dual-dash-cam',
    'garmin-dash-cam-67w',
    '70mai-a800s-4k-dual-dash-cam',
    'blink-ev-charger-level2-48a',
    'wallbox-pulsar-plus-ev-charger',
    'schumacher-level-2-portable-ev-charger',
    'fellow-stagg-ekg-pro-studio',
    'breville-barista-express-impress',
    'anker-solix-c300-portable-power-station',
    'anova-precision-cooker-3-wifi',
    'keychron-q1-pro-wireless-custom',
    'logitech-mx-master-3s',
    'vantrue-n4-pro-4k-dash-cam',
    'tesla-universal-wall-connector',
    'blackvue-dr970x-2ch-plus-4k',
    'breville-barista-touch-impress',
    'chargepoint-home-flex-50a',
  ]

  console.log('Cleaning up obsolete products...')
  await prodRepo.delete({ slug: In(obsoleteSlugs) }).catch((err) => {
    console.warn('Cleanup warning:', err.message)
  })

  // Clear spotlight on any remaining items
  await prodRepo
    .createQueryBuilder()
    .update(Product)
    .set({ isSpotlight: false })
    .execute()
    .catch(() => {})

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
    } else {
      cat.label = catData.label
      cat.eyebrow = catData.eyebrow
      cat.title = catData.title
      cat.description = catData.description
      cat.image = catData.image
      cat.tone = catData.tone
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
      } else {
        sub.label = item
        sub.image = cat.image
        sub.category = cat
        sub = await subRepo.save(sub)
      }
      subcategoryMap[subSlug] = sub
    }
  }

  const removedKeyboardSubcategory = await subRepo.findOne({
    where: { slug: toSlug('Custom Mechanical Keyboards'), category: { slug: 'ergonomic-edit' } },
  })
  if (removedKeyboardSubcategory) await subRepo.remove(removedKeyboardSubcategory)

  const removedMonitorArmSubcategory = await subRepo.findOne({
    where: { slug: toSlug('Heavy-Duty Monitor Arm Mounts'), category: { slug: 'ergonomic-edit' } },
  })
  if (removedMonitorArmSubcategory) await subRepo.remove(removedMonitorArmSubcategory)

  console.log('Seeding initial products...')
  for (const prodData of sampleProducts) {
    let product = await prodRepo.findOne({ where: { slug: prodData.slug } })
    const sub = subcategoryMap[prodData.subcategorySlug] || (await subRepo.findOne({ where: { slug: prodData.subcategorySlug } }))
    
    if (!product) {
      product = prodRepo.create({
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
    } else {
      product.name = prodData.name
      product.brand = prodData.brand
      product.price = prodData.price
      product.image = prodData.image
      product.description = prodData.description
      product.tags = prodData.tags
      product.affiliateUrl = prodData.affiliateUrl
      product.isSpotlight = prodData.isSpotlight
      product.views = prodData.views
      product.highlights = prodData.highlights
      product.itemDetails = prodData.itemDetails
      product.specs = prodData.specs
      if (sub) product.subcategory = sub
    }
    await prodRepo.save(product)
  }

  console.log('Seeding complete! Cleaned old products and populated 6 Everyday Tech products.')
  await AppDataSource.destroy()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

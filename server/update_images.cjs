const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const updates = {
  'signature-mug': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
  'memory-tee': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
  'snap-cover': 'https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=800&auto=format&fit=crop',
  'gallery-frame': 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop',
  'acrylic-keychain': 'https://images.unsplash.com/photo-1601968846359-2cd168170c91?q=80&w=800&auto=format&fit=crop',
  'comfort-cushion': 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=800&auto=format&fit=crop',
  'steel-bottle': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop',
  'modern-clock': 'https://images.unsplash.com/photo-1508057198894-247b23fe52f3?q=80&w=800&auto=format&fit=crop'
};

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const col = db.collection('products');
  for (const [slug, image] of Object.entries(updates)) {
    await col.updateOne({ slug }, { $set: { image } });
    console.log('Updated', slug);
  }
  process.exit(0);
});

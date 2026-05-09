const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const updates = {
  'snap-cover': 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=800&auto=format&fit=crop',
  'acrylic-keychain': 'https://images.unsplash.com/photo-1560421833-2ca724baeb5f?q=80&w=800&auto=format&fit=crop'
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

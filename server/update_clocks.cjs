const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const updates = {
  'acrylic-keychain': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop',
  'modern-clock': 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop'
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

// scripts/seed-user.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const User = require('../models/User');

(async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGO_URI;
    if (!uri) throw new Error('Add MONGO_URI or MONGO_URI to .env');

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

    const doc = {
      username: 'demo',
      password: 'Password123!', // your pre('save') will hash this
      ph: '6591234567',
      fullname: 'Demo User',
      gender: 'Male',                 // <- one of the enum values
      nationality: 'Chinese',         // <- one of the enum values
      profession: 'Student',
      homeaddress: '123 Demo Street',
      homepostal: '123456',
      securityq: 'Your first pet?',
      securityans: 'Fluffy',
    };

    // avoid duplicate key errors on rerun
    await User.deleteOne({ username: doc.username });

    const created = await User.create(doc);
    console.log('✅ Seeded user:', { username: doc.username, password: doc.password });
  } catch (e) {
    console.error('Seed error:', e);
  } finally {
    await mongoose.disconnect();
  }
})();

import mongoose from 'mongoose';
import { env } from './config/environment.js';
import Admin from './models/Admin.js';
import Setting from './models/Setting.js';
import Navigation from './models/Navigation.js';
import Category from './models/Category.js';
import Tag from './models/Tag.js';
import Page from './models/Page.js';

const seed = async () => {
  await mongoose.connect(env.mongoUri);

  await Admin.deleteMany({});
  await Setting.deleteMany({});
  await Navigation.deleteMany({});
  await Category.deleteMany({});
  await Tag.deleteMany({});
  await Page.deleteMany({});

  const admin = await Admin.create({
    name: 'Administrator',
    email: env.defaultAdminEmail || 'admin@cms.com',
    password: env.defaultAdminPassword || 'Password123@'
  });

  await Setting.create({
    siteName: 'RenewCred CMS',
    siteDescription: 'A production-ready content management system',
    contactEmail: 'hello@renewcred.com',
    theme: 'light'
  });

  await Navigation.create({
    name: 'Main',
    items: [
      { label: 'Home', href: '/', target: '_self' },
      { label: 'About', href: '/about', target: '_self' }
    ]
  });

  const category = await Category.create({ name: 'Product', slug: 'product' });
  const tag = await Tag.create({ name: 'Launch', slug: 'launch' });

  await Page.create({
    title: 'Welcome to RenewCred CMS',
    slug: 'welcome',
    excerpt: 'A polished CMS built for modern content teams.',
    status: 'published',
    seoTitle: 'Welcome to RenewCred CMS',
    seoDescription: 'A polished CMS built for modern content teams.',
    categories: [category._id],
    tags: [tag._id],
    blocks: [
      { type: 'hero', content: { title: 'Modern content experiences', subtitle: 'Manage pages with blocks, SEO, and rich media.' } },
      { type: 'paragraph', content: { text: 'This demo page proves the CMS can render dynamic blocks and publish content through the API.' } }
    ],
    createdBy: admin._id,
    publishedAt: new Date()
  });

  console.log('Seed data complete');
  mongoose.disconnect();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 }
  },
  { _id: true }
);

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: [{ type: String }],
    blocks: [blockSchema],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    publishedAt: { type: Date, default: null },
    versionHistory: [{ type: Object }],
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model('Page', pageSchema);

import mongoose from 'mongoose';

const navigationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    items: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
        target: { type: String, default: '_self' }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Navigation', navigationSchema);

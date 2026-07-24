import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'RenewCred CMS' },
    siteDescription: { type: String, default: 'A production-ready CMS' },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    theme: { type: String, default: 'light' },
    contactEmail: { type: String, default: 'hello@renewcred.com' },
    footerText: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Setting', settingSchema);

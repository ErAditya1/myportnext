import mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

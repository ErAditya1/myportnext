import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  images: string[];
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  category?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    technologies: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    category: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

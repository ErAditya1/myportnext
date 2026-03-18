import mongoose, { Schema, Document } from "mongoose";

export interface IVisitor extends Document {
  ip: string;
  userAgent: string;
  path: string;
  timestamp: Date;
}

const VisitorSchema: Schema = new Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  path: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);

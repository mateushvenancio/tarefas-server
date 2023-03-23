import mongoose from 'mongoose';

export const TarefaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String },
    data: { type: Date, required: true, default: Date.now },
    userId: { type: String },
    done: { type: Boolean, default: false, required: true },
    archived: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [200, "Title cannot be more than 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.every(
            (tag) =>
              tag.length >= 2 && tag.length <= 20 && /^[a-zA-Z0-9-]+$/.test(tag)
          );
        },
        message:
          "Tags must be between 2-20 characters and contain only letters, numbers, and hyphens",
      },
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split("T")[0],
      validate: {
        validator: function (v: string) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: "Date must be in YYYY-MM-DD format",
      },
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ tags: 1 });
PostSchema.index({ date: 1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

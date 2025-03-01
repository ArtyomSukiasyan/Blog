import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: [200, "Title cannot be more than 200 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    // Content is Markdown, so we don't limit the length
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        // Ensure each tag is between 2-20 characters and contains only valid characters
        return v.every(tag => 
          tag.length >= 2 && 
          tag.length <= 20 && 
          /^[a-zA-Z0-9-]+$/.test(tag)
        );
      },
      message: "Tags must be between 2-20 characters and contain only letters, numbers, and hyphens"
    }
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    validate: {
      validator: function(v: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: "Date must be in YYYY-MM-DD format"
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Add indexes for better query performance
PostSchema.index({ title: 'text' });
PostSchema.index({ tags: 1 });
PostSchema.index({ date: 1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema); 
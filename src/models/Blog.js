const mongooose = require('mongoose');

mongooose.pluralize(null);

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic: String,
    description: String,
    posted_at: { type: Date, default: Date.now },
    posted_by: String,

},{ versionKey: false })

// blogSchema.set('collection','blog')

const Blog = mongooose.model('blog', blogSchema);

module.exports = Blog;
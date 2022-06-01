const { Schema } = require('mongoose');

const newsSchema = new Schema(
    {
        sourceId: {
            type: String,
            required: false
        },
        sourceName: {
            type: String,
            required: false
        },
        author: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        url: {
            type: String            
        },
        image: {
            type: String            
        },
        publishedAt: {
            type: Date,
            required: false
        },
        content: {
            type: String,
            required: false
        }
    }
);

module.exports = newsSchema;
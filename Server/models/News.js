const { Schema } = require('mongoose');

const newsSchema = new Schema(
    {
        sourceId: {
            type: String,
            required: true
        },
        sourceName: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String            
        },
        image: {
            type: String            
        },
        publishedAt: {
            type: Date,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
);

module.exports = newsSchema;
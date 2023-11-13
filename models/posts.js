const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { marked } = require('marked');
const dompurify = createDomPurify(new JSDOM().window);

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
       type: Date,
       default: Date.now
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
},
    {
        versionKey: false,
        timestamps: true
    }
);

postSchema.pre('validate', function (next) {

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
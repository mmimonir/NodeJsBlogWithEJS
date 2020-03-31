const { Schema, model } = require('mongoose')
// const User = require('./User')
// const Post = require('./Post')

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    bio: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    profiePic: String,
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Profile = model('Profile', profileSchema)
module.exports = Profile

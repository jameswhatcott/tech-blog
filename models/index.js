const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const Post = require('./Post');

// Define associations
User.hasMany(Post, {
  foreignKey: 'userId',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Post, sequelize };

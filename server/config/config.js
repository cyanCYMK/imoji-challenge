module.exports = {
  db: {
    uristring: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/imoji'
  },
  port: process.env.PORT || 5000
};

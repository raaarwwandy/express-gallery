/*jshint esversion:6 */

module.exports = function(sequelize, DataType) {
  var Gallery = sequelize.define("Gallery", {
    author: DataType.STRING,
    link: DataType.STRING,
    description: DataType.TEXT
  });
  return Gallery;
};
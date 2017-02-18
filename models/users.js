/*jshint esversion:6 */

module.exports = function(sequelize, DataType){
  var Users = sequelize.define("Useres", {
    username: DataType.STRING, 
    password: DataType.STRING
  });
  return Users;
};
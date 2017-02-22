/*jshint esversion:6 */

module.exports = function(sequelize, DataType){
  var User = sequelize.define("User", {
    username: DataType.STRING, 
    password: DataType.STRING
  });
  return User;
};
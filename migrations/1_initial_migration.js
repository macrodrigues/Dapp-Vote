const Migrations = artifacts.require("Migrations");
const VotePT = artifacts.require("VotePT");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VotePT);
};

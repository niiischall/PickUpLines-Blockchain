const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Account Deployed By: %s", deployer);
    console.log("Deployer Account Balance: %d", accountBalance);

    const contractFactory = await hre.ethers.getContractFactory("PickUpLines");
    const contract = await contractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.001")
    });
    await contract.deployed();
    
    console.log("Contract Deployed at: %s", contract.address);
}


const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

run();
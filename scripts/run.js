const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("PickUpLines");
  const contract = await contractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await contract.deployed();

  console.log("Contract Deployed To: %s", contract.address);
  console.log("Contract Deployed By: %s", owner.address);
  console.log("-------------------------------");

  let contractBalance;
  contractBalance = await hre.ethers.provider.getBalance(contract.address);
  console.log(
    "Contract Balance: %s",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log("-------------------------------");

  let contractTxnOne = await contract.newLine(
    "This is the first line for a reward."
  );
  await contractTxnOne.wait();
  console.log("-------------------------------");

  let contractTxnTwo = await contract
    .connect(randomPerson)
    .newLine("This is the second line for a reward.");
  await contractTxnTwo.wait();
  console.log("-------------------------------");

  let contractTxnThree = await contract
  .connect(randomPerson)
  .newLine("This is the second line for a reward.");
  await contractTxnThree.wait();
  console.log("-------------------------------");


  contractBalance = await hre.ethers.provider.getBalance(contract.address);
  console.log(
    "Contract Balance: %s",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log("-------------------------------");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

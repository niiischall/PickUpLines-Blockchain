// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PickUpLines {
    event NewPickUpLine(address indexed from, uint256 timestamp, string line);

    uint256 private seed;
    uint256 totalLines;
    address[] winners;
    mapping(address => bool) hasWrote;

    struct PickUpLine {
        address writer;
        string line;
        uint256 timestamp;
    }
    PickUpLine[] pickuplines;

    constructor() payable {
        console.log("I am the Cheesy PickUp Lines' smart contract!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function newLine(string memory _line) public {
        if (hasWrote[msg.sender]) {
            revert(
                "It seems you've posted a line already. We don't do repeats when it comes to pick up lines!"
            );
        }
        //Adding a new Pickup Line to our blockchain.
        totalLines += 1;
        pickuplines.push(PickUpLine(msg.sender, _line, block.timestamp));
        hasWrote[msg.sender] = true;
        emit NewPickUpLine(msg.sender, block.timestamp, _line);

        //Reward 10% of sender with 0.0001 ether.
        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed <= 10) {
            winners.push(msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "The contract has insufficient ETH balance."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw ETH from the contract");
        }
    }

    function getAllLines() public view returns (PickUpLine[] memory) {
        return pickuplines;
    }

    function getTotalLines() public view returns (uint256) {
        console.log("We have %s total PickUpLines.", totalLines);
        return totalLines;
    }

    function getTheWinner() private view returns (address[] memory) {
        return winners;
    }
}

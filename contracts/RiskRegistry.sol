// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title RiskRegistry - stores risk scores for RWA tokens
contract RiskRegistry {
    struct RiskData {
        uint16 score;          // 0 - 1000 (so you can do 72.5% = 725)
        uint64 lastUpdated;    // unix timestamp
        address updater;       // who wrote this score
    }

    // token address => RiskData
    mapping(address => RiskData) public risks;

    address public owner;

    event RiskUpdated(address indexed token, uint16 score, uint64 timestamp, address indexed updater);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice set who is allowed to update (for now: only owner backend)
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero");
        owner = newOwner;
    }

    /// @notice backend (oracle / off-chain agent) writes a new score
    function setRiskScore(address token, uint16 score) external onlyOwner {
        require(token != address(0), "token zero");
        require(score <= 1000, "max 1000");

        risks[token] = RiskData({
            score: score,
            lastUpdated: uint64(block.timestamp),
            updater: msg.sender
        });

        emit RiskUpdated(token, score, uint64(block.timestamp), msg.sender);
    }

    /// @notice view helper returning tuple in one call
    function getRiskScore(address token)
        external
        view
        returns (uint16 score, uint64 lastUpdated, address updater)
    {
        RiskData memory r = risks[token];
        return (r.score, r.lastUpdated, r.updater);
    }
}

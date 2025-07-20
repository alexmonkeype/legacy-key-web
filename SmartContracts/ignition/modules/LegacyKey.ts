// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const LegacyKeyModule = buildModule("LegacyKeyModule", (m) => {
  const adLegacy = "0x1234567890abcdef1234567890abcdef12345678"; // Replace with actual address

  const stable = m.contract("StableUSD");
  const legacySC = m.contract("LegacyKey", [
    adLegacy,
    stable
  ]);

  return { legacySC, stable };
});

export default LegacyKeyModule;

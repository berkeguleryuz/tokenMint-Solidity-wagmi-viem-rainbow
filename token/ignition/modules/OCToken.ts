import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OCModule = buildModule("OCModule", (m) => {

  const OC = m.contract("OCToken");

  return { OC };
});

export default OCModule;

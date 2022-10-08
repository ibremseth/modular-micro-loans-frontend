import { ConnectButton } from "@rainbow-me/rainbowkit";

const AquaHeader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
        display: "flex",
        justifyContent: "flex-end",
        fontFamily: "sans-serif",
      }}
    >
      <ConnectButton />
    </div>
  );
};

export default AquaHeader;

const SelectorNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #777",
        borderRadius: "10px",
        backgroundColor: "#f0f0f0",
      }}>
      <strong>{data.label}</strong>
    </div>
  );
};

export default SelectorNode;

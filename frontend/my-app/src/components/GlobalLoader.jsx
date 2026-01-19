import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const loading = useSelector((state) => state.ui.globalLoading);

  if (!loading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ddd",
    borderTop: "5px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default GlobalLoader;
export default function Banner({ type = 'error', children }) {
    const base = "w-full max-w-md mx-auto p-4 rounded-lg mb-4 text-center";
    const styles = {
      error: "bg-red-100 text-red-800",
      success: "bg-green-100 text-green-800",
      info:  "bg-blue-100 text-blue-800",
    };
    return (
      <div className={`${base} ${styles[type]}`}>
        {children}
      </div>
    );
  }
  
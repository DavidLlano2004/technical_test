import { motion } from "framer-motion";
motion;

export const Contracts = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="p-4"
    >
      Contracts
    </motion.div>
  );
};

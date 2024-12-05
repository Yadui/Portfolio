import { motion } from "framer-motion";

const StairAnimation = {
  inital: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};
const reverseIndex = (index) => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};
const Stairs = () => {
  return (
    <>
      {/* render 6 motion divs,each reprensenting a step of the stair
  Each div will habe the same animtion defined by the StairAnimation object. The delay for each div is calculated dynamically based on its reversed index creating a staggered effect with increasing delay for each subsequent step. */}
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={StairAnimation}
            initial="inital"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1,
            }}
            className="h-full w-full bg-accent relative"
          ></motion.div>
        );
      })}
    </>
  );
};

export default Stairs;

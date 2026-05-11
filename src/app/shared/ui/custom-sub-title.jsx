
const CustomSubTitle = ({ text }) => {
  return (
    <h2 className="uppercase text-2xl w-fit md:text-3xl lg:text-4xl font-black relative text-white tracking-wide after:absolute after:w-22 after:bg-primary after:h-1.5 after:left-0 after:-top-5 after:rounded-full">
      {text}
    </h2>
  );
};

export default CustomSubTitle;

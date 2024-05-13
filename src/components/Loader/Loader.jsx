import { InfinitySpin } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      {/* <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      /> */}
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

export default Loader;

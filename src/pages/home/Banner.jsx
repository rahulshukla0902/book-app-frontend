import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="" />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-6">
          New Releases This Week
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-8 mb-10 max-w-xl">
          It&apos;s time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week&apos;s new releases offer something
          for everyone
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;

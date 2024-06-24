type FrameProps = {
  src: string;
  alt: string;
  pos: number;
};

const CarouselComicFrame = ({ src, alt, pos }: FrameProps) => {
  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `rotateY(calc(${pos} * 45deg)) translateZ(18rem)`,
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-conver" />
    </div>
  );
};

export default CarouselComicFrame;
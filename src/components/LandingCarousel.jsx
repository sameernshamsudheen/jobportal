import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import companies from "@/data/companies.json";
import Autoplay from "embla-carousel-autoplay";

const LandingCarousel = () => {
  return (
    <Carousel
    options={{ loop: false }} 
      plugins={[
        
        Autoplay({
          delay: 2000,
          
        }),
      ]}
      className="w-full py-10 -z-10 "
    >
      <CarouselContent className="flex  gap-5 sm:gap-20 items-center">
        {companies?.map(({ name, id, path }) => {
          console.log(name, id, path);

          return (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/5">
              <img
                src={path}
                alt={name}
                className="h-10 sm:h-14 object-contain"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default LandingCarousel;

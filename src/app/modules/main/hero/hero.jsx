import { CustomLink } from "@/app/shared/ui/custom-link";

const Hero = () => {
  return (
    <section
      className="main-hero-section w-full flex flex-col items-center justify-center object-contan min-h-[620px] px-5 py-12 md:py-16"
      style={{
        backgroundImage: "url('/hero.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="text-white text-center border border-white/30 mb-10 max-w-4xl w-full p-6 md:p-10 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 uppercase tracking-wide">
          Грузовые перевозки
        </h1>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed">
          Перевозка крупногабаритных грузов по Чите и Забайкальскому краю.
          Полное экспедирование, страхование, упаковка и хранение грузов.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <CustomLink href={"/price"}>Рассчитать стоимость</CustomLink>
        <CustomLink href={"/contact"}>Связаться с нами</CustomLink>
      </div>
    </section>
  );
};

export default Hero;

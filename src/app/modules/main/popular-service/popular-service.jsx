import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import { CustomLink } from "@/app/shared/ui/custom-link";
import CustomSubTitle from "@/app/shared/ui/custom-sub-title";

const PopularService = () => {
  return (
    <section className="px-5 py-12 text-white rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <CustomSubTitle text={"популярные услуги"} />
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 w-full mt-10">
        <Card className="group bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-primary transition-colors duration-300 font-bold text-lg md:text-xl lg:text-3xl group-hover:text-white">
              Квартирные и офисные переезды.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white/85 text-base md:text-base leading-relaxed">
              Полный комплекс услуг: разборка/сборка мебели, бережная погрузка,
              надежная фиксация в кузове и разгрузка на новом месте.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-primary transition-colors duration-300 font-bold text-lg md:text-xl lg:text-3xl group-hover:text-white">
              Перевозка стройматериалов.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white/85 text-base md:text-base leading-relaxed">
              Собственные самосвалы и манипуляторы. Точно рассчитаем объем и
              подберем технику.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 w-full mt-4">
        <Card className="group bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-primary transition-colors duration-300 font-bold text-lg md:text-xl lg:text-3xl group-hover:text-white">
              Срочные грузоперевозки.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white/85 text-base md:text-base leading-relaxed">
              Курьерская доставка документов и мелких грузов. Круглосуточный
              выезд по Чите и краю.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-primary transition-colors duration-300 font-bold text-lg md:text-xl lg:text-3xl group-hover:text-white">
              Рефрижераторные перевозки.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white/85 text-base md:text-base leading-relaxed">
              Перевозка продуктов, лекарств, цветов и химических веществ с
              соблюдением всех норм. Регулярный мониторинг температуры в пути.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <CustomLink className={"my-5 px-10"} href={"/price"}>
        Подробнее
      </CustomLink>
    </section>
  );
};

export default PopularService;

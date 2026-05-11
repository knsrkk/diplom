import CustomSubTitle from "@/app/shared/ui/custom-sub-title";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/app/shared/ui/card";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import { BiSolidTimer } from "react-icons/bi";
import { FaPeopleCarry } from "react-icons/fa";
const Advantages = () => {
  return (
    <section className="px-5 py-16 text-white mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <CustomSubTitle text={"наши преимущества"} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 mt-10">
        <Card className="group text-center shadow-none bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 hover:-translate-y-1">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <FaPeopleCarry className="size-8" />
          </div>
          <CardContent>
            <CardDescription className="text-white text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              5 000+ перевозок
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group text-center shadow-none bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 hover:-translate-y-1">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <BiSolidTimer className="size-8" />
          </div>
          <CardContent>
            <CardDescription className="text-white text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              10 лет на рынке
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group text-center shadow-none bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 hover:-translate-y-1">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <MdOutlineSecurity className="size-8" />
          </div>
          <CardContent>
            <CardDescription className="text-white text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              Страховка
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group text-center shadow-none bg-white/6 hover:bg-primary/90 transition-all duration-300 border border-white/10 hover:-translate-y-1">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <RiMoneyDollarCircleFill className="size-8!" />
          </div>
          <CardContent>
            <CardDescription className="text-white text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              Выгода
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Advantages;

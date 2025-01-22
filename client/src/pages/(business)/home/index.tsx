import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { Hero } from "./components/Hero";
import { RentList } from "../../../components/shared/RentList";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import reservationService from "@/services/reservation";

const HomePage = () => {
  const {data: getAllRents, isLoading: getAllRentsLoading } = useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATION_RENTS],
    queryFn: () => rentService.getAll({
      showInRecommendation: true,
    })
  })

  const {data: getAllPopularRents, isLoading: getAllPopularRentsLoading } = useQuery({
    queryKey: [QUERY_KEYS.POPULAR_RENTS],
    queryFn: () => reservationService.getPopularCars(),
  })

  console.log("Data from backend:", getAllPopularRents);


  const recommendedRents = getAllRents?.data.items || [];
  const popularRents = getAllPopularRents?.data.items || [];

  

  return (
    <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
      <Hero />
      <AvailabilityFilter />
      <RentList heading="Popular Cars" isLoading={getAllPopularRentsLoading}  rents={popularRents}/>
      <RentList heading="Recommendation Cars" isLoading={getAllRentsLoading} rents={recommendedRents} />
    </div>
  );
};

export default HomePage;

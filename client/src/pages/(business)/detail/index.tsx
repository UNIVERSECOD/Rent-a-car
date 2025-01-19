import { RentList } from "@/components/shared/RentList";
import { ImagesSection } from "./components/Images";
import { InformationSection } from "./components/Information";
import { ReviewsSection } from "./components/Reviews";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import rentService from "@/services/rent";
import reviewService from "@/services/review";

const RentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.RENT_DETAIL, id],
    queryFn: () => rentService.getById(id!),
  });
  const {data: rentsData, isLoading: isRentsLoading}= useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATION_RENTS],
    queryFn: () => rentService.getAll({
      take: 3,
    }),
  });
  const { data: reviewsData } = useQuery({
    queryKey: [QUERY_KEYS.RENT_DETAIL_REVIEW],
    queryFn: () => reviewService.getByRentId({ id: id! }),
  });

  const rents = rentsData?.data.items || [];
  const reviews = reviewsData?.data?.items || [];

  

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  const rent = data?.data?.item;

  if (isError || !rent) {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <p className="text-2xl font-bold mb-3 text-primary">
          Something went wrong!
        </p>
        <Button className="mt-4">
          <Link to={paths.HOME}>Go Back To Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-[1144px] py-6 lg:py-8">
      <div className="grid lg:grid-cols-[1fr_492px] xl:grid-cols-2  gap-x-8">
        <ImagesSection images={rent.imageUrls} />
        <InformationSection rent={rent} />
      </div>
      <ReviewsSection reviews={rent.reviews} />
      <RentList maxCols={3} rents={rents}  isLoading={isRentsLoading} heading="Recent Cars" />
      <RentList
        maxCols={3}
        heading="Recomendation Cars"
        isLoading={isRentsLoading}
        rents={rents}
      />
      <ScrollToTop />
    </div>
  );
};

export default RentDetailPage;

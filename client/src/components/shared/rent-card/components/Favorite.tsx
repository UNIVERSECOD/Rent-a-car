import HeartFilledImg from "@/assets/icons/heart-filled-red.svg";
import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponseError } from "@/types";
import { toast } from "sonner";
import favoriteService from "@/services/favorites";
import { AddFavoriteResponse } from "@/services/favorites/types";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";


const AddFavoriteIcon = ({ isFavorite = false, rentId }: { isFavorite: boolean; rentId: string }) => {
      const { user } = useAppSelector(selectAuth);
      const { openDialog } = useDialog();

    
    const {mutate} = useMutation({
        mutationFn: isFavorite ? favoriteService.removeFavorite : favoriteService.addFavorite,
        onSuccess: (data: AddFavoriteResponse) => {
          toast.success(data.message);
        },
        onError: (error: AxiosResponseError) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        },
      });
    
    
      const handleFavoriteClick = () => {
        if (!user) {
          openDialog(DialogTypeEnum.LOGIN);
          return;
        } else {
          mutate({ rentId });
        }
      };
  return (
    <div>
      <button onClick={handleFavoriteClick} className="h-fit">
        <img src={isFavorite ? HeartFilledImg : HeartOutlinedImg} alt="heart" />
      </button>
    </div>
  );
};

export default AddFavoriteIcon;

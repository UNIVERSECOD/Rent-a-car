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
import { useEffect, useState } from "react";


const AddFavoriteIcon = ({ isFavorite = false, rentId }: { isFavorite: boolean; rentId: string }) => {
      const { user } = useAppSelector(selectAuth);
      const { openDialog } = useDialog();
      const [favoriteState, setFavoriteState] = useState(isFavorite);


    
    const {mutate} = useMutation({
        mutationFn: favoriteState  ? favoriteService.removeFavorite : favoriteService.addFavorite,
        onSuccess: (data: AddFavoriteResponse) => {
          toast.success(data.message);
          setFavoriteState(!favoriteState);
        },
        onError: (error: AxiosResponseError) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        },
      });
    
    
      const handleFavoriteClick = () => {
        if (!user) {
          openDialog(DialogTypeEnum.LOGIN);
          return;
        } 
        if (rentId) {
          mutate({ rentId }); 
        }
      };

      useEffect(() => {
        setFavoriteState(isFavorite);  
      }, [isFavorite]);

  return (
    <div>
      <button onClick={handleFavoriteClick} className="h-fit">
        <img src={favoriteState  ? HeartFilledImg : HeartOutlinedImg} alt="heart" />
      </button>
    </div>
  );
};

export default AddFavoriteIcon;

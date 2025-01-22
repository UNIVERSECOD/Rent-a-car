import { RentList } from '@/components/shared/RentList'
import { paths } from '@/constants/paths';
import { QUERY_KEYS } from '@/constants/query-keys';
import { useAppSelector } from '@/hooks/redux';
import favoriteService from '@/services/favorites';
import { selectAuth } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Navigate } from 'react-router-dom';

const FavoritesPage = () => {
  const {user} = useAppSelector(selectAuth)
 if (!user) {
     return (
         <Navigate to={paths.HOME} />
     );
   }


  const {data: getFavoriteRents, isLoading: getFavoriteRentsLoading } = useQuery({
    queryKey: [QUERY_KEYS.FAVORITES],
    queryFn: () => favoriteService.getAll({})
  })

  const rents = getFavoriteRents?.data?.items || [];


  return (
    <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
         <RentList heading="Favorites" isLoading={getFavoriteRentsLoading}  rents={rents}/>
       </div>
  )
}

export default FavoritesPage

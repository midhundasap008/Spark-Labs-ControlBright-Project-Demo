// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addFeature, deleteFeature, fetchFeaturs, updateFeature } from '../api';

export const useFeatures = () => {
  const queryClient = useQueryClient();
  const { data, isLoading,error,refetch } = useQuery({queryKey:['features'],queryFn:fetchFeaturs, refetchOnMount: 'always'});
  const addFeatureMutation = useMutation(addFeature,{onSuccess:()=>{
    queryClient.invalidateQueries('features');
  }});
  const updateFeatureMutation = useMutation(updateFeature,{onSuccess:()=>{
    queryClient.invalidateQueries('features');
  }});
  const deleteFeatureMutation = useMutation(deleteFeature,{onSuccess:()=>{
    queryClient.invalidateQueries('features');
  }});

  return {
    features: data,
    isLoading,
    error,
    refetch,
    addFeature: addFeatureMutation.mutate,
    updateFeature: updateFeatureMutation.mutate,
    deleteFeature: deleteFeatureMutation.mutate,
  };
};
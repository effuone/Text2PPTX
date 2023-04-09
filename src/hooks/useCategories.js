import { useMemo } from "react";
export const useSortedCategories = (categories, sort) => {
    const sortedCategories = useMemo(()=>{
        if(sort){
          return [...categories].sort((a,b)=>a[sort].localeCompare(b[sort]))
        }
        return categories;
      }, [sort, categories])
    return sortedCategories
}

export const useCategories = (categories, sort, query) => {
    const sortedCategories = useSortedCategories(categories, sort);
    const sortedAndSearchedCategories = useMemo(()=>{
        return sortedCategories.filter(category=>category.name.toLowerCase().includes(query.toLowerCase()))
      }, [query, sortedCategories])
    return sortedAndSearchedCategories
}
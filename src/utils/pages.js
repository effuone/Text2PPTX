export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount/limit)
}
export const getPagesArray = (totalPages) => {
    let result = [];
    for(let i = 0; i < totalPages; ++i)
    {
        result.push(i+1)
        if(i >= 11)
        {
            result.push(totalPages)
            break;
        }
    }
    return result;
}
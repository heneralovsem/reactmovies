export const getTotalPages = (totalResults, perPage) => {
    
    return Math.ceil(totalResults / perPage)
}

export const getPagesArr = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
}
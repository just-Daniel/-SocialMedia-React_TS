export const updateObjectInArray = (items, itemId, propObjName, newObjProps) => {
    return items.map(u => {
        if(u[propObjName] === itemId){
            return {...u, ...newObjProps};
        };
        return u;
    })
}
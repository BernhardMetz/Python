export const GET_GLOBAL_AREAS = 'GET GLOBAL AREAS';

export function getGlobalAreas(data)
{
    return {
        type: GET_GLOBAL_AREAS,
        payload: data
    }
}

export const GET_GLOBAL_COMPANIES = 'GET GLOBAL COMPANIES';

export function getGlobalCompanies(data)
{
    return {
        type: GET_GLOBAL_COMPANIES,
        payload: data
    }
}

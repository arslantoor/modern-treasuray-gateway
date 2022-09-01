import makeApiCall from "../api/MakeApiCall";

async function GetInternalAccounts(){
    return await makeApiCall('internal_accounts','','GET',{per_page: '25'})
}
export default GetInternalAccounts;
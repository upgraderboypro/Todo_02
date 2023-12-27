const apiRequest = async (url = '', optionsObj = null, errMsg = null, res = '')=>{
    try {
        const response = await fetch(url, optionsObj)
        res = await response.json()
        // console.log(res)
        // return res
        if(!response.ok) throw Error("Please reload the app")
    } catch (err) {
        errMsg = err.message;
        return err
    } finally {
        return errMsg || res;
    }
}
export default apiRequest

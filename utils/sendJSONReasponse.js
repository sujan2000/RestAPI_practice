
export function sendJSONReasponse(res, statusCode, payload) {

    res.setHeader('Content-Type', 'application/json')
    //allow to use to everyone
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    res.statusCode = statusCode
    res.end(JSON.stringify(payload))

}
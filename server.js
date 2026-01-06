import http from 'node:http';
import { getDataFromDB } from './database/db.js';
import { sendJSONReasponse } from './utils/sendJSONReasponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'



const PORT = 8000;
const server = http.createServer(async (req, res) => {

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    const destinations = await getDataFromDB()

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        const filteredData = getDataByQueryParams(destinations, queryObj)
        sendJSONReasponse(res, 200, filteredData)
        
    } else if (req.url.startsWith('/api/continents') && req.method === 'GET') {
        
        console.log(queryObj)
        const continent = req.url.split('/').pop()
        const filterContinent = getDataByPathParams(destinations, 'continent', continent)
        sendJSONReasponse(res, 200, filterContinent)

    } else if (req.url.startsWith('/api/countries') && req.method === 'GET') {

        const country = req.url.split('/').pop()
        const filterDestinations = getDataByPathParams(destinations, 'country', country)
        sendJSONReasponse(res, 200, filterDestinations)

    } else {
        const message = { error: "not found", message: "The requested route does not exists" }
        sendJSONReasponse(res, 404, (message))
    }
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))
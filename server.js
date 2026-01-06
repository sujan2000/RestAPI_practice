import http from 'node:http';
import { getDataFromDB } from './database/db.js';
import { sendJSONReasponse } from './utils/sendJSONReasponse.js'

const PORT = 8000;
const server = http.createServer(async (req, res) => {

    const destinations = await getDataFromDB()

    if (req.url === '/api' && req.method === 'GET') {

        sendJSONReasponse(res, 200, destinations)

    } else if (req.url.startsWith('/api/continents') && req.method === 'GET') {

        const continent = req.url.split('/').pop()
        console.log(continent)
        const filterDestinations = destinations.filter(dest => {
            return dest.continent.toLowerCase() === continent.toLowerCase()
        })

        sendJSONReasponse(res, 200, filterDestinations)

    }
    else {
        sendJSONReasponse(res, 404, { error: "not found", message: "The requested route does not exists" })
    }
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))
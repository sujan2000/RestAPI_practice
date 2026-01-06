

export function getDataByQueryParams(data, queryObj) {

    const { continent, country, is_open_to_public } = queryObj

    if (continent) {
        data = data.filter(dest =>
            dest.continent.toLowerCase() === continent.toLowerCase()
        )
    }

    if (country) {
        data = data.filter(dest =>
            dest.country.toLowerCase() === country.toLowerCase()
        )
    }
    if (is_open_to_public) {
        data = data.filter(dest => dest.is_open_to_public === JSON.parse(is_open_to_public)
        )
    }
    return data

}
function getFullAddr(rawResponse) {
  //placeholder
}

function getAddrComponents(rawResponse) {
  const apiResult = rawResponse.results
  if (apiResult.length >= 2) {
    const componentTags = /^country|^administrative_area_level|^sublocality|^locality/ 
    const addrComponents = apiResult[0].address_components
      .filter((component) => !component.types.includes('postal_code'))
      .filter((component) => component.types.find((type) => componentTags.test(type)
      ))
      .reduce((components, address) => {
        const component = {
          longName: address.long_name,
          shortName: address.short_name
        }
        components.push(component) 
        return components
      }, [])

    return addrComponents
  }
}

function getBounds(rawResponse) {
  const apiResult = rawResponse.results
  if (apiResult.length >= 2) {
    const bounds = apiResult[1].geometry.bounds
    return bounds
  }
}

function getCoords(rawResponse) {
  const apiResult = rawResponse.results
  if (apiResult.length >= 1) {
    const coords = apiResult[0].geometry.location
    return coords
  }
}

function extractLocation(rawResponse) {
  return {
    coords: getCoords(rawResponse),
    addrComponents: getAddrComponents(rawResponse),
    bounds: getBounds(rawResponse)
  }
}

module.exports = {
  extractLocation
}
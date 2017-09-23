function getFullAddr(rawResponse) {
  //placeholder
}

function getAddrComponents(rawResponse) {
  const apiResult = rawResponse.results
  if (apiResult.length >= 2) {
    const addrComponents = apiResult[1].address_components
      .filter((component) => !component.types.includes('postal_code'))
      .filter((component) => component.types.find((type) => type.search(/^country|^administrative_area_level/) != -1
      ))
      .reduce((components, address) => {
        const type = address.types.find((type) => type.search(/^country|^administrative_area_level/) != -1)
        const component = {}
        switch (type) {
          case 'country':
            component.level = 0
            break
          default:
            const match = type.match(/\d+$/)
            if (match) component.level = Number(match[0])
        }

        component.longName = address.long_name
        component.shortName = address.short_name
        components[component.level] = component

        return components
      }, [])

    return addrComponents
  }
}


module.exports = {
  getFullAddr,
  getAddrComponents
}
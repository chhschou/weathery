export const isCurrentLocationAvailable = () => navigator.geolocation

export const getCurrentLocation = () => {
  if (isCurrentLocationAvailable) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject) 
    })
  }
}

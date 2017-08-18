export const isCurrentLocationAvailable = () => navigator.geolocation

export const getCurrentLocation = (successCallback, errorCallback) => {
  if (isCurrentLocationAvailable) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }
}

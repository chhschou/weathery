export const isCurrentLocationAvailable = () => navigator.geolocation

export const getCurrentLocation = (successCallback, errorCallback) => {
  if (isCurrentLocationAvailable) {
    navigator.getCurrentPosition(successCallback, errorCallback)
  }
}

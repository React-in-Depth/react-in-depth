function getWeatherImage({ condition, windSpeed, cloudPercentage }, isNight) {
  switch (condition.toLowerCase()) {
    case "rain":
      return "rainy";
    case "clouds":
      return cloudPercentage >= 75 ? "cloudy" : isNight ? "night" : "dreary";
    case "thunderstorm":
      return "thunder";
    case "snow":
      return isNight ? "night" : "snowy";
    default:
      if (isNight) return "night";
      if (windSpeed > 10) return "windy";
      if (cloudPercentage >= 50) return "dreary";
      return "sunny";
  }
}

export default getWeatherImage;

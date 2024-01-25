import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';

interface WeatherInfoProps {
  city: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({city}) => {
  //in actual proj any type should never be used but since the type of weatherData is so complicated I didn't invest time on it
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const timeOfNow = new Date();

  // you can manuplate the time by changing like this
  // const hour = 21 + 1
  const hour = timeOfNow.getHours() + 1;

  //If the hour past 20, then it will fetch also the info for next day
  const days = hour > 20 ? 2 : 1;

  useEffect(() => {
    const API_KEY = 'c84835e6d5214972adc200719242201';
    //the most proper API I could found was this to get all hours at one call, and prevnet 6 time going to server and back
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no&hour`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, [city, days]);

  //while fetching being completed loading message will be shown
  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  // destructuring to prevent unnessasry crowded code
  const {location, current, forecast} = weatherData;

  //if the next 5 hour turns to the next day, then we need data of afew hours from next day
  const sameDayHourlyData = forecast.forecastday[0].hour.slice(hour, hour + 5);
  const nextDayHourlyData =
    days === 2 ? forecast.forecastday[1].hour.slice(0, 5 - (24 - hour)) : [];
  const allData = [...sameDayHourlyData, ...nextDayHourlyData];

  return (
    <View style={styles.container}>
      <View style={styles.now}>
        <Text
          style={
            styles.forecastTitle
          }>{`${location.name}, ${location.country}`}</Text>
        <Text>{current.condition.text}</Text>
        <Image
          source={{uri: `https:${current.condition.icon}`}}
          style={styles.icon}
        />
        <Text>{`Temperature: ${current.temp_c}°C`}</Text>
      </View>
      <Text style={styles.forecastTitle}>Upcoming hours Forecast</Text>
      <FlatList
        style={styles.forcastflatlist}
        data={allData}
        keyExtractor={item => item.date_epoch}
        renderItem={({item}) => (
          <View style={styles.forecastItem}>
            <Text>{item.time.slice(-5)}</Text>
            <Image
              source={{uri: `https:${item.condition.icon}`}}
              style={styles.forecastIcon}
            />
            <Text>{`Temperature: ${item.temp_c}°C`}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text>scroll left to view more... </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  now: {
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#9ca6ff',
    borderRadius: 10,
    marginVertical: 30,
  },
  icon: {
    width: 80,
    height: 80,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forcastflatlist: {
    width: '100%',
  },
  forecastItem: {
    margin: 25,
    padding: 20,
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: '#9ca6ff',
    borderRadius: 10,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
});

export default WeatherInfo;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native';

import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';

function App(): React.JSX.Element {
  const [city, setCity] = useState<string | null>(null);

  const handleCityChange = useCallback((newCity: string) => {
    setCity(newCity);
  }, []);

  return (
    <SafeAreaView>
      <SearchInput onCityChange={handleCityChange} />
      {city && <WeatherInfo city={city} />}
    </SafeAreaView>
  );
}

export default App;

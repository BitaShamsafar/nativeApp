import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import WeatherInfo from './WeatherInfo';

describe('WeatherInfo component', () => {
  it('renders loading message while fetching data', async () => {
    const {getByText} = render(<WeatherInfo city="SampleCity" />);
    expect(getByText('Loading...')).toBeTruthy();

    // test to ensure that loading message disappears after fetching data
    await waitFor(() => expect(getByText('Loading...')).not.toBeTruthy());
  });

  it('renders weather information correctly after data fetching', async () => {
    const mockWeatherData = {
      location: {name: 'City', country: 'Country'},
      current: {
        condition: {text: 'Clear', icon: 'sampleIconUrl'},
        temp_c: 25,
      },
      forecast: {
        forecastday: [
          {
            hour: [
              {
                time: '2024-01-25 10:00',
                condition: {icon: 'sampleIconUrl'},
                temp_c: 28,
              },
              // we can add more sample hourly data as needed
            ],
          },
          // we can add more sample forecast data as needed
        ],
      },
    };

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockWeatherData),
    });

    const {getByText, getByTestId} = render(<WeatherInfo city="SampleCity" />);

    // Wait for the data to be loaded
    await waitFor(() => expect(getByText('City, Country')).toBeTruthy());

    expect(getByText('Clear')).toBeTruthy();
    expect(getByText('Temperature: 25°C')).toBeTruthy();

    expect(getByTestId('hourly-item-0')).toBeTruthy();
  });
});

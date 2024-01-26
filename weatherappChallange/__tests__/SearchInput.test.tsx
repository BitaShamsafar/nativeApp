import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchInput from '../components/SearchInput';
import {it, describe, jest, expect} from '@jest/globals';

describe('SearchInput', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <SearchInput onCityChange={jest.fn()} />,
    );

    const input = getByPlaceholderText('Enter city name');
    const button = getByText('Search');

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('updates input value correctly', () => {
    const {getByPlaceholderText} = render(
      <SearchInput onCityChange={jest.fn()} />,
    );

    const input = getByPlaceholderText('Enter city name');

    fireEvent.changeText(input, 'New York');

    expect(input.props.value).toBe('New York');
  });

  it('calls onCityChange when Search button is pressed', () => {
    const mockOnCityChange = jest.fn();
    const {getByText} = render(<SearchInput onCityChange={mockOnCityChange} />);

    const button = getByText('Search');

    fireEvent.press(button);

    expect(mockOnCityChange).toHaveBeenCalledWith('');
  });
});

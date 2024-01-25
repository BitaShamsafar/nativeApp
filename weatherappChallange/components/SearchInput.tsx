import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

interface SearchInputProps {
  onCityChange: (city: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({onCityChange}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleSearch = () => {
    onCityChange(inputValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name here..."
        placeholderTextColor="#6170fe"
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 50,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 18,
  },
});

export default SearchInput;

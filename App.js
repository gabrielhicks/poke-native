import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

const App = () => {
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
      .then((resp) => resp.json())
      .then((data) => {
        let pokemon = data.results;
        setPoke(pokemon);
      });
  }, []);

  return (
    <View style={styles.container}>
      <h1>Here are the first five pokemon!</h1>
      {poke.length ? (
        <View>
          {poke.map((mon) => (
            <View style={styles.card} key={mon.name}>
              <Text>
                <h2>{mon.name}</h2>
              </Text>
              <Image
                style={styles.image}
                source={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  poke.indexOf(mon) + 1
                }.png`}
              />
            </View>
          ))}
        </View>
      ) : (
        <ActivityIndicator size='large' color='#00ff00' />
      )}
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: '10px solid',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid',
    borderColor: 'black',
    margin: '1px',
  },
});

export default App;

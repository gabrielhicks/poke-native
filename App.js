import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

const App = () => {
  const [poke, setPoke] = useState([]);

  const fetchPokemon = async () => {
    const firstFetch = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
    const firstPromise = await firstFetch.json();

    const secondFetch = firstPromise.results.map(async (item) => {
      const fetchEachPokemon = await fetch(item.url);
      return fetchEachPokemon.json();
    });

    const allPokemon = (await Promise.all(secondFetch)).map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites['front_default'],
      moves: pokemon.moves.slice(0, 5),
    }));

    setPoke(allPokemon);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <View testID='pokemon' style={styles.container}>
      <h1>Here are the first five pokemon!</h1>
      {poke.length ? (
        <View>
          {poke.map((mon) => (
            <View style={styles.card} key={mon.id}>
              <Text>
                <h2>{mon.name}</h2>
                <h3>PokeDex: {mon.id}</h3>
              </Text>
              <Image style={styles.image} source={mon.image} />
              <Text>
                <b>Moves:</b>
                <ul>
                  <li>{mon.moves[0].move.name}</li>
                  <li>{mon.moves[1].move.name}</li>
                  <li>{mon.moves[2].move.name}</li>
                  <li>{mon.moves[3].move.name}</li>
                </ul>
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <ActivityIndicator size='large' color='#00ff00' />
          <Text>Loading</Text>
        </View>
      )}
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    margin: '1rem',
    width: '60vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

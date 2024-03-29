import React, { useEffect } from 'react';
import Searcher from './Components/Searcher'
import { Col, Spin } from "antd";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PokemonList from './Components/Pokemonlist';
import logo from './statics/logo.svg';
import './App.css'
import { fetchPokemonWithDetails } from './slices/dataSlice';

//=== comparación extricta 
//1 === 1 => true
//1 === '1' => false

function App() {
  const pokemons = useSelector((state) => 
  state.data.pokemons, shallowEqual)
  //getIn(['data', 'pokemons'], shallowEqual)).toJs();
  const loading = useSelector((state) => state.ui.loading);
  //getIn(['ui', 'loading']));
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchPokemonWithDetails())
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? (
        <Col offset={12}>
          <Spin spinning size='large' />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}



export default App;
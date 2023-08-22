import React from 'react';
import Wheel from './components/Wheel/Wheel'; // Import your Wheel component
import PreferenceForm from './components/preferenceForm/PreferenceForm';

const App = () => {
  return (
    <div>
      <h1>Wheel of Fortune App</h1>
      <PreferenceForm />
      {/* <Wheel /> */}
    </div>
  );
};

export default App;

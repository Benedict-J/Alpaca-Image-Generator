import React, { useState, useEffect } from 'react';

import images from '../../assets/index.js'
import PillButton from '../PillButton/index.js';

import styles from './style.module.css';

const CustomizeAlpaca = () => {
  const [alpaca, setAlpaca] = useState({
    background: images.background.darkblue70,
    neck: images.neck.default,
    nose: images.nose,
    ears: images.ears.default,
    hair: images.hair.default,
    eyes: images.eyes.default,
    mouth: images.mouth.default,
    leg: images.leg.default,
  });
  const [options, setOptions] = useState();

  const changeOption = (option) => {
    let temp = Object.entries(images[option.toLowerCase()]).map(([key, value]) => {
      return { name: key, image: value };
    });

    setOptions(temp);
  };

  const customOptions = [
    'Hair', 'Ears', 'Eyes', 'Mouth', 'Neck', 'Leg', 'Accessories', 'Background'
  ];

  const replaceAlpacaPart = (part, img) => {
    setAlpaca(prev => ({...prev, [part]: img }));
  }

  useEffect(() => {
    
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img className={styles.background} src={alpaca.background} alt="background" />
        <img className={styles.alpaca_part} src={alpaca.neck} alt="alpaca" />
        <img className={styles.alpaca_part} src={alpaca.nose} alt="nose" />
        <img className={styles.alpaca_part} src={alpaca.ears} alt="ear" />
        <img className={styles.alpaca_part} src={alpaca.hair} alt="hair" />
        <img className={styles.alpaca_part} src={alpaca.eyes} alt="eyes" />
        <img className={styles.alpaca_part} src={alpaca.mouth} alt="mouth" />
        <img className={styles.alpaca_part} src={alpaca.leg} alt="leg" />
      </div>
      <div className={styles.customize}>
        <div>
          <h2>ACCESSORIZE THE ALPACA'S</h2>
          <div className={styles.button_group}>
            {customOptions.map(option => <PillButton key={option} onClick={() => changeOption(option)}>{option}</PillButton>)}
          </div>
        </div>
        <div>
          <h2>STYLE</h2>
          <div className={styles.button_group}>
            {options !== undefined && options.map(option => <PillButton key={option.name} onClick={() => replaceAlpacaPart(option.name, option.image)}>{option.name}</PillButton>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeAlpaca;
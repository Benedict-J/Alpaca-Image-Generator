import React, { useState, useEffect, useRef } from 'react';

import images from '../../assets/index.js';
import Button from '../Button';
import PillButton from '../PillButton/index.js';

import styles from './style.module.css';

const CustomizeAlpaca = () => {
  const [alpaca, setAlpaca] = useState({
    background: images.background.darkblue70,
    ears: images.ears.default,
    neck: images.neck.default,
    nose: images.nose.default,
    hair: images.hair.default,
    eyes: images.eyes.default,
    mouth: images.mouth.default,
    leg: images.leg.default,
    accessories: images.accessories.Headphone
  });
  const [options, setOptions] = useState({
    current: { key: '', value: '' },
    data: null,
  });
  const [file, setFile] = useState();
  const canvasRef = useRef(null);

  const changeOption = (option) => {
    let temp = Object.entries(images[option.toLowerCase()]).map(([key, value]) => {
      return { name: key, image: value };
    });

    setOptions({ current: { key: option, value: '' }, data: temp });
  };

  const customOptions = [
    'Hair', 'Ears', 'Eyes', 'Mouth', 'Neck', 'Leg', 'Accessories', 'Background'
  ];

  const replaceAlpacaPart = (option, img) => {
    setAlpaca(prev => ({...prev, [options.current.key.toLowerCase()]: img }));
    setOptions(prev => ({...prev, current: {...prev.current, value: option}}))
  }

  const toggleActiveOption = (toCheck, option) => {
    if (option === toCheck)  {
      return styles.active_button;
    } else {
      return styles.inactive_button;
    }
  };

  const randomizeAlpaca = () => {
    let custom = {};

    Object.keys(images).forEach(key => {
      let subLength = Object.keys(images[key]).length;
      let random = Math.floor((Math.random() * 10) % subLength);

      custom[key] = images[key][Object.keys(images[key])[random]];
    })

    setAlpaca(custom);
  };

  const download = () => {
    const canvas = canvasRef.current;

    let a = document.createElement('a');

    a.href = canvas.toDataURL("image/jpeg");
    a.download = 'alpaca.jpeg';
    a.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    Object.keys(alpaca).forEach(key => {
      let image= new Image();
      
      image.onload = () => {
        context.drawImage(image, 0, 0, 500, 500)
      }
      image.src = alpaca[key];
    })

    setFile(canvas.toDataURL("image/jpeg"));
  }, [alpaca])

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image_container}>
          <canvas ref={canvasRef} width={500} height={500} hidden />
          <img className={styles.background} src={alpaca.background} alt="background" />
          <img className={styles.alpaca_part} src={alpaca.ears} alt="ear" />
          <img className={styles.alpaca_part} src={alpaca.neck} alt="alpaca" />
          <img className={styles.alpaca_part} src={alpaca.nose} alt="nose" />
          <img className={styles.alpaca_part} src={alpaca.hair} alt="hair" />
          <img className={styles.alpaca_part} src={alpaca.eyes} alt="eyes" />
          <img className={styles.alpaca_part} src={alpaca.mouth} alt="mouth" />
          <img className={styles.alpaca_part} src={alpaca.leg} alt="leg" />
          <img className={styles.alpaca_part} src={alpaca.accessories} alt="accessories" />
        </div>
        <div className={styles.button_group}>
          <Button className={styles.button} onClick={randomizeAlpaca}>Random</Button>
          <Button className={styles.button} onClick={download}>Download</Button>
        </div>
      </div>
      <div className={styles.customize}>
        <div>
          <h2>ACCESSORIZE THE ALPACA'S</h2>
          <div className={styles.pillbutton_group}>
            {customOptions.map(option => <PillButton key={option} className={toggleActiveOption(options.current.key.toLowerCase(), option.toLowerCase())} onClick={() => changeOption(option)}>{option}</PillButton>)}
          </div>
        </div>
        <div>
          <h2>STYLE</h2>
          <div className={styles.pillbutton_group}>
            {options.data !== null && options.data.map(option => <PillButton key={option.name} className={toggleActiveOption(options.current.value, option.name)} onClick={() => replaceAlpacaPart(option.name, option.image)}>{option.name}</PillButton>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomizeAlpaca;
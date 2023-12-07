import { Select, Slider, Text } from '@mantine/core';
import { useState } from 'react';
import keys from '../../utils/scales';
import styles from './Emitter.module.css';
import normalDist from '../../utils/normalDist';

// const chooseWithProb = (arr) => {
//   const rand = Math.random();
//   let sum = 0;
//   for (const item of arr) {
//     sum += item.prob;
//     if (rand < sum) {
//       return item;
//     }
//   }
//   return arr[arr.length - 1];
// };

export default function Emitter({ color }) {
  const [pitchSD, setPitchSD] = useState(10);
  const [keyName, setKeyName] = useState('C Major');
  const [pitchMean, setPitchMean] = useState(0);

  const key = normalDist(pitchMean, pitchSD, keys.find(k => k.name === keyName).notes);

  return (
    <div className={styles.main}>
      <svg width="100%" height="250px">
        {key.map((note, index) => (
          <circle
            key={index}
            cx={`${index * (100 / (key.length)) + 0.5}%`}
            cy={250 * (1 - note.prob * 10) - 5}
            r="0.5%"
            fill={color}
          />
        ))}
      </svg>
      <div className={styles.options}>
        <Select
          label="Key"
          className={styles.select}
          value={keyName}
          onChange={setKeyName}
          data={keys.map((k) => k.name)}
          allowDeselect={false}
        />
        <div className={styles.slider}>
          <Text size="sm">Mean</Text>
          <Slider
            defaultValue={key.length / 2}
            max={key.length - 1}
            value={pitchMean}
            label={(value) => key[value].name}
            onChange={setPitchMean}
            color={color}
          />
        </div>
        <div className={styles.slider}>
          <Text size="sm">Deviation</Text>
          <Slider
            defaultValue={10}
            min={1}
            max={50}
            value={pitchSD}
            onChange={setPitchSD}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}

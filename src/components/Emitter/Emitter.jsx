import { Select, Slider, Tabs, Text } from '@mantine/core';
import { useState } from 'react';
import keys from '../../utils/scales';
import styles from './Emitter.module.css';

const normalDist = (mean, deviation, elements) => {
  const raw = elements.map((element, index) => ({
    ...element,
    prob: Math.exp(-((index - mean) ** 2) / (2 * deviation ** 2)),
  }));
  const total = raw.reduce((acc, element) => acc + element.prob, 0);
  return raw.map((element) => ({ ...element, prob: element.prob / total }));
};

export default function Emitter() {
  const [pitchSD, setPitchSD] = useState(10);
  const [keyName, setKeyName] = useState('Major');
  const [pitchMean, setPitchMean] = useState(0);

  const key = normalDist(pitchMean, pitchSD, keys.find(k => k.name === keyName).notes);

  return (
    <div className={styles.main}>
      <Tabs defaultValue="pitch">
        <Tabs.List>
          <Tabs.Tab value="pitch">
            Pitch
          </Tabs.Tab>
          <Tabs.Tab value="envelope">
            Envelope
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pitch">
          <div className={styles.panel}>
            <div className={styles.dist}>
              <svg width="100%" height="150px" overflow="visible">
                {key.map((note, index) => (
                  <circle key={index} cx={`${index * (100 / (key.length - 1))}%`} cy={150 * (1 - note.prob * 10)} r={4} />
                ))}
              </svg>
            </div>
            <div className={styles.options}>
              <Select
                label="Key"
                className={styles.select}
                value={keyName}
                onChange={setKeyName}
                data={keys.map((k) => k.name)}
              />
              <div className={styles.slider}>
                <Text size="sm">Mean</Text>
                <Slider
                  defaultValue={key.length / 2}
                  max={key.length - 1}
                  value={pitchMean}
                  onChange={setPitchMean}
                />
              </div>
              <div className={styles.slider}>
                <Text size="sm">Deviation</Text>
                <Slider
                  defaultValue={10}
                  value={pitchSD}
                  onChange={setPitchSD}
                />
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="envelope">
          envelope tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

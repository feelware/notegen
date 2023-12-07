import { useState } from 'react';
import { ActionIcon, Button, Tabs } from '@mantine/core';
import * as Tone from 'tone';
import { GoPlus } from 'react-icons/go';
import Emitter from '../Emitter/Emitter';
import styles from './Container.module.css';

const indexColor = index => `hsl(${index * (360 / 12) + 200}, 100%, 50%)`;

const startAudio = async () => {
  await Tone.start();
  console.log('audio is ready');
};

export default function Container() {
  const [instances, setInstances] = useState(1);

  const addInstance = () => {
    setInstances(instances + 1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <Tabs defaultValue="0">
          <Tabs.List>
            {Array.from({ length: instances }, (_, i) =>
              <Tabs.Tab key={i} color={indexColor(i)} value={i.toString()}>{i + 1}</Tabs.Tab>)}
            <ActionIcon variant="transparent" color="gray" styles={{ root: { top: '2.5px', width: '35px' } }} onClick={addInstance}><GoPlus /></ActionIcon>
          </Tabs.List>
          {
            Array.from({ length: instances }, (_, i) =>
            <Tabs.Panel key={i} value={i.toString()}>
              <Emitter color={indexColor(i)} />
            </Tabs.Panel>
          )}
        </Tabs>
      </div>
      {/* <Button style={{ width: '100px' }} onClick={startAudio}>Play</Button> */}
    </div>
  );
}

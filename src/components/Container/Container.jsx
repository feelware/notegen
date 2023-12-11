import { useState } from 'react';
import { ActionIcon, Tabs, Checkbox, Modal, Button, Select, Slider, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GoPlus } from 'react-icons/go';
import { CiSettings } from 'react-icons/ci';
import scales from '../../data/scales';
import Emitter from '../Emitter/Emitter';
import useScale from '../../stores/useScale';
import useVolume from '../../stores/useVolume';
import useAutoScale from '../../stores/useAutoScale';
import styles from './Container.module.css';

const indexColor = index => `hsl(${index * (360 / 12) + 200}, 100%, 50%)`;

export default function Container() {
  const [instances, setInstances] = useState(1);
  const root = useScale(state => state.root);
  const key = useScale(state => state.key);
  const setRoot = useScale(state => state.setRoot);
  const setKey = useScale(state => state.setKey);
  const [opened, { open, close }] = useDisclosure();
  const volume = useVolume(state => state.volume);
  const setVolume = useVolume(state => state.setVolume);
  const autoScale = useAutoScale(state => state.autoScale);
  const toggleAutoScale = useAutoScale(state => state.toggleAutoScale);

  const addInstance = () => {
    setInstances(instances + 1);
  };

  return (
    <div className={styles.global}>
      <div className={styles.bar}>
        <Select
          label="Root"
          className={styles.select}
          data={scales.map((s) => s.root)}
          allowDeselect={false}
          styles={{ root: { width: '20%' } }}
          value={root}
          onChange={setRoot}
        />
        <Select
          label="Key"
          className={styles.select}
          data={scales.find((s) => s.root === root).keys.map((k) => k.name)}
          allowDeselect={false}
          styles={{ root: { width: '80%' } }}
          value={key}
          onChange={setKey}
        />
        <Button color="gray.4" variant="outline" size="sm" onClick={open}>
          <CiSettings size={25} color="gray" />
        </Button>
        <Modal opened={opened} onClose={close} title="Settings" styles={{ root: { overflow: 'visible' } }}>
          <div className={styles.settings}>
            <div className={styles.slider}>
              <Text size="sm">Volume</Text>
              <Slider
                min={-60}
                max={0}
                step={3}
                label={`${volume} dB`}
                value={volume}
                onChange={setVolume}
              />
            </div>
            <Checkbox label="Auto-scale graph" checked={autoScale} onChange={toggleAutoScale} />
          </div>
        </Modal>
      </div>
      <main className={styles.container}>
        <Tabs defaultValue="0">
          <Tabs.List>
            {Array.from({ length: instances }, (_, i) =>
              <Tabs.Tab key={i} color={indexColor(i)} value={i.toString()}>{i + 1}</Tabs.Tab>)}
            <ActionIcon
              variant="transparent"
              color="gray"
              styles={{ root: { top: '2.5px', width: '35px' } }}
              onClick={addInstance}
            >
              <GoPlus />
            </ActionIcon>
          </Tabs.List>
          {
            Array.from({ length: instances }, (_, i) =>
            <Tabs.Panel key={i} value={i.toString()}>
              <Emitter color={indexColor(i)} />
            </Tabs.Panel>
          )}
        </Tabs>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { GoPlus } from 'react-icons/go';
import Emitter from '../Emitter/Emitter';
import styles from './Container.module.css';

export default function Container() {
  const [instances, setInstances] = useState(1);

  const incrementInstances = () => {
    setInstances(instances + 1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.emitters}>
        {Array.from({ length: instances }, (_, i) => <Emitter key={i} />)}
      </div>
      <ActionIcon variant="outline" color="gray" onClick={incrementInstances}><GoPlus /></ActionIcon>
    </div>
  );
}

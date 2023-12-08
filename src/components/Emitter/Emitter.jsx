import { Slider, RangeSlider, Text, Button } from '@mantine/core';
import { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';
import scales from '../../data/scales';
import useScale from '../../stores/useScale';
import useAutoScale from '../../stores/useAutoScale';
import extendScale from '../../utils/extendScale';
import styles from './Emitter.module.css';
import normalDist from '../../utils/normalDist';

const startAudio = async () => {
  await Tone.start();
  Tone.Transport.start();
};

export default function Emitter({ color }) {
  const [octaves, setOctaves] = useState([2, 5]);
  const [pitchMean, setPitchMean] = useState(5);
  const [pitchSD, setPitchSD] = useState(3);
  const [playing, setPlaying] = useState(false);
  const synth = new Tone.Synth().toDestination();
  const root = useScale(state => state.root);
  const key = useScale(state => state.key);
  const autoScale = useAutoScale(state => state.autoScale);

  const scale = normalDist(pitchMean, pitchSD, extendScale(
    scales.find((s) => s.root === root)
    .keys.find((k) => k.name === key)
    .notes, octaves));

  const pitchScaler = 0.09 / Math.max(...scale.map((note) => note.prob));

  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const chooseProb = (arr) => {
    const rand = Math.random();
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].prob;
      if (rand <= sum) {
        return arr[i].value;
      }
    }
  };

  const handlePlayback = () => {
    Tone.context.state === 'suspended' && startAudio();
    setPlaying(!playing);
  };

  useEffect(() => {
    const loop = new Tone.Loop((time) => {
      const note = chooseProb(scaleRef.current);
      synth.triggerAttackRelease(note, '4n', time);
    }, '4n');
    if (playing) {
      loop.start(0);
    } else {
      loop.dispose();
    }
    return () => {
      loop.dispose();
    };
  }, [playing]);

  return (
    <div className={styles.main}>
      <svg width="100%" height="275px">
        {scale.map((note, index) => (
          <circle
            key={index}
            scale={index}
            cx={`${index * (100 / (scale.length)) + 0.5}%`}
            cy={275 * (1 - (autoScale ? note.prob * pitchScaler : note.prob) * 10) - 5}
            r="0.5%"
            fill={color}
          />
        ))}
      </svg>
      <div className={styles.options}>
        <div className={styles.slider}>
          <Text size="sm">Octaves</Text>
          <RangeSlider
            max={8}
            step={1}
            minRange={1}
            color={color}
            value={octaves}
            onChange={setOctaves}
          />
        </div>
        <div className={styles.slider}>
          <Text size="sm">Mean</Text>
          <Slider
            defaultValue={scale.length / 2}
            max={scale.length - 1}
            value={pitchMean}
            label={(value) => scale[value].value}
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
            color={color}
            value={pitchSD}
            onChange={setPitchSD}
          />
        </div>
      </div>
      <Button
        color={color}
        onClick={handlePlayback}
      >
      {
        playing ? 'Stop' : 'Play'
      }
      </Button>
    </div>
  );
}

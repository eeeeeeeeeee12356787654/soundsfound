import { useSoundStore } from '@/stores/sound';

import styles from './range.module.css';

interface RangeProps {
  id: string;
  label: string;
}

export function Range({ id, label }: RangeProps) {
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  return (
    <>
      <label
        className={styles.rangeLabel}
        htmlFor={`${id}-range`}
      >{`${label} sound volume`}</label>
      <input
        autoComplete="off"
        className={styles.range}
        disabled={!isSelected}
        id={`${id}-range`}
        max={100}
        min={0}
        type="range"
        value={volume * 100}
        onClick={e => e.stopPropagation()}
        onChange={e =>
          !locked && isSelected && setVolume(id, Number(e.target.value) / 100)
        }
      />
    </>
  );
}

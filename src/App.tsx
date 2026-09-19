import { useCallback, useState } from 'react';
import { driverEmoji, driverSrc, loadDriver, saveDriver, type SavedDriver } from './drivers';
import { BUILD_BANK, BUILD_ORDER, PARTS, ROBOTS, type PartId, type RobotDef } from './robots';
import { AssetImg } from './ui/AssetImg';
import { DriverGallery } from './ui/DriverGallery';

type Phase = 'builder' | 'pick-bot' | 'build' | 'walk';

export function App(): JSX.Element {
  const [builder, setBuilder] = useState<SavedDriver | null>(() => loadDriver());
  const [phase, setPhase] = useState<Phase>(loadDriver() ? 'pick-bot' : 'builder');
  const [bot, setBot] = useState<RobotDef>(ROBOTS[0]!);
  const [strip, setStrip] = useState<PartId[]>([]);
  const [shake, setShake] = useState(false);

  const step = strip.length;
  const expected = BUILD_ORDER[step];
  const face = builder ? driverEmoji(builder) : '🔧';
  const faceSrc = builder ? driverSrc(builder) : null;

  const tryPart = useCallback(
    (id: PartId): void => {
      const want = BUILD_ORDER[strip.length];
      if (!want) return;
      if (id !== want) {
        setShake(true);
        window.setTimeout(() => setShake(false), 420);
        return;
      }
      const next = [...strip, id];
      setStrip(next);
      if (next.length === BUILD_ORDER.length) {
        window.setTimeout(() => setPhase('walk'), 500);
      }
    },
    [strip],
  );

  return (
    <div className="app">
      <header className="top">
        <button type="button" className="tiny" onClick={() => setPhase('builder')} aria-label="budowniczy">
          {faceSrc ? <AssetImg src={faceSrc} fallback={face} className="tiny-img" /> : face}
        </button>
        {phase !== 'builder' && phase !== 'pick-bot' && (
          <button type="button" className="tiny" onClick={() => setPhase('pick-bot')}>
            🏠
          </button>
        )}
      </header>

      {phase === 'builder' && (
        <DriverGallery
          onPick={(d) => {
            saveDriver(d);
            setBuilder(d);
            setPhase('pick-bot');
          }}
        />
      )}

      {phase === 'pick-bot' && (
        <div className="hub">
          <div className="grid">
            {ROBOTS.map((r) => (
              <button
                key={r.id}
                type="button"
                className="driver-card bot-card"
                onClick={() => {
                  setBot(r);
                  setStrip([]);
                  setPhase('build');
                }}
              >
                <AssetImg src={r.file} fallback={r.emoji} className="bot-img" />
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'build' && expected && (
        <>
          <div className="plan">
            {BUILD_ORDER.map((id, i) => (
              <div key={id} className={`plan-step ${i === step ? 'is-next' : i < step ? 'is-done' : ''}`}>
                <AssetImg src={PARTS[id].file} fallback={PARTS[id].emoji} className="plan-img" />
              </div>
            ))}
          </div>
          <div className={`stage ${shake ? 'is-shake' : ''}`}>
            {strip.map((id) => (
              <AssetImg key={id} src={PARTS[id].file} fallback={PARTS[id].emoji} className="stage-part" />
            ))}
          </div>
          <div className="bank">
            {BUILD_BANK.map((id) => (
              <button key={id} type="button" className="cmd" onClick={() => tryPart(id)}>
                <AssetImg src={PARTS[id].file} fallback={PARTS[id].emoji} className="cmd-img" />
              </button>
            ))}
            <button type="button" className="cmd undo" onClick={() => setStrip((s) => s.slice(0, -1))}>
              🔙
            </button>
          </div>
        </>
      )}

      {phase === 'walk' && (
        <div className="walk">
          <AssetImg src={bot.file} fallback={bot.emoji} className="walk-bot" />
          <button type="button" className="go-btn" onClick={() => setPhase('pick-bot')}>
            🏠
          </button>
        </div>
      )}
    </div>
  );
}

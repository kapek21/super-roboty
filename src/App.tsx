import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { driverEmoji, driverSrc, loadDriver, saveDriver, type SavedDriver } from './drivers';
import {
  ALL_PARTS,
  FAIL_FACE,
  PARTS,
  ROBOTS,
  hintPart,
  runBuild,
  type FailKind,
  type PartId,
  type RobotDef,
} from './robots';
import { AssetImg } from './ui/AssetImg';
import { DriverGallery } from './ui/DriverGallery';

type Phase = 'builder' | 'pick-bot' | 'program' | 'run' | 'fail' | 'win';

const STEP_MS = 700;
const MAX_STRIP = 8;

export function App(): JSX.Element {
  const [builder, setBuilder] = useState<SavedDriver | null>(() => loadDriver());
  const [phase, setPhase] = useState<Phase>(loadDriver() ? 'pick-bot' : 'builder');
  const [bot, setBot] = useState<RobotDef>(ROBOTS[0]!);
  const [strip, setStrip] = useState<PartId[]>([]);
  const [cursor, setCursor] = useState(0);
  const [fail, setFail] = useState<FailKind | null>(null);
  const [hint, setHint] = useState<PartId | null>(null);

  const face = builder ? driverEmoji(builder) : '🔧';
  const faceSrc = builder ? driverSrc(builder) : null;
  const shown = strip.slice(0, Math.max(0, cursor));

  const pickBot = (next: RobotDef): void => {
    setBot(next);
    setStrip([]);
    setCursor(0);
    setFail(null);
    setHint(null);
    setPhase('program');
  };

  const addPart = (id: PartId): void => {
    if (phase !== 'program') return;
    if (strip.length >= MAX_STRIP) return;
    setHint(null);
    setStrip((s) => [...s, id]);
  };

  const play = useCallback((): void => {
    if (strip.length === 0) return;
    setHint(null);
    setFail(null);
    setCursor(0);
    setPhase('run');
  }, [strip.length]);

  useEffect(() => {
    if (phase !== 'run') return;
    const outcome = runBuild(strip, bot);
    const limit = outcome.ok ? strip.length : outcome.failAt + 1;
    const timer = window.setTimeout(() => {
      const next = cursor + 1;
      if (next < limit) {
        setCursor(next);
        return;
      }
      setCursor(limit);
      if (outcome.ok) setPhase('win');
      else {
        setFail(outcome.fail);
        setPhase('fail');
      }
    }, cursor === 0 ? 280 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [bot, cursor, phase, strip]);

  return (
    <div
      className="app"
      style={
        {
          ['--workshop-bg' as string]: `url(${import.meta.env.BASE_URL}assets/workshop/bg_workshop.png)`,
        } as CSSProperties
      }
    >
      <header className="top">
        <button type="button" className="tiny" onClick={() => setPhase('builder')} aria-label="budowniczy">
          {faceSrc ? <AssetImg src={faceSrc} fallback={face} className="tiny-img" /> : face}
        </button>
        {phase !== 'builder' && phase !== 'pick-bot' && (
          <button type="button" className="tiny" onClick={() => setPhase('pick-bot')} aria-label="szafa">
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
          <p className="goal-tag">🎯</p>
          <div className="grid">
            {ROBOTS.map((r) => (
              <button
                key={r.id}
                type="button"
                className="driver-card bot-card"
                onClick={() => pickBot(r)}
                aria-label={`robot ${r.emoji}`}
              >
                <AssetImg src={r.file} fallback={r.emoji} className="bot-img" />
                <span className="bot-count">{r.recipe.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(phase === 'program' || phase === 'run' || phase === 'fail' || phase === 'win') && (
        <>
          <div className="goal-row">
            <div className="goal-card">
              <span aria-hidden>🎯</span>
              <AssetImg src={bot.file} fallback={bot.emoji} className="goal-bot" />
            </div>
          </div>

          <div
            className={`stage ${phase === 'fail' ? 'is-fail' : ''} ${phase === 'run' ? 'is-run' : ''}`}
          >
            {phase === 'win' ? (
              <AssetImg src={bot.file} fallback={bot.emoji} className={`walk-bot is-${bot.walk}`} />
            ) : (
              shown.map((id, i) => (
                <AssetImg
                  key={`${id}-${i}`}
                  src={PARTS[id].file}
                  fallback={PARTS[id].emoji}
                  className={`stage-part ${phase === 'fail' && i === shown.length - 1 ? 'is-fall' : ''}`}
                />
              ))
            )}
            {phase === 'fail' && fail ? <p className="fail-face">{FAIL_FACE[fail]}</p> : null}
            {phase === 'win' ? <p className="fail-face">🎉</p> : null}
          </div>

          <div className="program">
            <div className="strip" aria-label="program">
              {strip.map((id, i) => (
                <div
                  key={`${id}-${i}`}
                  className={`cmd is-placed ${i < cursor ? 'is-done' : ''} ${
                    phase === 'run' && i === cursor - 1 ? 'is-now' : ''
                  }`}
                >
                  <AssetImg src={PARTS[id].file} fallback={PARTS[id].emoji} className="cmd-img" />
                </div>
              ))}
              {phase === 'program' && strip.length < MAX_STRIP ? <div className="cmd is-slot" /> : null}
            </div>

            {phase === 'program' ? (
              <>
                <div className="bank">
                  {ALL_PARTS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={`cmd ${hint === id ? 'is-hint' : ''}`}
                      onClick={() => addPart(id)}
                    >
                      <AssetImg src={PARTS[id].file} fallback={PARTS[id].emoji} className="cmd-img" />
                    </button>
                  ))}
                  <button
                    type="button"
                    className="cmd undo"
                    onClick={() => setStrip((s) => s.slice(0, -1))}
                    aria-label="cofnij"
                  >
                    🔙
                  </button>
                  <button
                    type="button"
                    className="cmd play"
                    onClick={play}
                    disabled={strip.length === 0}
                    aria-label="start"
                  >
                    ▶
                  </button>
                </div>
              </>
            ) : null}

            {phase === 'fail' ? (
              <div className="bank">
                <button
                  type="button"
                  className="cmd"
                  onClick={() => {
                    setPhase('program');
                    setCursor(0);
                    setFail(null);
                  }}
                  aria-label="popraw program"
                >
                  🔧
                </button>
                <button
                  type="button"
                  className="cmd play"
                  onClick={() => {
                    const outcome = runBuild(strip, bot);
                    const prefix =
                      outcome.fail === 'missing' ? strip : strip.slice(0, Math.max(0, outcome.failAt));
                    setHint(hintPart(prefix, bot));
                    setPhase('program');
                    setCursor(0);
                    setFail(null);
                  }}
                  aria-label="podpowiedź"
                >
                  🚜
                </button>
              </div>
            ) : null}

            {phase === 'win' ? (
              <button type="button" className="go-btn" onClick={() => setPhase('pick-bot')}>
                🏠
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

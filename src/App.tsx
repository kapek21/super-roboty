import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { driverEmoji, driverSrc, loadDriver, saveDriver, type SavedDriver } from './drivers';
import {
  FAIL_FACE,
  ROBOTS,
  SLOT_EMOJI,
  bagFor,
  bankFor,
  hintBrick,
  runPage,
  type FailKind,
  type RobotDef,
} from './robots';
import { AssetImg } from './ui/AssetImg';
import { BrickView } from './ui/BrickView';
import { DriverGallery } from './ui/DriverGallery';
import { KitImg } from './ui/KitImg';

type Phase = 'builder' | 'pick-bot' | 'program' | 'run' | 'fail' | 'win';

const STEP_MS = 550;

export function App(): JSX.Element {
  const [builder, setBuilder] = useState<SavedDriver | null>(() => loadDriver());
  const [phase, setPhase] = useState<Phase>(loadDriver() ? 'pick-bot' : 'builder');
  const [bot, setBot] = useState<RobotDef>(ROBOTS[0]!);
  const [pageIndex, setPageIndex] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);
  const [strip, setStrip] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const [fail, setFail] = useState<FailKind | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const page = bot.pages[pageIndex]!;
  const face = builder ? driverEmoji(builder) : '🔧';
  const faceSrc = builder ? driverSrc(builder) : null;
  const bank = bankFor(page);
  const bag = bagFor(page);
  const stacked = strip.slice(0, Math.max(0, cursor));

  const pickBot = (next: RobotDef): void => {
    setBot(next);
    setPageIndex(0);
    setBuilt([]);
    setStrip([]);
    setCursor(0);
    setFail(null);
    setHint(null);
    setPhase('program');
  };

  const resetPage = (): void => {
    setStrip([]);
    setCursor(0);
    setFail(null);
  };

  const addBrick = (id: string): void => {
    if (phase !== 'program') return;
    if (strip.length >= page.bricks.length + 2) return;
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
    const outcome = runPage(strip, page);
    const limit = outcome.ok ? strip.length : outcome.failAt + 1;
    const timer = window.setTimeout(() => {
      const next = cursor + 1;
      if (next < limit) {
        setCursor(next);
        return;
      }
      setCursor(limit);
      if (outcome.ok) {
        const nextBuilt = [...built, page.slot];
        setBuilt(nextBuilt);
        if (pageIndex + 1 >= bot.pages.length) setPhase('win');
        else {
          setPageIndex(pageIndex + 1);
          resetPage();
          setPhase('program');
        }
      } else {
        setFail(outcome.fail);
        setPhase('fail');
      }
    }, cursor === 0 ? 220 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [bot.pages.length, built, cursor, page, pageIndex, phase, strip]);

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
          <p className="goal-tag">📘</p>
          <div className="grid">
            {ROBOTS.map((r) => (
              <button
                key={r.id}
                type="button"
                className="driver-card bot-card"
                onClick={() => pickBot(r)}
                aria-label={`zestaw ${r.emoji}`}
              >
                <AssetImg src={r.file} fallback={r.emoji} className="bot-img" />
                <span className="bot-count">{r.pages.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(phase === 'program' || phase === 'run' || phase === 'fail' || phase === 'win') && (
        <>
          <div className="manual">
            <span className="manual-step">
              {pageIndex + 1}/{bot.pages.length}
            </span>
            <span className="manual-slot">{SLOT_EMOJI[page.slot]}</span>
            <AssetImg src={bot.file} fallback={bot.emoji} className="goal-bot" />
          </div>

          <div className={`stage ${phase === 'fail' ? 'is-fail' : ''}`}>
            {phase === 'win' ? (
              <AssetImg src={bot.file} fallback={bot.emoji} className={`walk-bot is-${bot.walk}`} />
            ) : (
              <>
                <div className="stage-grid">
                  {built.map((slot) => {
                    const crop = bot.crops[slot as keyof typeof bot.crops];
                    if (!crop) return null;
                    return (
                      <KitImg
                        key={slot}
                        src={bot.file}
                        crop={crop}
                        fallback={SLOT_EMOJI[slot as keyof typeof SLOT_EMOJI]}
                        className={`stage-part slot-${slot}`}
                      />
                    );
                  })}
                  {phase !== 'fail' && !built.includes(page.slot) ? (
                    <span className={`ghost slot-${page.slot}`}>{SLOT_EMOJI[page.slot]}</span>
                  ) : null}
                </div>
                <div className={`stack ${phase === 'fail' ? 'is-fall' : ''}`}>
                  {stacked.map((id, i) => (
                    <BrickView key={`${id}-${i}`} id={id} className="stack-brick" />
                  ))}
                </div>
              </>
            )}
            {phase === 'fail' && fail ? <p className="fail-face">{FAIL_FACE[fail]}</p> : null}
            {phase === 'win' ? <p className="fail-face">🎉</p> : null}
          </div>

          {phase === 'program' || phase === 'run' ? (
            <div className="bag" aria-label="woreczek">
              {bag.map((item) => (
                <BrickView key={item.id} id={item.id} qty={item.qty} />
              ))}
            </div>
          ) : null}

          <div className="program">
            <div className="strip" aria-label="program">
              {strip.map((id, i) => (
                <div
                  key={`${id}-${i}`}
                  className={`cmd is-placed ${i < cursor ? 'is-done' : ''} ${
                    phase === 'run' && i === cursor - 1 ? 'is-now' : ''
                  }`}
                >
                  <BrickView id={id} />
                </div>
              ))}
              {phase === 'program' ? <div className="cmd is-slot" /> : null}
            </div>

            {phase === 'program' ? (
              <div className="bank">
                {bank.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`cmd ${hint === id ? 'is-hint' : ''}`}
                    onClick={() => addBrick(id)}
                  >
                    <BrickView id={id} />
                  </button>
                ))}
                <button
                  type="button"
                  className="cmd undo"
                  onClick={() => {
                    setHint(null);
                    setStrip((s) => s.slice(0, -1));
                  }}
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
                    const outcome = runPage(strip, page);
                    const prefix =
                      outcome.fail === 'missing' ? strip : strip.slice(0, Math.max(0, outcome.failAt));
                    setHint(hintBrick(prefix, page));
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

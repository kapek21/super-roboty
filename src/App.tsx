import { useState, type CSSProperties } from 'react';
import { driverEmoji, driverSrc, loadDriver, saveDriver, type SavedDriver } from './drivers';
import { ROBOTS, bagFor, bankFor, type Place, type RobotDef } from './robots';
import { AssetImg } from './ui/AssetImg';
import { BrickView } from './ui/BrickView';
import { BuildPlate } from './ui/BuildPlate';
import { DriverGallery } from './ui/DriverGallery';

type Phase = 'builder' | 'pick-bot' | 'build' | 'win';

export function App(): JSX.Element {
  const [builder, setBuilder] = useState<SavedDriver | null>(() => loadDriver());
  const [phase, setPhase] = useState<Phase>(loadDriver() ? 'pick-bot' : 'builder');
  const [bot, setBot] = useState<RobotDef>(ROBOTS[0]!);
  const [pageIndex, setPageIndex] = useState(0);
  const [placed, setPlaced] = useState<Place[]>([]);
  const [hintOn, setHintOn] = useState(false);
  const [shake, setShake] = useState(false);

  const page = bot.pages[pageIndex] ?? bot.pages[0]!;
  const face = builder ? driverEmoji(builder) : '🔧';
  const faceSrc = builder ? driverSrc(builder) : null;
  const doneOnPage = placed.length - bot.pages.slice(0, pageIndex).reduce((n, p) => n + p.bricks.length, 0);
  const nextBrick = phase === 'build' ? page.bricks[doneOnPage] ?? null : null;
  const bank = bankFor(page);
  const bag = bagFor({ ...page, bricks: page.bricks.slice(doneOnPage) });
  const placedOnPage = page.bricks.slice(0, Math.max(0, doneOnPage));

  const pickBot = (next: RobotDef): void => {
    setBot(next);
    setPageIndex(0);
    setPlaced([]);
    setHintOn(false);
    setPhase('build');
  };

  const tryPlace = (id: string): void => {
    if (phase !== 'build' || !nextBrick) return;
    if (id !== nextBrick.id) {
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      return;
    }
    setPlaced([...placed, nextBrick]);
    setHintOn(false);
    if (doneOnPage + 1 < page.bricks.length) return;
    if (pageIndex + 1 >= bot.pages.length) {
      setPhase('win');
      return;
    }
    setPageIndex(pageIndex + 1);
  };

  const undo = (): void => {
    if (phase !== 'build') return;
    const pageStart = bot.pages.slice(0, pageIndex).reduce((n, p) => n + p.bricks.length, 0);
    if (placed.length <= pageStart) return;
    setPlaced((s) => s.slice(0, -1));
    setHintOn(false);
  };

  const allBricks = bot.pages.flatMap((p) => p.bricks);

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
          <p className="goal-tag">Zestaw</p>
          <div className="grid">
            {ROBOTS.map((r) => (
              <button
                key={r.id}
                type="button"
                className="driver-card bot-card"
                onClick={() => pickBot(r)}
                aria-label={r.title}
              >
                <AssetImg src={r.file} fallback={r.emoji} className="bot-img" />
                <span className="bot-name">{r.title}</span>
                <span className="bot-count">{r.pages.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(phase === 'build' || phase === 'win') && (
        <>
          <div className="manual">
            <div className="manual-copy">
              <span className="manual-step">
                {Math.min(pageIndex + 1, bot.pages.length)}
              </span>
              <span className="manual-slot">{page.title}</span>
              <span className="manual-of">/{bot.pages.length}</span>
            </div>
            <div className="step-book" aria-label="ta strona">
              <BuildPlate placed={placedOnPage} guides={page.bricks} mini />
            </div>
            <AssetImg src={bot.file} fallback={bot.emoji} className="goal-bot" />
          </div>
          {phase === 'build' ? (
            <div className={`need ${shake ? 'is-shake' : ''}`} aria-label="klocki tej strony">
              <span className="need-label">ta strona</span>
              {bag.map((item) => (
                <BrickView key={item.id} id={item.id} qty={item.qty} />
              ))}
            </div>
          ) : null}

          <div className="stage">
            <BuildPlate
              placed={placed}
              ghost={hintOn ? nextBrick : null}
              guides={allBricks}
              focus={page.bricks}
              frame={allBricks}
              celebrating={phase === 'win'}
            />
          </div>

          {phase === 'build' ? (
            <>
              <div className="bank">
                {bank.map((id) => (
                  <button key={id} type="button" className="cmd" onClick={() => tryPlace(id)}>
                    <BrickView id={id} />
                  </button>
                ))}
                <button type="button" className="cmd undo" onClick={undo} aria-label="cofnij">
                  🔙
                </button>
                <button
                  type="button"
                  className="cmd play"
                  onClick={() => setHintOn(true)}
                  aria-label="podpowiedź"
                >
                  🚜
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="go-btn" onClick={() => setPhase('pick-bot')}>
              🏠
            </button>
          )}
        </>
      )}
    </div>
  );
}

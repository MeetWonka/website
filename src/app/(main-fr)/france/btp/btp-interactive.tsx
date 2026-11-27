"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { btpPhases } from "./btp-content";
import styles from "./btp.module.css";

interface BtpVideoProps {
  slug: string;
  title: string;
  priority?: boolean;
}

export function BtpVideo({ slug, title, priority = false }: BtpVideoProps) {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          setSource((current) => {
            if (current) return current;
            const width = window.innerWidth * window.devicePixelRatio;
            return "/videos/france/btp/" + slug + (width > 1400 ? "-1080" : "-720") + ".mp4";
          });
          if (video && !paused) video.play().catch(() => undefined);
        } else if (video) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [slug, reduced, paused]);

  function toggle() {
    const video = videoRef.current;
    if (!video) {
      setPaused(false);
      setSource("/videos/france/btp/" + slug + "-720.mp4");
      return;
    }
    if (video.paused) {
      video.play().catch(() => undefined);
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  const playing = ready && !paused;

  return (
    <figure className={styles.videoFrame} ref={frameRef}>
      <Image
        src={"/images/france/btp/" + slug + "-poster.jpg"}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 75rem) 50vw, 100vw"
        className={styles.videoPoster}
      />
      {source ? (
        <video
          ref={videoRef}
          src={source}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={title}
          onPlaying={() => setReady(true)}
          className={styles.videoMedia}
          data-ready={ready || undefined}
        />
      ) : null}
      <button
        type="button"
        className={styles.videoToggle}
        onClick={toggle}
        aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
      >
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}

export function AgentExplorer() {
  const [active, setActive] = useState(0);
  const phase = btpPhases[active];

  return (
    <div className={styles.explorer}>
      <div className={styles.explorerTabs} role="tablist" aria-label="Phases du chantier">
        {btpPhases.map((item, index) => (
          <button
            key={item.id}
            id={"phase-tab-" + item.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={"phase-panel-" + item.id}
            onClick={() => setActive(index)}
          >
            <span>{"0" + (index + 1)}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        className={styles.explorerPanel}
        role="tabpanel"
        id={"phase-panel-" + phase.id}
        aria-labelledby={"phase-tab-" + phase.id}
        key={phase.id}
      >
        <p className={styles.explorerIntro}>{phase.intro}</p>
        <ul className={styles.agentGrid}>
          {phase.agents.map((agent) => (
            <li className={styles.agentCard} key={agent.name}>
              <div className={styles.agentHead}>
                <span className={styles.agentIcon} aria-hidden="true">
                  {agent.name.slice(0, 1)}
                </span>
                <div>
                  <h3>{agent.name}</h3>
                  <small>Agent Wonka Chat</small>
                </div>
              </div>
              <dl className={styles.agentFlow}>
                <div>
                  <dt>Vous donnez</dt>
                  <dd>{agent.input}</dd>
                </div>
                <div>
                  <dt>L’agent prépare</dt>
                  <dd>{agent.output}</dd>
                </div>
                <div>
                  <dt>Vous validez</dt>
                  <dd>{agent.check}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

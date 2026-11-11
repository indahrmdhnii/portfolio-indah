import { useRef, useState } from 'react';
import { icons3d } from '../../assets/icons3d';

interface Props {
  /** CSS position inside the nearest positioned parent, e.g. { top: '10%', left: '4%' } */
  style: React.CSSProperties;
  size?: number;
  rotate?: number;
  className?: string;
}

/** A 3D daisy you can pick up and move with a mouse or a finger (Indah loves daisies). */
const DraggableDaisy = ({ style, size = 64, rotate = 0, className = '' }: Props) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef({ px: 0, py: 0, ox: 0, oy: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setOffset({ x: start.current.ox + e.clientX - start.current.px, y: start.current.oy + e.clientY - start.current.py });
  };
  const stop = () => setDragging(false);

  return (
    <div
      className={`daisy ${dragging ? 'daisy-dragging' : ''} ${className}`}
      style={{ ...style, width: size, height: size, transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      aria-hidden="true"
    >
      <img src={icons3d.daisy} alt="" draggable={false} />
    </div>
  );
};

export default DraggableDaisy;

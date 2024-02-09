import { useEffect, useState } from 'react';

type Device = 'mobile' | 'tablet' | 'desktop';

export const useDevice = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const defineDevice = (width: number): Device => {
    if (width <= 426) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  };
  const [device, setDevice] = useState<Device>(defineDevice(windowWidth));

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setDevice(defineDevice(windowWidth));
  }, [windowWidth]);

  return device;
};

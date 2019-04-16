import React, { useEffect, useCallback, useState, useMemo } from "react";

const App: React.FC<{}> = () => {
  const [deviceOrientation, setDeviceOrientation] = useState({
    absolute: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  });

  const cx = useMemo(() => {
    let x = deviceOrientation.gamma;
    return ((x + 90) / 180) * 100;
  }, [deviceOrientation.gamma]);
  const cy = useMemo(() => {
    let y = deviceOrientation.beta;
    if (y > 90) {
      y = 90;
    }
    if (y < -90) {
      y = -90;
    }
    return ((y + 90) / 180) * 100;
  }, [deviceOrientation.beta]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      setDeviceOrientation({
        absolute: event.absolute,
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    },
    []
  );

  useEffect(() => {
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [handleDeviceOrientation]);

  return (
    <div>
      <h1>DeviceOrientation Sample</h1>
      <pre>{JSON.stringify(deviceOrientation, null, "  ")}</pre>

      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "100%"
        }}
      >
        <svg
          width="500"
          height="500"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%"
          }}
        >
          <rect width="100" height="100" x="0" y="0" fill="#000000" />
          <circle cx={cx} cy={cy} r="5" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
};

export { App };

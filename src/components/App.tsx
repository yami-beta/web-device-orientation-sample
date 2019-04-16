import React, { useEffect, useCallback, useState } from "react";

const App: React.FC<{}> = () => {
  const [deviceOrientation, setDeviceOrientation] = useState();
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
      <h1>Hello World</h1>
      <pre>{JSON.stringify(deviceOrientation, null, "  ")}</pre>
    </div>
  );
};

export { App };

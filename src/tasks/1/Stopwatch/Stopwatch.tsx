import React, {FC, useState, useEffect, useRef} from "react";

const Stopwatch: FC = () => {
    const [status, setStatus] = useState(false);
    const [runningTime, setTime] = useState(0);
    const timer: { current: NodeJS.Timeout | number | null } = useRef(null);

    const getUnits = (time: number) => {
        const seconds = time / 1000;

        const min = Math.floor(seconds / 60).toString();
        const sec = Math.floor(seconds % 60).toString();
        const msec = (seconds % 1).toFixed(3).substring(2);

        return `${min}:${sec}:${msec}`;
    }

    const handleClick = () => setStatus(!status);

    const handleReset = () => {
        clearInterval(timer.current as NodeJS.Timeout);
        setTime(0);
        setStatus(false);
    };

    const handleLap = () => {
        console.log(getUnits(runningTime));
    };

    useEffect(() => {
        if (!status) {
            clearInterval(timer.current as NodeJS.Timeout);
        } else {
            const startTime = Date.now() - runningTime;

            timer.current = setInterval(() => {
                setTime(Date.now() - startTime);
            });
        }

        return () => clearInterval(timer.current as NodeJS.Timeout);
    }, [runningTime, status]);

    return (
        <div style={{ padding: '30px' }}>
            <p>{getUnits(runningTime)}</p>
            <button onClick={handleClick}>
                {status ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Lap</button>
        </div>
    );
};

export default Stopwatch;

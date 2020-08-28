import React, {useState, useEffect} from 'react';


const Animate = ({turn, setTurn, started, animate, setAnimate}) => {
    const min_speed = 1000;
    const [finalTurn, setFinalTurn] = useState(0);
    const [speed, setSpeed] = useState(100);
    
    
    function handleChange(e) {
        if(isNaN(e.target.value) || e.target.value < 0 || e.target.value > 1000)
            return;
        
        setFinalTurn(e.target.value);
    };

    function beginAnimation(e) {
        e.preventDefault();

        setAnimate(!animate);
    };

    function changeSpeed(e) {
        setSpeed(min_speed / e.target.value);
    }

    useEffect(() => {
        if(animate && started && turn < finalTurn)
            setTimeout(() => setTurn(turn + 1), speed);
        else if(animate)
            setAnimate(false);

    }, [animate, turn]);
    
    return (
        <section className="animate-container" >
            <h2>Simulate!</h2>
            <form onSubmit={e => beginAnimation(e)}>
                <label for="sturns">Simulate until turn:</label>
                <input type="text" onChange={(e)=>handleChange(e)} value={finalTurn} name="sturns"></input>
                <label for="sspeed">Set simulation speed:</label>
                <input type="range" min="1" max="10" defaultValue="6" onChange={e => changeSpeed(e)} name="sspeed"/>
                <button type="submit">{animate ? "Stop" : "Start"}</button>
            </form>
        </section>
    )
}

export default Animate;
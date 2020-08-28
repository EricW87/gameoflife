import React, {useState} from 'react';

const Options = ({size, setSize, wrap, setWrap, started}) => {
    const [value, setValue] = useState(size);

    function handleChange(e) {
        if(isNaN(e.target.value) || e.target.value > 1000)
            return;
        
        setValue(e.target.value);
    };

    function changeWrap(e) {
        if(started)
            return;

        setWrap(!wrap);
    };

    function changeSize(e) {
        e.preventDefault();
        if(started || isNaN(value) || value < 10 || value > 1000)
            return;
        
        setSize(value);
    }

    return (
        <section className="options-container">
            <h2>Options</h2>
            <form onSubmit={(e) => changeSize(e)}>
                <label for="size">Cells per side:</label>
                <input type="text" onChange={(e)=>handleChange(e)} value={value} name="size"></input>

                <button type="submit">Set</button>
            </form>
            <form>
                <label for="wrap">Board wraps around edges:</label>
                <input type="radio" value={true} onChange={e => changeWrap(e)} name="wrap"/>
                <label for="wrap">Yes</label>
                <input type="radio" value={false} onChange={e => changeWrap(e)} name="wrap"/>
                <label for="wrap">No</label>
            </form>   
        </section>
    );
} //Options

export default Options;
import React from 'react';

const About = () => {
    return (
        <section className="about-container">
            <h2>About</h2>
            <p>Conway's Game of Life is a cellular automaton created by British mathematician John Conway in 1970. The game demonstrates how complex systems can emerge using only simple rules. It's been shown thtat you can create a Turing complete computer with the right initial pattern, meaning you could theoretically create a working computer running inside the Game of Life.</p>
            <p>The game consists of an arbitraryly large grid made up of cells. Each cell is either alive or dead. A new generation of cells created based on the state of the previous generation of cells. Four basic rules are followed to create a new generation of cells.</p>
        </section>
    )
}

export default About;
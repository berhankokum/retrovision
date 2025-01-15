import React from 'react';
import '../styles/MoodSelector.css';

const MoodSelector = ({ onMoodSelect }) => {
    const moods = ['Mutlu', 'Hüzünlü', 'Heyecanlı', 'Stresli'];

    return (
        <div className="mood-selector">
            <h2>Ruh Halinizi Seçin</h2>
            <div className="mood-buttons">
                {moods.map((mood) => (
                    <button key={mood} onClick={() => onMoodSelect(mood)}>
                        {mood}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;

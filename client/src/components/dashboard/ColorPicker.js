import React from 'react';
import { useAppContext } from "../../context/user_context";
import { defaultColors } from "../../utils/constants";

const ColorPicker = () => {
    const { colors, addColor, removeColor } = useAppContext();

    const handleColorToggle = (colorCode) => {
        if (colors.includes(colorCode)) {
            removeColor(colorCode); // Remove the color if it's already selected
        } else {
            addColor(colorCode); // Add the color if it's not already selected
        }
    };

    return (
        <div className='form-center'>
            <label htmlFor='image' className='form-label'>
                Colors
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {defaultColors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'inline-block',
                            width: '20px',
                            height: '20px',
                            backgroundColor: color.code,
                            margin: '5px',
                            cursor: 'pointer',
                            border: colors.includes(color.code) ? '3px solid black' : 'none',
                        }}
                        onClick={() => handleColorToggle(color.code)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;

import React from 'react';

const Filter = ({ selectedToppings, setSelectedToppings }) => {
    const toppings = ['Milk Foam', 'White Pearl', 'Aloe', 'Pearl'];

    const toggleTopping = (topping) => {
        setSelectedToppings((prev) =>
            prev.includes(topping)
                ? prev.filter((item) => item !== topping)
                : [...prev, topping]
        );
    };

    return (
        <div className="filter-container">
            <div className="filter-options">
                <h3>Toppings:</h3>
                <div className="filter-checkboxes">
                    {toppings.map((topping) => (
                        <label key={topping}>
                            <input
                                type="checkbox"
                                checked={selectedToppings.includes(topping)}
                                onChange={() => toggleTopping(topping)}
                            />
                            {topping}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;

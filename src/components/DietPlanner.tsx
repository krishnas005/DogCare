import React, { useState } from 'react';
import axios from 'axios';

function DietPlanner() {
    const [formData, setFormData] = useState({
        breed: '',
        age: '',
        weight: '',
        healthConditions: ''
    });
    const [dietPlan, setDietPlan] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/diet-plan/generate', formData);
            setDietPlan(response.data.dietPlan);
        } catch (error) {
            console.error('Failed to generate diet plan', error);
        }
    };

    return (
        <div>
            <h2>Diet & Nutrition Planner</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Breed"
                    required
                />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Weight (kg)"
                    required
                />
                <input
                    type="text"
                    name="healthConditions"
                    value={formData.healthConditions}
                    onChange={handleChange}
                    placeholder="Health Conditions (comma separated)"
                />
                <button type="submit">Generate Diet Plan</button>
            </form>
            {dietPlan && (
                <div>
                    <h3>Diet Plan</h3>
                    <p>Morning: {dietPlan.morning}</p>
                    <p>Afternoon: {dietPlan.afternoon}</p>
                    <p>Evening: {dietPlan.evening}</p>
                </div>
            )}
        </div>
    );
}

export default DietPlanner;

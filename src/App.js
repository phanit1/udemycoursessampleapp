import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to create this CSS file for styling

const App = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log(process.env,"Process ENV")
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
        const credentials = `${clientId}:${clientSecret}`;
        console.log('Credentials   :', credentials  );
        const base64Credentials = btoa(credentials); // btoa() is used to encode to Base64
        console.log('Base64 credentials:', base64Credentials);
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/', {
                    // headers: {
                    //     Authorization: `Basic ${base64Credentials}`,
                    // }
                    headers: {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "Authorization": "Basic MUs1VGF3T1FHTXd1SXREWmZZWkY5QlpDc1NZSndNUFNnQmdWNGZmdTpBdHp4Y1NVTzRaU28yNGY4NG96RWJNZ2pDdFFSRXR3QWlJWUo5OENUN0Z6R2pGMllkdktRSGFaYmg1UUU3VHZxVlF5UkpnbDZGWXRydHZCODRFOURSWjkwQTdCbjduVW9aU3Z2V25naUp3OWVSVTA3d2dwMFdNWVNyV3pueEVSZg=="
                      }
                });
                console.log('Courses:', response.data.results);
                setCourses(response.data.results);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="course-list">
        <h1>Udemy Courses</h1>
            {courses.map(course => (
                <div key={course.id} className="course-card">
                    <img src={course.image_240x135} alt={course.title} className="course-image" />
                    <h3>{course.title}</h3>
                    <p>{course.headline}</p>
                </div>
            ))}
        </div>
    );
};

export default App;
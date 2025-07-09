// hooks/useSessionValidation.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useSessionValidation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:5169/api/Role/Validate', {
          withCredentials: true, // important to send cookies
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  return isAuthenticated;
};

export default useSessionValidation;

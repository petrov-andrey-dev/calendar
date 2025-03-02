import { useState } from "react";

export function useForm<T>(inputValues: T) {
    const [values, setValues] = useState<T>(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {value, name, type} = event.target ;
      setValues({
        ...values, 
        [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value});
    };
    return {values, handleChange, setValues};
  };
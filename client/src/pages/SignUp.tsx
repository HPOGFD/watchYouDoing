import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../../src/utils/interfaces/auth';
import { signup } from '../api/authAPI';
import { SignupData } from '../utils/interfaces/SignupData';

const SignUp = () => {
  const [signupData, setsignupData] = useState<SignupData>({
    userName: '',
    password: '',
    email: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setsignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(signupData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className='form-group'>
          <label>Username</label>
          <input
            className='form-input'
            type='text'
            name='userName'
            value={signupData.userName || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            value={signupData.password || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            value={signupData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' type='submit'>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

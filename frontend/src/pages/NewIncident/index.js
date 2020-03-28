import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ngoId = localStorage.getItem('ngoId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId,
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Error when creating a new case. Try again');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />

          <h1>Register new case</h1>
          <p>Describe the case with details to find a hero who can help</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
          </Link>
        </section>

        <form>
          <input placeholder="Case Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <input placeholder="Value in BRL" value={value} onChange={e => setValue(e.target.value)} />

          <button className="button" type="submit" onClick={handleNewIncident}>Register</button>
        </form>
      </div>
    </div>
  );
}
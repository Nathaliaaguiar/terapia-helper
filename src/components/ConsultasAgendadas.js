// src/components/ConsultasAgendadas.js
import React, { useState, useEffect } from 'react';
import './ConsultasAgendadas.css';  // Importando o arquivo de estilos
import { database, ref, onValue } from '../firebase/firebase'; // Importando do arquivo Firebase

const ConsultasAgendadas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const consultasRef = ref(database, 'consultas'); // Referência para o nó de consultas

    // Escutando mudanças no banco de dados
    onValue(consultasRef, (snapshot) => {
      const data = snapshot.val();
      const consultasArray = [];

      for (let id in data) {
        consultasArray.push({ ...data[id], id });
      }

      setConsultas(consultasArray); // Atualiza o estado com as consultas do Firebase
    });
  }, []);

  return (
    <div className="consultas-container">
      <h2>Consultas Agendadas</h2>
      <table className="consultas-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td data-label="Paciente">{consulta.paciente}</td>
              <td data-label="Data">{consulta.data}</td>
              <td data-label="Hora">{consulta.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultasAgendadas;

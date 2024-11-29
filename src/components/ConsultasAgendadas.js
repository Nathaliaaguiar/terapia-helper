// src/components/ConsultasAgendadas.js
import React, { useState, useEffect } from 'react';
import './ConsultasAgendadas.css';  // Importando o arquivo de estilos
import { database, ref, onValue } from '../firebase/firebase'; // Importando do arquivo Firebase

const ConsultasAgendadas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const consultasRef = ref(database, 'consultas'); // Referência para o nó de consultas

    // Função que ouve alterações no Firebase e atualiza as consultas
    const unsubscribe = onValue(consultasRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Consultas recebidas:', data); // Para debugar os dados recebidos

      const consultasArray = [];
      if (data) {
        // Iterando pelas consultas no Firebase
        for (let id in data) {
          consultasArray.push({ ...data[id], id });
        }
      }

      setConsultas(consultasArray); // Atualiza o estado com as consultas do Firebase
    });

    // Cleanup do listener quando o componente for desmontado
    return () => unsubscribe();
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

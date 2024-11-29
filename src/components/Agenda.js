import React, { useState } from 'react';
import { database, ref, set } from '../firebase/firebase';
import './agenda.css';

const Agenda = () => {
  const [nomePaciente, setNomePaciente] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horaConsulta, setHoraConsulta] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para agendar consulta
  const agendarConsulta = () => {
    if (!nomePaciente || !dataConsulta || !horaConsulta) {
      alert('Preencha todos os campos!');
      return;
    }
    setIsLoading(true);
    const consultaId = new Date().getTime(); // ID único para a consulta
    set(ref(database, 'consultas/' + consultaId), {
      nomePaciente,
      dataConsulta,
      horaConsulta,
    })
      .then(() => {
        alert('Consulta agendada com sucesso!');
        setNomePaciente('');
        setDataConsulta('');
        setHoraConsulta('');
        setIsLoading(false);
      })
      .catch((error) => {
        alert('Erro ao agendar consulta. Tente novamente.');
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="agenda-container">
      <h2>Agendar Consulta</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nome do Paciente</label>
        <input
          type="text"
          value={nomePaciente}
          onChange={(e) => setNomePaciente(e.target.value)}
        />
        <label>Data da Consulta</label>
        <input
          type="date"
          value={dataConsulta}
          onChange={(e) => setDataConsulta(e.target.value)}
        />
        <label>Hora da Consulta</label>
        <input
          type="time"
          value={horaConsulta}
          onChange={(e) => setHoraConsulta(e.target.value)}
        />
        <button type="button" onClick={agendarConsulta} disabled={isLoading}>
          {isLoading ? 'Agendando...' : 'Agendar Consulta'}
        </button>
      </form>
    </div>
  );
};

export default Agenda;

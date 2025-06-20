import { useEffect, useState } from 'react';
import "../App.css"


interface GithubRequirements {
  minimumFollowing: number;
  minimumFollowers: number;
  minimumPublicRepos: number;
  minimumAge: number;
}

interface Ceremony {
  authProviders: string[];
  id: number;
  prefix: string;
  state: string;
  type: string;
  coordinatorId: string;
  title: string;
  description: string;
  startDate: number; // timestamp en milisegundos
  endDate: number;   // timestamp en milisegundos
  timeoutMechanismType: string;
  penalty: number;
  github: GithubRequirements;
  siwe: any | null;
  bandada: any | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  circuits: any[];   // Puedes especificar más si tienes estructura
  participants: any[]; // Igual que circuits
}

function CeremoniesData() {
  const [ceremonies, setCeremonies] = useState<Ceremony[]>([])

  const fetchData = async function obtenerUsuarios() {
    try {
      const response = await fetch('http://localhost:3000/ceremonies/find-all');

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log('Usuarios:', data);
      setCeremonies(data.allCeremonies)
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  function fromPosixToDate(posixTime:number){
    return new Date(posixTime).toString()
  }

  function deadLine(posixTime:number){
    const currentTime = new Date().getTime()
    const deadLineTime = posixTime - currentTime
    return deadLineTime / 86400000
  }

  useEffect(() => {
    fetchData();
  }, []);

 return (
    <>
      <div>
        <ul>
          {ceremonies.map((ceremony, index) => (
            <li key={index}>
              <div>
                <h2>{ceremony.title}</h2>
                <p>{ceremony.description}</p>
                <div>
                  <p>Start date:{fromPosixToDate(ceremony.startDate)}</p>
                  <p>End date:{fromPosixToDate(ceremony.endDate)}</p>
                  <p>DeadLine: {
                    deadLine(ceremony.endDate) >= 0
                    ? `${deadLine(ceremony.endDate).toFixed(2)} days left`
                    : `${Math.abs(deadLine(ceremony.endDate)).toFixed(2)} days ago`
                  }</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CeremoniesData;

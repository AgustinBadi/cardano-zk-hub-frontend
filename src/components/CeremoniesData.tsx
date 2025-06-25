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
  startDate: number; // timestamp in miliseconds
  endDate: number;   // timestamp in miliseconds
  timeoutMechanismType: string;
  penalty: number;
  github: GithubRequirements;
  siwe: any | null;
  bandada: any | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  circuits: any[];
  participants: any[];
}

function CeremoniesData(state: string) {
  const [ceremonies, setCeremonies] = useState<Ceremony[]>([])

  const fetchData = async function getCeremonies() {
    try {
      const response = await fetch(`http://localhost:3000/ceremonies/${state}`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log('Ceremonies: ', data);
      setCeremonies(data.allCeremonies)
    } catch (error) {
      console.error('Error at fetching ceremonies:', error);
    }
  };

  function fromPosixToDate(posixTime: number) {
    return new Date(posixTime).toString()
  }

  function deadLine(posixTime: number) {
    const currentTime = new Date().getTime()
    const deadLineTime = posixTime - currentTime
    return deadLineTime / 86400000
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value;
    CeremoniesData(selectedFilter);
  };

  return (
    <>
      <div>
        <select onChange={handleChange} defaultValue="">
          <option value="find-opened">OPEN</option>
          <option value="find-closed">CLOSED</option>
          <option value="find-scheduled">SCHEDULED</option>
        </select>
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

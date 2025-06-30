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
  startDate: number;
  endDate: number;
  timeoutMechanismType: string;
  penalty: number;
  github: GithubRequirements;
  siwe: any | null;
  bandada: any | null;
  createdAt: string;
  updatedAt: string;
  circuits: any[];
  participants: any[];
}

function CeremoniesData() {

  const [allCeremonies, setAllCeremonies] = useState<Ceremony[]>([]);

  const [filter, setFilter] = useState('ALL');


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/ceremonies/find-all`);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setAllCeremonies(data.allCeremonies || []);
      } catch (error) {
        console.error('Error fetching ceremonies:', error);
        setAllCeremonies([]);
      }
    };

    fetchAllData();
  }, []);


  function fromPosixToDate(posixTime: number) {
    return new Date(posixTime).toLocaleString();
  }


  function deadLine(posixTime: number) {
    const currentTime = new Date().getTime();
    const deadLineTime = posixTime - currentTime;
    return deadLineTime / (1000 * 60 * 60 * 24);
  }


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };



  const filteredCeremonies = allCeremonies.filter(ceremony => {
    if (filter === 'ALL') {
      return true;
    }
    return ceremony.state === filter;
  });

  return (
    <>
      <div>
        <label htmlFor="ceremony-filter">Filter by state: </label>
        <select id="ceremony-filter" onChange={handleChange} value={filter}>
          <option value="ALL">ALL</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
          <option value="SCHEDULED">SCHEDULED</option>
        </select>
        <ul>

          {filteredCeremonies.length > 0 ? (
            filteredCeremonies.map((ceremony) => (
              <li key={ceremony.id}>
                <div>
                  <h3>{ceremony.title}</h3>
                  <p><strong>State:</strong> {ceremony.state}</p>
                  <p>{ceremony.description}</p>
                  <div>
                    <p><strong>Start date:</strong> {fromPosixToDate(ceremony.startDate)}</p>
                    <p><strong>End date:</strong> {fromPosixToDate(ceremony.endDate)}</p>
                    <p><strong>Deadline:</strong> {
                      deadLine(ceremony.endDate) >= 0
                        ? `${deadLine(ceremony.endDate).toFixed(0)} days left`
                        : `${Math.abs(deadLine(ceremony.endDate)).toFixed(0)} days ago`
                    }</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No ceremonies found for the selected filter.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default CeremoniesData;

import React from "react";
import "./App.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { StatusIndicator } from "./StatusIndicator";

// gql: a function to take in our query string
// By convention, QUERY is all capitalised
const QUERY = gql`
  query {
    allLifts {
      id
      name
      status
    }
  }
`;

const MUTATION = gql`
  mutation($status: LiftStatus!, $id: ID!) {
    setLiftStatus(status: $status, id: $id) {
      id
      name
      status
    }
  }
`;

function App() {
  // useQuery (returns a ojb) is a hook that takes in our query
  const { loading, data } = useQuery(QUERY);
  // useMutation (returns an arr): a function that triggers the mutation
  // setStatus (can be anything) is the name of the function
  const [setStatus] = useMutation(MUTATION);

  // Destructuring 'loading' and handling loading state
  if (loading) return <p>Loading lifts...</p>;
  return (
    <div>
      <h1>Snowtooth Lift Status</h1>
      {/* If we have data && it's not in loading state, we create a table */}
      {data && !loading && (
        <table>
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map(lift => (
              <tr key={lift.name}>
                <td>{lift.name}</td>
                <td>
                  <StatusIndicator
                    status={lift.status}
                    onChange={status =>
                      setStatus({
                        variables: {
                          id: lift.id,
                          status //shorthand
                        }
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

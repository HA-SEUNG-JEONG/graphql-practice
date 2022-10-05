import { graphql } from "@octokit/graphql";
import { useEffect, useState } from "react";

const App = () => {
  const [item, setItem] = useState("");
  useEffect(() => {
    graphql(
      `
        {
          repository(name: "agora-states-fe", owner: "codestates-seb") {
            discussions(first: 10) {
              edges {
                node {
                  title
                  createdAt
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: "token " + process.env.REACT_APP_GRAPHQL_TOKEN,
        },
      }
    ).then((data) => setItem(data.repository.discussions.edges));
  }, []);

  return (
    <div className="App">
      {item &&
        item.map((element, id) => (
          <h1 key={id}>
            {element.node.title}/{element.node.createdAt.toString().slice(0, 10)}
          </h1>
        ))}
    </div>
  );
};

export default App;

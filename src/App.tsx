import { useEffect, useState } from "react";
import { docs } from "./db";
import { knn_search, Match } from "./search";

import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const matches = knn_search(query);

    setMatches([...matches]);
  }, [query]);

  return (
    <div className="bg-gray-900 w-full min-h-screen flex justify-center items-center p-4 space-x-4">
      <div className="flex flex-col relative mx-auto w-1/4 max-w-md">
        <input
          className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "
          type="search"
          name="search"
          placeholder="Query..."
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />
        <button className="absolute right-2 top-3 mr-4">
          <svg
            className="text-black h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            // style="enable-background:new 0 0 56.966 56.966;"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <div className=" flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {query === ""
            ? docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 text-white w-full max-w-md flex flex-col rounded-xl shadow-lg p-4"
                >
                  <p className="text-base">{doc}</p>
                </div>
              ))
            : matches.map((match, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 text-white w-full max-w-md flex flex-col rounded-xl shadow-lg p-4"
                >
                  <div className="flex flex-col min-h-full">
                    <div className="px-6 py-10 flex-grow">
                      <p className="text-base">{match[1]}</p>
                    </div>
                    <div className="px-5 py-3 border-t bg-gray-100 flex justify-end">
                      <button className="btn-gradient-default text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3">
                        Similarity Score: {match[0].toFixed(5)}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;

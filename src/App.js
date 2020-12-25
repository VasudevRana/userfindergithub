import React from "react";
import "./App.css";
import axios from "axios";
const url = `https://api.github.com/users`;
export default function App() {
  let [s, setS] = React.useState("");
  let [myresults, setMyresults] = React.useState([]);
  React.useEffect(function(){
    let b = []
    if (localStorage.getItem("results")) {
      b = JSON.parse(localStorage.getItem("results"));

    }
    
    
    setMyresults(b);
    
  },[])

  const _search = e => {
    
    axios
      .get(url + "/" + s)
      .then(d => d.data)
      .then(d => {
        if (d) {
          let b = []
          if (localStorage.getItem("results")) {
            b = JSON.parse(localStorage.getItem("results"));

          }
          b.push(d);
          localStorage.setItem("results", JSON.stringify(b));
          setMyresults(b);
          setS('');
          alert("user added");
        }
        else{
          alert("not found")
        }
      });
  };
  const del = index => {
    let b = []
    if (localStorage.getItem("results")) {
      b = JSON.parse(localStorage.getItem("results"));

    }
    alert("Confirm delete");
    b.splice(index, 1)
    localStorage.setItem("results", JSON.stringify(b));
    setMyresults(b);
  }
  return (
    <div className="body">
      <h1>Github Search</h1>
      <button className="button" onMouseEnter={_search}>search </button>
      <input
      className="input"
        onChange={e => {setS(e.target.value);}
        }
        placeholder="search..."
        value={s}
      />
      <button className="button" onMouseEnter={_search}>search </button>
      <div className="pre">
        {myresults.map((x, i) => (
          <li key={i}>

            UserId:-{x.id} <br></br>
            Name:-{x.name} <br></br>
            Link:-{x.html_url} <br></br>
            Repos:-{x.public_repos} <br></br>
            followers:-{x.followers} <br></br>
            following:-{x.following}<br></br>
            <button className="delete" onClick={e => del(i)}>delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}

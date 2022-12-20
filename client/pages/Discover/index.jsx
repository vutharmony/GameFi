import Card from "../../components/UI/Card";
import {useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Discover = () => {
    const {isConnected} = useAccount();
    const [games, setGames] = useState([]);
    const contract = useSelector((state)=> state.auth.contract);
    

    useEffect(() => {

      if(isConnected){
      (async function(){
        const totalGames = await contract.getGames();
        setGames(totalGames);
      })()
    }
    }, []);
    return (
      <div>
      {games.length>0 ?
        <div className="grid grid-cols-3" style={{marginLeft: "30px", marginTop: "100px"}}>
          {games.map((game, index) => {
            return <Card key={index} name={game}/>
          })
          }
          </div>
          :
          <h1 style={{textAlign:"center", fontSize:"2rem", margin:"15% auto"}}>
            Loading...
          </h1>
      }  
      </div>
    )
};

export default Discover;
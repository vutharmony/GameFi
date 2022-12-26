import {ethers} from "ethers";
import {Framework} from "@superfluid-finance/sdk-core";
import {contractAddress} from "../constants/Index";

export const createStream = async(signer, address) => {

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/KM1Kv-cqY7LlaPsoximQwOASxTzExuR5")

    const sf = await Framework.create({
        chainId: 80001,
        provider
    });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

    try {
        const flowOp = sf.cfaV1.createFlow({
            flowRate:"1000000000000000",
            sender: address,
            receiver: contractAddress,
            superToken: DAIx
        }) 

        console.log("Creating stream");
        
        const result = await flowOp.exec(signer);
        await result.wait();
        console.log(result);

        console.log(
            `Congrats - you've just created a money stream!
            View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
            Network: Mumbai
            Super Token: DAIx
           
            Receiver: ${recipient},
            FlowRate: ${flowRate}
            `
            );
    }
    catch(error){
        console.log(
            "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
          );
          console.error(error);
    }
};

export const deleteStream = async (signer, address) => {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/KM1Kv-cqY7LlaPsoximQwOASxTzExuR5")

    const sf = await Framework.create({
        chainId: 80001,
        provider
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try{
        const deleteOp = sf.cfaV1.deleteFlow({
            sender:address,
            receiver:contractAddress,
            superToken:DAIx,
        });

        console.log("Deleting your stream");

        const tx = await deleteOp.exec(signer);
        await tx.wait();

        console.log(
            `Congrats - you've just deleted your money stream!
            Network: Mumbai
            Super Token: DAIx
            Sender: ${address}
            Receiver: ${recipient}
         `
        )
    }
    catch(error){
        console.log(error);
    }
    
}

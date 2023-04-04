import {CardType} from "../components/types";
export const fetchData = async (url:string):Promise<CardType[]> => {
    const response = await fetch(url,{
        method: "GET",
        headers:{
            "Content-type":"application/json",
        }
    })
    const data = response.json()
    return await data
}

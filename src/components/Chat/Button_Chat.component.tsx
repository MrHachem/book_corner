import { Outlet  } from 'react-router-dom';
import ChatWidget from "./Chat";


export function ChatButton()
{
    return(
        <>
            <ChatWidget/>
            <Outlet /> 
        </>
   
    )
}
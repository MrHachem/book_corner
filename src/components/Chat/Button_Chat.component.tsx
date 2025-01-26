import { Outlet  } from 'react-router-dom';
import ChatWidget from "./Chat";
interface ChildrenComponent 
{
    children? : React.ReactNode
}

export function ChatButton(props : ChildrenComponent)
{
    return(
        <>
            <ChatWidget/>
            <Outlet /> 
        </>
   
    )
}
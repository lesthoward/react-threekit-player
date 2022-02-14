import React, {createContext, useState} from "react";

const Provider = (props) => {
    const [state, setState] = useState({
        threekitApi: {}
    });
    return (
        <div className="provider">
            <AppContext.Provider value={{state, setState}}>
                {props.children}
            </AppContext.Provider>
        </div>
    )
}
export default Provider;
export const AppContext = createContext();
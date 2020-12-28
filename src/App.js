import React,{useState} from 'react';
import {Switch,Route} from 'react-router';
import Home from './Components/Home/Home';
import Summarize from './Components/Summary/Summarize'; 
import Menu from './Components/Menu/Menu';

const App = () => {

    const [backg,changebackg]=useState('transparent');

    const HandleChange=(color)=>{
        return changebackg(color);
    }

    return (
        <div>
            <Menu />
            <Switch>
                <Route path='/' exact component={()=>(<Home background={backg} HandleChange={HandleChange}/>)}/>
                <Route path="/summary" component={Summarize} />
            </Switch>
        </div>
    )
}

export default App;
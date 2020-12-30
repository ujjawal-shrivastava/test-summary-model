import React,{useState} from 'react';
import {Switch,Route} from 'react-router';
import Home from './Components/Home/Home';
import Services from './Components/Services/Services'; 
import Menu from './Components/Menu/Menu';
import About from './Components/About/About';

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
                <Route path="/services" component={Services} />
                <Route path='/about' component={About} />
            </Switch>
        </div>
    )
}

export default App;
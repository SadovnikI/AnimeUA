import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';

const Navbar = () => {
    return (
        
            <Nav>
                <NavLink to ="/">
                   <h1>Logo</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to="/main" activeStyle>
                        Main
                    </NavLink>
                    <NavLink to="/catalog" activeStyle>
                        Catalog
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign-up
                    </NavLink>
                </NavMenu>
                    <NavBtn to="/sign-in" activeStyle>
                        <NavBtnLink to="/sign-in" activeStyle>Sign-in</NavBtnLink>
                    </NavBtn>
            </Nav>    
       
    )
}

export default Navbar

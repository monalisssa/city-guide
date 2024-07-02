import React, {useState} from 'react';
import {MenuBarButtonsContainer, MenuBarContainer} from "./styled";
import search_icon from "../../assets/images/search_icon.svg"
import favorites_icon from "../../assets/images/favorites_icon.svg"
import auth_icon from "../../assets/images/auth_icon.svg"
import Button from "../UI/Button";
import {Link, useLocation} from "react-router-dom";
import {GeoObject} from "../../types/name";
import SearchSidebar from "../SearchSidebar";
import FavoritesSidebar from "../FavoritesSidebar";


const MenuBar = () => {
    const [openSearchSideBar, setOpenSearchSideBar] = useState(false)
    const [openFavoritesSideBar, setOpenFavoritesSideBar] = useState(false)

    const handleOpenSearchBar = () =>
    {
        if(openFavoritesSideBar)
        {
            setOpenFavoritesSideBar(false)
        }
        setOpenSearchSideBar(!openSearchSideBar)

    }

    const handleOpenFavoritesSidebar = () =>
    {
        if(openSearchSideBar)
        {
            setOpenSearchSideBar(false)
        }
        setOpenFavoritesSideBar(!openFavoritesSideBar)
    }
    return (
        <>
            <MenuBarContainer>
                <MenuBarButtonsContainer>
                    <Button icon={search_icon} onClick={handleOpenSearchBar} bgColor={"#5E7BC7"} width={"90%"} iconColor={"#777"}/>
                    <Button icon={favorites_icon} onClick={handleOpenFavoritesSidebar} bgColor={"#C75E5E"} width={"90%"} iconColor={"#777"}/>
                </MenuBarButtonsContainer>

                <Link to="/login">
                <Button icon={auth_icon}
                       bgColor={"#808080"} width={"90%"} iconColor={"#777"}/>
                </Link>
            </MenuBarContainer>
            {
                openSearchSideBar && <SearchSidebar open={openSearchSideBar} />
            }

            {
                openFavoritesSideBar && <FavoritesSidebar open={openFavoritesSideBar} />
            }
        </>


    );
};

export default MenuBar;
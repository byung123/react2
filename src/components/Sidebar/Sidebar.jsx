import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link } from 'react-router-dom';
import { basic_Menu } from '../../constants/basicMenu';

function Sidebar() {
    return (
        <div css={s.layout}>
            <ul css={s.list}>
                {
                    basic_Menu.map(menu => 
                        <Link key={menu.id} to={menu.path}>
                            <li css={s.listItem}>{menu.icon}<span css={s.itemText}>{menu.name}</span></li>
                        </Link>
                    )
                }
            </ul>
        </div>
    );
}

export default Sidebar;
import { Money } from '@mui/icons-material'
import React from 'react'
import {
BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import { Link } from 'react-router-dom'



function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <Money className='icon_header' /> LOGO
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="home">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="my-loans">
                        <BsFillArchiveFill className='icon' /> My Loans
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="new-loan">
                        <BsFillGrid3X3GapFill className='icon' /> New Loan
                    </Link>
                </li>
                
            </ul>
        </aside>
    )
}

export default Sidebar
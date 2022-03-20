import React, { useEffect, useState } from 'react'
import '../index.css'
import { MdOutlineDarkMode } from 'react-icons/md'
import { MdDarkMode } from 'react-icons/md'
function DarkModeToggle() {



    const [darkMode, setdarkMode] = useState(false);
  
    var body = document.querySelector('body');

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            body.classList.add(localStorage.getItem('theme'));
            if (localStorage.getItem('theme') === 'darkTheme') {
                setdarkMode(true);
            }
        }
    }, [])

    function handleMouseEnter(e) {
        e.target.parentElement.classList.add('onHover');

    }
    function handleMouseLeave(e) {
        e.target.parentElement.classList.remove('onHover');
    }
    function handleDarkModeClick(e) {
        setdarkMode(!darkMode)
        if (!darkMode) {
            body.classList.add('darkTheme');
            localStorage.setItem('theme', 'darkTheme')
        } else {
            body.classList.remove('darkTheme')
            localStorage.setItem('theme', 'lightTheme.')
        }
    }
    return (
        <div className="darkModeToggle_wrapper">
            <button className='darkModeToggle_button' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleDarkModeClick}>
                {!darkMode ? <MdOutlineDarkMode className='dark-mode-icon' /> : <MdDarkMode className='dark-mode-icon-fill' />}
            </button>
        </div>
    )
}

export default DarkModeToggle
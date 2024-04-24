import React, { useState } from 'react';
import { motion } from "framer-motion";
import ToggleButton from './ToggleButton';

const NavbarMenu = () => {
    const [open, setOpen] = useState(false);

    const variants = {
        open: {
            clipPath: "circle(1200px at 50px 50px)",
            transition: {
                type: "spring",
                stiffness: 20
            }
        },
        closed: {
            clipPath: "circle(30px at 50px 50px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <motion.div className='flex flex-col items-center h-screen bg-white' animate={open ? variants.open : variants.closed}>
            <ToggleButton className='z-50 fixed rounded-l-full cursor-pointer bg ' setOpen = {setOpen} />
        </motion.div>
    );
};

export default NavbarMenu;

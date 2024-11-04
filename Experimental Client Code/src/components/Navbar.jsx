import React from 'react';

const Navbar = ({ userType, isAuthenticated }) => {
    const citizenLinks = [
        { label: 'Complain History', path: '/complain-history' },
        { label: 'File Complain', path: '/file-complain' },
        { label: 'Track Vans', path: '/track-vans' }
    ];

    const vanLinks = [
        { label: 'Track Complains', path: '/track-complains' }
    ];

    const adminLinks = [
        { label: 'View Complains', path: '/view-complains' },
        { label: 'Track Vans', path: '/track-vans' },
        { label: 'Track Complains', path: '/track-complains' }
    ];

    const authLinks = [
        { label: 'Profile', path: '/profile' },
        { label: 'Logout', path: '/logout' }
    ];

    const guestLinks = [];

    const links = isAuthenticated
        ? userType === 'citizen'
            ? citizenLinks.concat(authLinks)
            : userType === 'van'
                ? vanLinks.concat(authLinks)
                : userType === 'admin'
                    ? adminLinks.concat(authLinks)
                    : []
        : guestLinks;

    return (
        <nav className="bg-green-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <img src="/vite.svg" alt="Logo" className="h-8 mr-2" />
                {isAuthenticated?(<h1 className='text-yellow-200 text-xl font-bold capitalize'>{userType}</h1>):(<h1 className="text-white text-xl font-bold">Welcome to City Garbage Manager</h1>
       )}
                     </div>
            <ul className="flex space-x-4">
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.path} className="text-white hover:text-purple-500">{link.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
    
    );
};

export default Navbar;

import React from 'react';

import Logo from '../components/Logo';

const HomeHeader = () => {
    return (
        <div className="homeHeader">
            {/* <Navbar type="not-logged" borders={false} /> */}
			<Logo color="white" text={true} />
			{/* <Search /> */}
        </div>
    );
}

export default HomeHeader;
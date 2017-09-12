import React from 'react';

import {
    Footer,
    Header,
} from '../../components'

import TeamItem from '../../components/TeamItem/index';
import { teamItems } from '../../constants/index';

const Team = (item) => (
    <div>
        <div className="page-background">
            <Header/>
            <div className="App">
                <div className="team-header">
                    Team Carbon Doomsday
                </div>
                <div>
                {teamItems.map((item) => (
                    <TeamItem
                        name={item.name}
                        location={item.location}
                        src={item.src}
                        alt={item.alt}
                        position={item.position}
                    /> )
                )}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
);

export default Team;

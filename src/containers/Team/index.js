import React from 'react';

import {
    Footer,
    Header,
} from '../../components'

import TeamItem from '../../components/TeamItem/index';
import { teamItems } from '../../constants/index';

const Team = ({ items }) => (
    <div>
        <div className="page-background">
            <Header/>
            <div className="team-header">
                Team Carbon Doomsday
            </div>
            <div>
                <div className="team-grid">
                    {items.map((item) => (
                        <TeamItem {...item} /> )
                    )}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
);

Team.defaultProps = {
    items: teamItems
};


export default Team;

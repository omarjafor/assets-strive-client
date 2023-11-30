import TeamMemberList from "./TeamMemberList";
import UpcomingEvents from "./UpcomingEvents";
import { Helmet } from 'react-helmet-async';

const MyTeam = () => {

    return (
        <div>
            <Helmet>
                <title>Asset Strive | My Team </title>
            </Helmet>
            <UpcomingEvents></UpcomingEvents>

            <TeamMemberList></TeamMemberList>
        </div>
    );
};

export default MyTeam;
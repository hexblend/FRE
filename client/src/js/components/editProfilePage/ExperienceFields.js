import React from 'react';
import {connect} from 'react-redux';

import SingleExperience from './SingleExperience';
import Button from '../elements/Button';

import {addLoggedObj} from '../../redux/actions/AuthActions';

const mapStateToProps = state => ({
    loggedUser: state.AuthReducer.loggedUser,
});

const mapDispatchToProps = dispatch => {
    return {
        addLoggedObj: obj => dispatch(addLoggedObj(obj)),
    };
};
function ExperienceFields(props) {
    const {loggedUser, addLoggedObj} = props;

    const addNewExperience = () => {
        addLoggedObj({
            array: 'experience',
            object: {
                company_name: '',
                job_title: '',
                starting_date: new Date().toISOString(),
                ending_date: new Date().toISOString(),
                long_description: '',
            },
        });
    };
    return (
        <>
            <Button
                btnType="button"
                type="full-width"
                icon="plus"
                minWidth="100%"
                noShadow={true}
                text="Add a new experience"
                onClick={addNewExperience}
            />
            {loggedUser.experience &&
                loggedUser.experience.map((experience, index) => (
                    <SingleExperience
                        experience={experience}
                        index={index}
                        key={experience._id}
                    />
                ))}
        </>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ExperienceFields);

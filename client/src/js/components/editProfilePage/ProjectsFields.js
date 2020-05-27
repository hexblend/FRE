import React from 'react';
import {connect} from 'react-redux';

import SingleProject from './SingleProject';
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

    const addNewProject = () => {
        addLoggedObj({
            array: 'projects',
            object: {
                title: '',
                description: '',
                accomplishments: '',
                link: '',
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
                text="Add a new project"
                onClick={addNewProject}
            />
            {loggedUser.projects &&
                loggedUser.projects.map((project, index) => (
                    <SingleProject
                        project={project}
                        index={index}
                        key={project._id}
                    />
                ))}
        </>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ExperienceFields);

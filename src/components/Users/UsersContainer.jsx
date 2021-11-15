import React from 'react'
import { connect } from 'react-redux';
import { followAC, followUsers, toggleIsFollowingProgressAC, unfollowAC, unfollowUsers, getUsersThunkCreator } from '../../redux/users-reducer';
import { Users } from './Users'
import Preloader from '../common/Preloader/Preloader.jsx';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selector';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            { 
                this.props.isFetching && <Preloader />                
            }
            <Users 
                pageSize={ this.props.pageSize }
                totalUsersCount={ this.props.totalUsersCount }
                currentPage={ this.props.currentPage }
                onPageChanged={ this.onPageChanged }
                users={ this.props.users }
                unfollow={ this.props.unfollow }
                follow={ this.props.follow }
                followingInProgress={ this.props.followingInProgress  }
                followUsers={ this.props.followUsers }
                unfollowUsers={ this.props.unfollowUsers }
            />
        </>
    }
};

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (usersCount) => {
//             dispatch(setTotalUsersCountAC(usersCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// };
//  ---  OR ---

const mapDispatchToProps = {
    follow: followAC,
    unfollow: unfollowAC,
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    getUsers: getUsersThunkCreator,
    followUsers,
    unfollowUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
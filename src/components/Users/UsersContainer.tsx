import React from 'react'
import { connect } from 'react-redux';
import { followUsers, unfollowUsers, getUsersThunkCreator } from '../../redux/users-reducer';
import { Users } from './Users'
import Preloader from '../common/Preloader/Preloader.jsx';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selector';
import { UserType } from '../../Types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    followUsers: (userId: number) => void
    unfollowUsers: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
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
                followingInProgress={ this.props.followingInProgress  }
                followUsers={ this.props.followUsers }
                unfollowUsers={ this.props.unfollowUsers }
            />
        </>
    }
};

const mapStateToProps = (state: AppStateType) => {
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
    getUsers: getUsersThunkCreator,
    followUsers,
    unfollowUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
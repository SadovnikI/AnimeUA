import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';

import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Avatars from "./Avatar";
import {GET_LEADS} from "../actions/types";
import {returnErrors} from "../actions/messages";
import {tokenConfig} from "../actions/auth";


class Comments extends React.Component {
    static propTypes = {
    leads: PropTypes.array.isRequired,


  };


getLeads = () => (dispatch, getState) => {
  axios
    .get('/api/leads/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
componentDidMount() {
    this.getLeads();
  }

    render() {
        return (
            <dev>
            <List style={{width: "100%"}}>

                <h2 className="text-center">Comments</h2>

                {this.props.comments.map(comment => {

                    return (
                        <React.Fragment key={comment.id}>
                            <Divider/>
                            <ListItem key={comment.id} alignItems="flex-start">


                                <ListItemAvatar>
                                    <Avatars userid={comment.user_id.id}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box display="flex">
                                            <Typography style={{fontWeight: "bold"}}>
                                                {comment.user_id.username}
                                            </Typography>
                                            <div style={{marginLeft: "auto"}}>
                                                {Moment(comment.date).format('dd, mm, yyyy',)}
                                            </div>
                                        </Box>
                                    }
                                    secondary={
                                        <div>
                                            {comment.text}
                                        </div>
                                    }
                                />
                            </ListItem>

                        </React.Fragment>
                    );
                })}

            </List>
            {this.props.leads.map((comment) => {
                return(
                    <React.Fragment key={comment.id}>
                            <Divider/>
                            <ListItem key={comment.id} alignItems="flex-start">


                                <ListItemAvatar>
                                    <Avatars userid={comment.user_id}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box display="flex">
                                            <Typography style={{fontWeight: "bold"}}>
                                                {this.props.user.username}
                                            </Typography>
                                            <div style={{marginLeft: "auto"}}>
                                                {Moment(comment.date).format('dd, mm, yyyy',)}
                                            </div>
                                        </Box>
                                    }
                                    secondary={
                                        <div>
                                            {comment.text}
                                        </div>
                                    }
                                />
                            </ListItem>

                        </React.Fragment>
                )
                }


            )}
            </dev>
        );
    };
}
const mapStateToProps = (state) => ({
  leads: state.leads.leads,
    user:state.auth.user
});

export default connect(mapStateToProps)(Comments);



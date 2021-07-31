import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'moment';
import {addcomment} from "../actions/auth";
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
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


class Comments extends React.Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        addcomment: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,

    };


    state = {

        isFetching: true,
        text: '',

    }

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

    onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.onSubmit();
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {text} = this.state;
        const movie_id = this.props.movie.movie_id;
        const user = this.props.auth.user;
        const date = new Date;
        const user_id = user.id;

        {
            const newComment = {
                user_id,
                text,
                date,
                movie_id
            };
            console.log('test')
            this.props.addcomment(newComment);
        }
        this.setState({
            text: '',

        });
    };


    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    componentDidMount() {
        this.getLeads();
    }

    something = (event) => {
        if (event.keyCode === 13) {
            console.log('enter')
        }
    }

    render() {
        const {text} = this.state;
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
                                                <div style={{marginLeft: "auto", fontSize: '14px'}}>
                                                    {Moment(comment.date).format('DD-MM-YYYY, HH:mm',)}
                                                </div>
                                            </Box>
                                        }
                                        secondary={
                                            <div >
                                                <Typography style={{
                                                maxWidth:100
                                            }}>{comment.text}</Typography>

                                            </div>
                                        }
                                    />
                                </ListItem>

                            </React.Fragment>
                        );
                    })}

                </List>
                {this.props.leads.map((comment) => {
                        return (
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
                                                <div style={{marginLeft: "auto", fontSize: '14px'}}>
                                                    {Moment(comment.date).format('DD-MM-YYYY, HH:mm',)}
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
                {this.props.auth.isAuthenticated ? <>
                    <Container component="main" maxWidth="sm">

                        <CssBaseline/>
                        <div className="col-md-6 m-auto">
                            <div className="card card-body mt-5">
                                <h2 style={{marginLeft: 10}} className="text-center">Leave comment</h2>
                                <form onSubmit={this.onSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                                <textarea style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    padding: '0 20px',
                                                    marginBottom: '10px',
                                                    background: '#E9EFF6',
                                                    lineHeight: '40px',
                                                    elevation: 0,
                                                    borderRadius: '20px',
                                                    fontFamily: 'Roboto',
                                                    resize: 'none',
                                                    borderDecoration: 'none',
                                                    border: 'none ',
                                                    borderWidth: 0,
                                                    dateInput: {borderWidth: 0},

                                                    overflow: 'auto',
                                                    outline: 'none',


                                                }}
                                                          onKeyPress={(ev) => {

                                                              if (ev.key === 'Enter') {
                                                                  // Do code here
                                                                  this.btn.click();

                                                                  ev.preventDefault();
                                                              }
                                                          }}

                                                          placeholder="Comment..." rows="3"
                                                          name="text"
                                                          required
                                                          id="text"
                                                          onChange={this.onChange}
                                                          value={text}
                                                />
                                        </Grid>
                                        <div style={{marginBottom: 25, marginLeft: 10}} className="form-group">
                                            <Button style={{}}
                                                    ref={node => (this.btn = node)}
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="secondary"


                                            >
                                                Send
                                            </Button>
                                        </div>

                                    </Grid>

                                </form>
                            </div>
                        </div>
                    </Container>
                </> : <p style={{textAlign: 'center'}}>Register to leave coments</p>}
            </dev>
        );
    };
}

const mapStateToProps = (state) => ({
    leads: state.leads.leads,
    user: state.auth.user,
    auth: state.auth
});

export default connect(mapStateToProps, {addcomment})(Comments);



import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Button, Grid} from "@material-ui/core";
import CabinetMovie from "./CabinetMovies";

const state = {
    setData: [],
    user: [],
}


function getData(playlist) {
    state.setData = playlist
}

export default function ToggleButtons(props) {
    const [alignment, setAlignment] = React.useState();

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <Grid style={{
            background: 'rgba(255,255,255,0.65)',
            borderRadius: '5px',
            marginTop: '20px',
            marginBottom: '30px',
            padding: '20px 40px',
            height: '100%',
        }}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value="watching" onClick={() => getData(props.user.map(user => (
                    user.watching)))}>
                    Дивлюсь
                </ToggleButton>
                <ToggleButton value="completed" onClick={() => getData(props.user.map(user => (
                    user.completed)))}>
                    Завершив
                </ToggleButton>
                <ToggleButton value="planning" onClick={() => getData(props.user.map(user => (
                    user.planning)))}>
                    Заплановано
                </ToggleButton>
                <ToggleButton value="dropped" onClick={() => getData(props.user.map(user => (
                    user.dropped)))}>
                    Закинув
                </ToggleButton>
            </ToggleButtonGroup>
            <Grid style={{marginTop: '15px'}} container spacing={3}>
                {state.setData.map(playlist => (
                    playlist.map(pl => (
                        <CabinetMovie post={pl}/>
                    ))
                ))}
            </Grid>
        </Grid>
    );
}
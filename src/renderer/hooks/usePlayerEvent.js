import React from 'react';
import { secondsToTime } from 'lib/util';
import { useSelector, useDispatch } from 'react-redux';
// import {setCurrentSrc, setDuration, setIsPlaying, setCurrentTime} from 'Components/Monitor/monitorListSlice'
import {setItemValue} from 'Components/Monitor/monitorListSlice'
import CONSTANTS from 'config/constants';
const {MAX_LATENCY_SEC=15} = CONSTANTS;

export default function usePlayerEvent(playerRef, itemId) {
    const dispatch = useDispatch();
    const monitorItem = useSelector(state => state.monitorList.monitorItems.find(monitorItem => monitorItem.itemId === itemId));
    const {currentSrc, isPlaying, currentTime, manifestLoaded, duration} = monitorItem;
    const player = playerRef.current;
    const currentTimeRef = React.useRef(null);
    const currentDurationRef = React.useRef(null);

    React.useEffect(() => {
        if(player === null) return;
        player.play();
    },[player])

    const setPlayerSource = React.useCallback(currentSrc => {
        dispatch(setItemValue({itemId, key:'currentSrc', value:currentSrc}))
    },[dispatch, itemId])

    const handlePlaying = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePlaying')
        dispatch(setItemValue({itemId, key: 'isPlaying', value: true}))
    },[dispatch, itemId])

    const onClickForward10 = React.useCallback(()=>{
        if(!player) return;
        const {currentTime} = player;
        const maxCurrentTime = player.duration - MAX_LATENCY_SEC;
        const forwardTime = currentTime + 10 < maxCurrentTime ? currentTime + 10 : maxCurrentTime;
        if(Number.isNaN(forwardTime)) return;
        player.currentTime = forwardTime;
    },[player])

    const handlePause = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePause')
        dispatch(setItemValue({itemId, key: 'isPlaying', value: false}))
    },[dispatch, itemId])

    const handleTimeupdate = React.useCallback(()=>{
        const currentTime = secondsToTime(parseInt(player.currentTime));
        currentTimeRef.current = currentTime;
    },[player])

    const getCurrentTime = React.useCallback(() => {
        return currentTimeRef.current;
    },[currentTimeRef])

    const getDuration = React.useCallback(() => {
        return currentDurationRef.current;
    },[currentDurationRef])

    const handleDurationChange = React.useCallback(()=>{
        const {currentTime, duration} = player;
        const durationSec = secondsToTime(parseInt(duration));
        currentDurationRef.current = durationSec;
        const isLargeLatency = (duration - currentTime) > MAX_LATENCY_SEC;
        if(isLargeLatency){
            player.currentTime = duration - MAX_LATENCY_SEC
        }
    },[player])

    const onClickPlay = React.useCallback(() => {
        console.log(itemId, isPlaying);
        if(isPlaying) {
            player.pause();
            return
        }
        player.play();
    },[player, isPlaying, itemId])

    const onClickReload = React.useCallback(() => {
        player.load();
    },[player])

    React.useEffect(() => {
        if(manifestLoaded === false) return [];
        if(player === null || player === undefined) {
            dispatch(setItemValue({itemId, key: 'isPlaying', value: false}))
            return [];
        }
        console.log('attach player event handlers', player);
        player.addEventListener('playing', handlePlaying)
        player.addEventListener('pause', handlePause)
        player.addEventListener('timeupdate', handleTimeupdate)
        player.addEventListener('durationchange', handleDurationChange)

        return (() => {
            console.log('detach player event handlers', player);
            player.removeEventListener('playing', handlePlaying)
            player.removeEventListener('pause', handlePause)
            player.removeEventListener('timeupdate', handleTimeupdate)
            player.removeEventListener('durationchange', handleDurationChange)
            player.pause();
        })

    },[manifestLoaded, player, itemId, handlePlaying, handlePause, handleTimeupdate, handleDurationChange, dispatch])

    return {
        isPlaying,
        setPlayerSource,
        currentTime,
        manifestLoaded,
        duration,
        getCurrentTime,
        getDuration,
        onClickPlay,
        onClickReload,
        onClickForward10
    }
}

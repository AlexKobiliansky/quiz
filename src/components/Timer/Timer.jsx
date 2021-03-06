import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateCategoryTimer} from '../../redux/actions/category';
import styles from './Timer.module.sass';


const Timer = () => {
  const dispatch = useDispatch();
  const {inProcess} = useSelector(({category}) => category);
  const [time, setTime] = useState({s:0, m:0, h:0});
  const [interv, setInterv] = useState();

  let updatedS = time.s;
  let updatedM = time.m;
  let updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({s:updatedS, m:updatedM, h:updatedH});
  }

  useEffect(() => {
    if (inProcess) {
      run();
      setInterv(setInterval(run, 1000))
    } else {
      clearInterval(interv);
    }

    dispatch(updateCategoryTimer(time))

    return () => {
      clearInterval(interv);
      setTime({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProcess]);

  return (
    <div className={styles.timer}>
      Time: <b>
      {(time.h >= 10) ? time.h : '0'+time.h}:
      {(time.m >= 10) ? time.m : '0'+time.m}:
      {(time.s >= 10) ? time.s : '0'+time.s}</b>
    </div>
  );
};

export default Timer;
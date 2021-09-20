import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//material-ui
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Skeleton} from '@material-ui/lab';
//components
import Category from '../../components/Category/Category';
//actions
import {fetchCategoriesAC} from '../../redux/actions/category';
//styles
import styles from './CategoriesPage.module.sass';

const useStyles = makeStyles({
  root: {
    marginBottom: 60
  },
});

const CategoriesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isLoading, categories} = useSelector(({category}) => category);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategoriesAC());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <Typography variant="h2" component="h1" align="center" gutterBottom className={classes.root}>
        Choose category to start quiz
      </Typography>

      <div className={styles.categoriesWrap}>
        {
          (isLoading ? Array.from(new Array(8)) : categories).map((cat, index) => (
            cat ? (
              <Category key={cat.id} {...cat} />
            ) : (
              <Skeleton variant="rect" width='100%' height={200} key={index}/>
            )
          ))
        }
      </div>
    </div>
  );
};

export default CategoriesPage;
import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Categories.module.sass';
import Category from '../../components/Category/Category';

let categories = [
  {
    "id": 1,
    "title": "JavaScript",
    "img": "https://res.cloudinary.com/do1zs5utw/image/upload/v1631222510/javascript_s199nx.png"
  },
  {
    "id": 2,
    "title": "PHP",
    "img": "https://res.cloudinary.com/do1zs5utw/image/upload/v1631222510/php_tenaqz.jpg"
  },
  {
    "id": 3,
    "title": "HTML",
    "img": "https://res.cloudinary.com/do1zs5utw/image/upload/v1631222510/html_hnl59u.jpg"
  },
  {
    "id": 4,
    "title": "Linux",
    "img": ""
  },
  {
    "id": 5,
    "title": "Docker",
    "img": ""
  },
  {
    "id": 6,
    "title": "MySQL",
    "img": ""
  },
  {
    "id": 7,
    "title": "Kubernetes",
    "img": ""
  },
  {
    "id": 8,
    "title": "Bash",
    "img": ""
  }
]

const useStyles = makeStyles({
  root: {
    marginBottom: 60
  },
});

const Categories = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" component="h1" align="center" gutterBottom className={classes.root}>
        Choose category to start quiz
      </Typography>

      <div className={styles.categoriesWrap}>
        {categories.map(cat => <Category key={cat.id} id={cat.id} title={cat.title} img={cat.img} />)}
      </div>
    </div>
  );
};

export default Categories;
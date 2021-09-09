import React from 'react';
import styles from './Category.module.sass';
import {Link} from 'react-router-dom';
import imagePlaceholder from '../../assets/images/image-placeholder.jpg';

const Category = ({title, img, id}) => {
  let imgSrc = img ? img : imagePlaceholder

  return (
    <Link to={`/categories/${id}`}>
      <div className={styles.category}>
        <img src={imgSrc} alt={title}/>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.questions}>25 Questions</div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
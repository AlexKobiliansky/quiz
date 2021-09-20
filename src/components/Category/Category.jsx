import React from 'react';
// third-party
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//images
import imagePlaceholder from '../../assets/images/image-placeholder.jpg';
//styles
import styles from './Category.module.sass';


const Category = ({title, img, id, totalQuestions}) => {
  let imgSrc = img ? img : imagePlaceholder

  return (
    <Link to={`/categories/${id}`}>
      <div className={styles.category}>
        <img src={imgSrc} alt={title}/>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div>{totalQuestions} Questions</div>
        </div>
      </div>
    </Link>
  );
};

Category.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  totalQuestions: PropTypes.number
}

export default Category;
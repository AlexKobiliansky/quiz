import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import styles from './ImgLabel.module.sass';
import {userSelector} from '../../redux/selectors/userSelectors';
import {useSelector} from 'react-redux';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.jpg';

import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Create';
import {
  Tooltip,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, Button, Dialog
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {uploadImage} from '../../api/uploadImage';

const ImgLabel = ({img, onEdit, onDelete}) => {
  const [file, setFile] = useState(img);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const user = useSelector(userSelector);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => setFile(img), [img]);

  const handleChange = (e) => {
    let uploadedFile = e.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
    setLoading(true);

    uploadImage(uploadedFile).then(url => {
      onEdit(url);
      setFile(url);
      setLoading(false);
    });
  }

  const handleDelete = () => {
    onDelete();
    setFile(null);
    handleCloseDialog();
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className={`${styles.imgLabel} ${loading ? styles.loading : ''}`}>
        <div className={styles.buttons}>
          <input type="file" ref={hiddenFileInput} onChange={handleChange}/>

          <Tooltip
            title="Change image"
            placement="top"
            onClick={handleClick}
          >
            <IconButton aria-label="change">
              <EditIcon color="primary"/>
            </IconButton>
          </Tooltip>

          {img && <Tooltip
            title="Delete image"
            placement="top"
            onClick={handleOpenDialog}
          >
            <IconButton aria-label="delete">
              <DeleteIcon color="primary"/>
            </IconButton>
          </Tooltip>}
        </div>

        {loading && <div className={styles.spinner}><CircularProgress/></div>}

        <img src={file ? file : avatarPlaceholder} alt={user?.name}/>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete image?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ImgLabel.propTypes = {
  img: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ImgLabel;
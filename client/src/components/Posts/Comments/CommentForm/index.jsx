import { UserContext } from 'contexts/UserContext';
import { useComment } from 'hooks/useComments';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import styles from './CommentForm.module.css';
import IconSend from 'components/Icons/IconSend';

const CommentForm = () => {
  // const { createComment } = useComment();
  // const { currentUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const { formState, handleSubmit, register, reset } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const validationSchema = true;

  useEffect(() => {
    setResponseErrorMsg([]);
  }, []);

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = 0.5 + e.target.scrollHeight + 'px';
  };

  const handlePreview = (e) => {
    if (e.target?.files?.[0]) {
      setFilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('image', data.image[0]);
    // createComment(formData)
    //   .then(() => {
    //     reset({ content: '', image: [] });
    //     setFilePreview(null);
    //   })
    //   .catch((err) => setResponseErrorMsg(err))
    //   .finally(() => setLoading(false));
  };

  return (
    <form className={styles.CommentForm} onSubmit={handleSubmit(onSubmit)}>
      <img className={styles.user_pic} src={defaultProfilePic} alt='' />
      <textarea
        // id='commentContent'
        placeholder={`Ecrire un commentaire...`}
        className={`form-textarea ${styles.content_textarea} ${
          errors.content ? 'error' : ''
        }`}
        onInput={(e) => adjustTextareaHeight(e)}
        {...register('content', { validate: validationSchema.content })}
      />
      <button type='submit' className={styles.submit_btn}>
        <IconSend size='32' />
      </button>
    </form>
  );
};

export default CommentForm;
